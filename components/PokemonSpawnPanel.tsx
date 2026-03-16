import { OfficialSpawnEntry } from "@/lib/types";

interface PokemonSpawnPanelProps {
  entries: OfficialSpawnEntry[];
}

const TIME_RANGE_LABELS: Record<string, string> = {
  "새벽": "새벽",
  "아침": "아침",
  "낮": "낮",
  "황혼": "황혼",
  "저녁": "저녁",
  "밤": "밤",
  "전체": "전체",
};

const TIME_TOOLTIP_LABELS: Record<string, { minecraft: string; journeymap: string }> = {
  "새벽": { minecraft: "22:00-23:59", journeymap: "04:00-05:59" },
  "아침": { minecraft: "06:00-11:59", journeymap: "06:00-11:59" },
  "낮": { minecraft: "12:00-17:59", journeymap: "12:00-17:59" },
  "황혼": { minecraft: "18:00-18:59", journeymap: "18:00-18:59" },
  "저녁": { minecraft: "19:00-19:59", journeymap: "19:00-19:59" },
  "밤": { minecraft: "20:00-21:59", journeymap: "20:00-03:59" },
  "전체": { minecraft: "종일", journeymap: "종일" },
};

const CATEGORY_LABELS: Record<string, string> = {
  standard: "기본 스폰",
  grass: "잔디 스폰",
  fishing: "낚시",
  curry: "카레",
  caverock: "동굴 바위",
  rocksmash: "바위깨기",
  headbutt: "나무치기",
  sweetscent: "달콤한향기",
  megas: "메가 보스",
  legendaries: "전설 스폰",
  npcs: "NPC 이벤트",
  forage: "채집",
};

const BIOME_KO: Record<string, string> = {
  "All Forests": "모든 숲",
  "Arid": "건조 지대",
  "Badlands": "악지",
  "Bamboo Jungle": "대나무 정글",
  "Basalt Deltas": "현무암 삼각주",
  "Beach": "해변",
  "Beaches": "해변",
  "Birch Forest": "자작나무 숲",
  "Birches": "자작나무 숲",
  "Cold Desert": "차가운 사막",
  "Cold Ocean": "차가운 바다",
  "Crimson Forest": "진홍빛 숲",
  "Dark Forest": "어두운 숲",
  "Deep Cold Ocean": "깊고 차가운 바다",
  "Deep Frozen Ocean": "깊고 얼어붙은 바다",
  "Deep Lukewarm Ocean": "깊고 미지근한 바다",
  "Deep Ocean": "깊은 바다",
  "Deep Warm Ocean": "깊고 따뜻한 바다",
  "Desert": "사막",
  "Dunes": "사구 지대",
  "End": "엔드",
  "End Barrens": "엔드 불모지",
  "End Highlands": "엔드 고지",
  "End Midlands": "엔드 중지",
  "Eroded Badlands": "침식된 악지",
  "Evil": "음산한 지대",
  "Flowery": "꽃 지대",
  "Forests": "숲",
  "Freezing": "혹한 지대",
  "Freezing Forests": "혹한의 숲",
  "Freezing Mountains": "혹한 산악 지대",
  "Frozen Lake": "얼어붙은 호수",
  "Frozen Ocean": "얼어붙은 바다",
  "Frozen River": "얼어붙은 강",
  "Hellish": "지옥 지대",
  "Hills": "언덕",
  "Ice Spikes": "역고드름",
  "Jungle": "정글",
  "Jungles": "정글",
  "Lakes": "호수",
  "Lukewarm Ocean": "미지근한 바다",
  "Lush Caves": "무성한 동굴",
  "Magical": "마법 지대",
  "Mesas": "악지",
  "Mountainous": "산악 지대",
  "Mountainous Forests": "산악 숲",
  "Mushroom": "버섯 지대",
  "Nether Wastes": "네더 황무지",
  "Ocean": "바다",
  "Oceanic": "해양 지대",
  "Old Growth Birch Forest": "자작나무 원시림",
  "Plains": "평원",
  "River": "강",
  "Rivers": "강",
  "Roofed": "지붕 숲",
  "Savanna Badlands": "사바나 악지",
  "Savanna Plateau": "사바나 고원",
  "Savanna Slopes": "사바나 비탈",
  "Savannas": "사바나",
  "Small End Islands": "작은 엔드 섬",
  "Snowy Badlands": "눈 덮인 악지",
  "Snowy Beach": "눈 덮인 해변",
  "Snowy Plains": "눈 덮인 평원",
  "Snowy Taiga": "눈 덮인 타이가",
  "Soul Sand Valley": "영혼 모래 골짜기",
  "Sparse Jungle": "듬성듬성한 정글",
  "Stony Shore": "돌 해안",
  "Sunflower Plains": "해바라기 평원",
  "Swamp": "늪",
  "Swamps": "늪",
  "Taigas": "타이가",
  "Tundra": "툰드라",
  "Volcanic": "화산 지대",
  "Volcano": "화산",
  "Warm Ocean": "따뜻한 바다",
  "Warm River": "따뜻한 강",
  "Warped Forest": "뒤틀린 숲",
  "Windswept Gravelly Hills": "바람이 세찬 자갈투성이 언덕",
  "Windswept Savanna": "바람이 세찬 사바나",
  "Wooded Badlands": "나무가 우거진 악지",
};

function EntryRow({ label, values }: { label: string; values: string[] }) {
  if (values.length === 0) return null;

  const normalizedValues = label === "시간대"
    ? values.map((value) => TIME_RANGE_LABELS[value] ?? value)
    : values;

  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {normalizedValues.map((value, index) => {
          const tooltip = label === "시간대" ? TIME_TOOLTIP_LABELS[value] : undefined;
          const biomeKo = label === "바이옴" ? BIOME_KO[value] : undefined;

          if (!tooltip && !biomeKo) {
            return (
              <span
                key={`${label}-${value}-${index}`}
                className="rounded-full bg-white/5 px-2 py-1 text-xs text-gray-200 border border-white/10"
              >
                {value}
              </span>
            );
          }

          if (biomeKo) {
            return (
              <span
                  key={`${label}-${value}-${index}`}
                  className="group relative inline-flex rounded-full bg-white/5 px-2 py-1 text-xs text-gray-200 border border-white/10 cursor-help"
                >
                  {value}
                  <span className="pointer-events-none absolute left-0 top-full z-20 mt-1.5 w-52 rounded-lg border border-white/15 bg-[#0f1020] px-3 py-2 text-xs leading-relaxed text-gray-100 opacity-0 shadow-xl transition-opacity duration-100 group-hover:opacity-100 group-focus-within:opacity-100">
                    <span className="block">{biomeKo}</span>
                    <span className="block text-gray-400">{value}</span>
                  </span>
                </span>
            );
          }

          return (
            <span
              key={`${label}-${value}-${index}`}
              className="group relative inline-flex rounded-full bg-white/5 px-2 py-1 text-xs text-gray-200 border border-white/10 cursor-help"
            >
              {value}
              <span className="pointer-events-none absolute left-0 top-full z-20 mt-1.5 w-52 rounded-lg border border-white/15 bg-[#0f1020] px-3 py-2 text-xs leading-relaxed text-gray-100 opacity-0 shadow-xl transition-opacity duration-100 group-hover:opacity-100 group-focus-within:opacity-100">
                <span className="block">마크 시간: {tooltip!.minecraft}</span>
                <span className="block text-gray-300">Journeymap: {tooltip!.journeymap}</span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function PokemonSpawnPanel({ entries }: PokemonSpawnPanelProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/5 rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-pokeyellow font-bold">스폰 정보</h3>
      </div>

      <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-1">
        {entries.map((entry, entryIndex) => {
          const levelText = entry.minLevel !== undefined
            ? `${entry.minLevel}${entry.maxLevel !== undefined ? ` - ${entry.maxLevel}` : ""}`
            : undefined;

          return (
            <div key={`${entry.source}-${entry.locationTypes.join("/")}-${entry.biomes.join("/")}-${entry.times.join("/")}-${entry.weathers.join("/")}-${entryIndex}`} className="rounded-xl border border-white/10 bg-[#131322] p-3">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="rounded-full bg-pokeyellow/10 px-2.5 py-1 text-xs font-medium text-pokeyellow">
                  {CATEGORY_LABELS[entry.category] ?? entry.category}
                </span>
                {entry.isBoss && (
                  <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-300">
                    보스
                  </span>
                )}
                {levelText && (
                  <span className="text-xs text-gray-400">Lv. {levelText}</span>
                )}
                {entry.rarity !== undefined && (
                  <span className="text-xs text-gray-500">희귀도 {entry.rarity}</span>
                )}
              </div>

              <div className="space-y-2">
                <EntryRow label="위치" values={entry.locationTypes} />
                <EntryRow label="시간대" values={entry.times} />
                <EntryRow label="날씨" values={entry.weathers} />
                <EntryRow label="바이옴" values={entry.biomes} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}