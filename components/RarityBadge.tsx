interface RarityBadgeProps {
  rarity: string;
}

const RARITY_THEME: Record<string, { bg: string; text: string; border: string }> = {
  "Common": { bg: "#1F2937", text: "#D1D5DB", border: "#4B5563" },
  "Uncommon": { bg: "#14532D", text: "#BBF7D0", border: "#22C55E" },
  "Rare": { bg: "#1E3A8A", text: "#BFDBFE", border: "#3B82F6" },
  "Ultra Rare": { bg: "#581C87", text: "#E9D5FF", border: "#A855F7" },
  "Special": { bg: "#713F12", text: "#FDE68A", border: "#EAB308" },
};

export default function RarityBadge({ rarity }: RarityBadgeProps) {
  const value = rarity || "미상";
  const foundKey = Object.keys(RARITY_THEME).find((key) => value.includes(key));
  const theme = foundKey
    ? RARITY_THEME[foundKey]
    : { bg: "#374151", text: "#E5E7EB", border: "#6B7280" };

  return (
    <span
      className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wide uppercase ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        border: `1px solid ${theme.border}`,
      }}
    >
      {value}
    </span>
  );
}
