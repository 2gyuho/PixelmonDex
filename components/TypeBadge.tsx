interface TypeBadgeProps {
  type: string;
  small?: boolean;
}

const TYPE_THEME: Record<string, { bg: string; text: string; border: string }> = {
  "노말": { bg: "#9CA3AF", text: "#FFFFFF", border: "#D1D5DB" },
  "불꽃": { bg: "#F97316", text: "#FFFFFF", border: "#FDBA74" },
  "물": { bg: "#3B82F6", text: "#FFFFFF", border: "#93C5FD" },
  "풀": { bg: "#22C55E", text: "#FFFFFF", border: "#86EFAC" },
  "전기": { bg: "#FACC15", text: "#1F2937", border: "#FDE68A" },
  "얼음": { bg: "#67E8F9", text: "#0F172A", border: "#A5F3FC" },
  "격투": { bg: "#B91C1C", text: "#FFFFFF", border: "#FCA5A5" },
  "독": { bg: "#9333EA", text: "#FFFFFF", border: "#D8B4FE" },
  "땅": { bg: "#A16207", text: "#FFFFFF", border: "#FCD34D" },
  "비행": { bg: "#38BDF8", text: "#FFFFFF", border: "#7DD3FC" },
  "에스퍼": { bg: "#EC4899", text: "#FFFFFF", border: "#F9A8D4" },
  "벌레": { bg: "#65A30D", text: "#FFFFFF", border: "#BEF264" },
  "바위": { bg: "#78716C", text: "#FFFFFF", border: "#D6D3D1" },
  "고스트": { bg: "#4338CA", text: "#FFFFFF", border: "#A5B4FC" },
  "드래곤": { bg: "#6D28D9", text: "#FFFFFF", border: "#C4B5FD" },
  "악": { bg: "#1F2937", text: "#FFFFFF", border: "#9CA3AF" },
  "강철": { bg: "#64748B", text: "#FFFFFF", border: "#CBD5E1" },
  "페어리": { bg: "#F9A8D4", text: "#1F2937", border: "#FBCFE8" },
};

export default function TypeBadge({ type, small = false }: TypeBadgeProps) {
  const types = type.split("/").map((t) => t.trim()).filter(Boolean);
  const sizeClass = small ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <span className="inline-flex gap-1.5 flex-wrap justify-center">
      {types.map((t) => {
        const theme = TYPE_THEME[t] ?? { bg: "#374151", text: "#E5E7EB", border: "#6B7280" };
        return (
          <span
            key={t}
            className={`${sizeClass} rounded-full font-semibold tracking-wide ring-1 ring-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]`}
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
              border: `1px solid ${theme.border}`,
            }}
          >
            {t}
          </span>
        );
      })}
    </span>
  );
}
