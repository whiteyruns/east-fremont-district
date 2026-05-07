import {
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
  Nosifer,
} from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const nosifer = Nosifer({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-nosifer",
  display: "swap",
});

export default function ThrillerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} ${nosifer.variable}`}
    >
      {children}
    </div>
  );
}
