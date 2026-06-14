"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (e.g. non-secure context) — value is still
      // selectable by hand, so fail silently.
    }
  };

  return (
    <div>
      <p className="text-[#C49A6C] text-[11px] font-semibold uppercase tracking-widest mb-2">
        {label}
      </p>
      <div className="flex items-stretch gap-2">
        <code className="flex-1 min-w-0 bg-[#0F1115] border border-[#2A2D33] rounded-md px-3 py-2.5 text-[#F0EDE8] text-sm font-mono break-words">
          {value}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 rounded-md border border-[#2A2D33] text-[#9B978F] hover:text-[#F0EDE8] hover:border-[#3A3D43] transition-colors text-xs font-semibold"
        >
          {copied ? (
            <>
              <Check size={14} className="text-[#C49A6C]" /> Copied
            </>
          ) : (
            <>
              <Copy size={14} /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
