import { BaseStats } from "@/lib/types";

interface PokemonStatsPanelProps {
  stats: BaseStats;
  total: number;
}

const STAT_ROWS: Array<{ key: keyof BaseStats; label: string; color: string }> = [
  { key: "hp", label: "HP", color: "bg-rose-500" },
  { key: "atk", label: "공격", color: "bg-orange-500" },
  { key: "def", label: "방어", color: "bg-amber-500" },
  { key: "spa", label: "특수공격", color: "bg-sky-500" },
  { key: "spd", label: "특수방어", color: "bg-emerald-500" },
  { key: "spe", label: "스피드", color: "bg-violet-500" },
];

export default function PokemonStatsPanel({ stats, total }: PokemonStatsPanelProps) {
  return (
    <div className="bg-white/5 rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-pokeyellow font-bold">종족값</h3>
        <div className="rounded-lg bg-pokeyellow/10 px-3 py-1 text-sm font-semibold text-pokeyellow">
          종족값 총합 {total}
        </div>
      </div>
      <div className="space-y-2">
        {STAT_ROWS.map(({ key, label, color }) => {
          const value = stats[key];
          const width = Math.min(100, (value / 255) * 100);
          return (
            <div key={key} className="grid grid-cols-[72px_44px_1fr] items-center gap-3">
              <span className="text-sm text-gray-300">{label}</span>
              <span className="text-sm font-semibold text-white tabular-nums">{value}</span>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className={`h-2 rounded-full ${color}`} style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
