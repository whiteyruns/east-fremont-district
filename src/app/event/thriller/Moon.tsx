"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

type MoonProps = {
  textureBase: string;
  size?: string;
  framed?: boolean;
  ambient?: boolean;
  rotationSpeed?: number;
  sunPosition?: [number, number, number];
  sunColor?: string;
  showCredit?: boolean;
  /** Color map filename, e.g. "color_4k.jpg" or "color_2k.jpg". Default: "color_4k.jpg". */
  colorFile?: string;
};

function MoonMesh({
  textureBase,
  rotationSpeed,
  colorFile,
}: {
  textureBase: string;
  rotationSpeed: number;
  colorFile: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const [colorMap, displacementMap, normalMap] = useLoader(TextureLoader, [
    `${textureBase}/${colorFile}`,
    `${textureBase}/displacement_2k.jpg`,
    `${textureBase}/normal_2k.jpg`,
  ]);

  useMemo(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.anisotropy = 16;
    displacementMap.anisotropy = 16;
    normalMap.anisotropy = 16;
  }, [colorMap, displacementMap, normalMap]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0.12]}>
      <sphereGeometry args={[1, 384, 384]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        normalScale={new THREE.Vector2(1.4, 1.4)}
        displacementMap={displacementMap}
        displacementScale={0.022}
        roughness={1.0}
        metalness={0.0}
        color={new THREE.Color(0xfff5e8)}
      />
    </mesh>
  );
}

function GlowHalo() {
  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        glowColor: { value: new THREE.Color(0xc28a5a) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPos = -mvPos.xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          float rim = 1.0 - max(dot(normalize(vNormal), normalize(vViewPos)), 0.0);
          float intensity = pow(rim, 4.0) * 0.35;
          gl_FragColor = vec4(glowColor * intensity, intensity);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    }),
    [],
  );

  return (
    <mesh>
      <sphereGeometry args={[1.04, 64, 64]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
}

function MoonFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#3a3530" roughness={1} />
    </mesh>
  );
}

export default function Moon({
  textureBase,
  size = "min(72vmin, 560px)",
  framed = true,
  ambient = true,
  rotationSpeed = 0.0011,
  sunPosition = [4.5, 1, 2.5],
  sunColor = "#fff2dc",
  showCredit = true,
  colorFile = "color_4k.jpg",
}: MoonProps) {
  return (
    <div className={`moon-root ${ambient ? "moon-ambient" : ""}`}>
      <div
        className={`moon-frame ${framed ? "moon-frame--ring" : ""}`}
        style={{ width: size }}
      >
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          camera={{ position: [0, 0, 5], fov: 28 }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            display: "block",
          }}
        >
          <directionalLight
            position={sunPosition}
            intensity={2.6}
            color={sunColor}
          />
          <directionalLight
            position={[-4, -0.5, -1.5]}
            intensity={0.12}
            color="#6b8cb8"
          />
          <ambientLight intensity={0.025} />

          <Suspense fallback={<MoonFallback />}>
            <MoonMesh
              textureBase={textureBase}
              rotationSpeed={rotationSpeed}
              colorFile={colorFile}
            />
            <GlowHalo />
          </Suspense>
        </Canvas>
      </div>

      {ambient && <div className="moon-vignette" aria-hidden />}
      {showCredit && (
        <div className="moon-credit">Surface · NASA SVS / LROC</div>
      )}

      <style jsx>{`
        .moon-root {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
        }

        .moon-ambient {
          background: radial-gradient(
            ellipse at center,
            #3d2e22 0%,
            #1a1411 50%,
            #0a0806 100%
          );
        }

        .moon-ambient::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 23% 17%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1px 1px at 67% 31%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(1px 1px at 89% 73%, rgba(255, 255, 255, 0.5), transparent),
            radial-gradient(1px 1px at 12% 84%, rgba(255, 255, 255, 0.35), transparent),
            radial-gradient(2px 2px at 41% 56%, rgba(255, 255, 255, 0.25), transparent),
            radial-gradient(1px 1px at 76% 12%, rgba(255, 255, 255, 0.45), transparent),
            radial-gradient(1px 1px at 94% 47%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(1px 1px at 5% 38%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1px 1px at 58% 92%, rgba(255, 255, 255, 0.35), transparent),
            radial-gradient(2px 2px at 31% 7%, rgba(255, 255, 255, 0.2), transparent);
          pointer-events: none;
          z-index: 0;
        }

        .moon-frame {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          z-index: 1;
        }

        .moon-frame--ring {
          background: conic-gradient(
            from 220deg,
            #5a2f18 0deg,
            #c2784a 90deg,
            #f0a473 180deg,
            #b56838 270deg,
            #5a2f18 360deg
          );
          padding: 7px;
          box-shadow:
            0 0 100px rgba(194, 120, 74, 0.4),
            0 0 200px rgba(194, 120, 74, 0.18),
            inset 0 0 25px rgba(0, 0, 0, 0.5);
        }

        .moon-frame--ring::before {
          content: "";
          position: absolute;
          inset: 7px;
          border-radius: 50%;
          background: #000;
          z-index: 0;
        }

        .moon-frame--ring::after {
          content: "";
          position: absolute;
          inset: 7px;
          border-radius: 50%;
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.6);
          z-index: 2;
          pointer-events: none;
        }

        .moon-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            transparent 35%,
            rgba(0, 0, 0, 0.55) 100%
          );
          z-index: 2;
        }

        .moon-credit {
          position: absolute;
          bottom: 16px;
          right: 18px;
          color: rgba(194, 120, 74, 0.5);
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          z-index: 3;
          font-family: -apple-system, system-ui, sans-serif;
        }
      `}</style>
    </div>
  );
}
