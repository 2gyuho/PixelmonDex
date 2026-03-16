"use client";

import { useState } from "react";

const ALL_TYPES = [
  "노말","불꽃","물","전기","풀","얼음","격투","독","땅","비행","에스퍼","벌레","바위","고스트","드래곤","악","강철","페어리",
];

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "노말":   { bg: "#9CA3AF", text: "#FFFFFF" },
  "불꽃":   { bg: "#F97316", text: "#FFFFFF" },
  "물":     { bg: "#3B82F6", text: "#FFFFFF" },
  "전기":   { bg: "#FACC15", text: "#1F2937" },
  "풀":     { bg: "#22C55E", text: "#FFFFFF" },
  "얼음":   { bg: "#67E8F9", text: "#0F172A" },
  "격투":   { bg: "#B91C1C", text: "#FFFFFF" },
  "독":     { bg: "#9333EA", text: "#FFFFFF" },
  "땅":     { bg: "#A16207", text: "#FFFFFF" },
  "비행":   { bg: "#38BDF8", text: "#FFFFFF" },
  "에스퍼": { bg: "#EC4899", text: "#FFFFFF" },
  "벌레":   { bg: "#65A30D", text: "#FFFFFF" },
  "바위":   { bg: "#78716C", text: "#FFFFFF" },
  "고스트": { bg: "#4338CA", text: "#FFFFFF" },
  "드래곤": { bg: "#6D28D9", text: "#FFFFFF" },
  "악":     { bg: "#1F2937", text: "#FFFFFF" },
  "강철":   { bg: "#64748B", text: "#FFFFFF" },
  "페어리": { bg: "#F9A8D4", text: "#1F2937" },
};

// TYPE_CHART[attackType][defType] = multiplier (기본값 1)
const TYPE_CHART: Record<string, Record<string, number>> = {
  "노말":   { "바위": 0.5, "강철": 0.5, "고스트": 0 },
  "불꽃":   { "불꽃": 0.5, "물": 0.5, "바위": 0.5, "드래곤": 0.5, "풀": 2, "얼음": 2, "벌레": 2, "강철": 2 },
  "물":     { "물": 0.5, "풀": 0.5, "드래곤": 0.5, "불꽃": 2, "땅": 2, "바위": 2 },
  "전기":   { "전기": 0.5, "풀": 0.5, "드래곤": 0.5, "땅": 0, "물": 2, "비행": 2 },
  "풀":     { "불꽃": 0.5, "풀": 0.5, "독": 0.5, "비행": 0.5, "벌레": 0.5, "드래곤": 0.5, "강철": 0.5, "물": 2, "땅": 2, "바위": 2 },
  "얼음":   { "물": 0.5, "불꽃": 0.5, "얼음": 0.5, "강철": 0.5, "풀": 2, "땅": 2, "비행": 2, "드래곤": 2 },
  "격투":   { "독": 0.5, "비행": 0.5, "에스퍼": 0.5, "벌레": 0.5, "페어리": 0.5, "고스트": 0, "노말": 2, "얼음": 2, "바위": 2, "악": 2, "강철": 2 },
  "독":     { "독": 0.5, "땅": 0.5, "바위": 0.5, "고스트": 0.5, "강철": 0, "풀": 2, "페어리": 2 },
  "땅":     { "풀": 0.5, "벌레": 0.5, "비행": 0, "불꽃": 2, "전기": 2, "독": 2, "바위": 2, "강철": 2 },
  "비행":   { "전기": 0.5, "바위": 0.5, "강철": 0.5, "풀": 2, "격투": 2, "벌레": 2 },
  "에스퍼": { "에스퍼": 0.5, "강철": 0.5, "악": 0, "격투": 2, "독": 2 },
  "벌레":   { "불꽃": 0.5, "격투": 0.5, "비행": 0.5, "고스트": 0.5, "강철": 0.5, "페어리": 0.5, "풀": 2, "에스퍼": 2, "악": 2 },
  "바위":   { "격투": 0.5, "땅": 0.5, "강철": 0.5, "불꽃": 2, "얼음": 2, "비행": 2, "벌레": 2 },
  "고스트": { "악": 0.5, "노말": 0, "고스트": 2, "에스퍼": 2 },
  "드래곤": { "강철": 0.5, "페어리": 0, "드래곤": 2 },
  "악":     { "격투": 0.5, "악": 0.5, "페어리": 0.5, "고스트": 2, "에스퍼": 2 },
  "강철":   { "불꽃": 0.5, "물": 0.5, "전기": 0.5, "강철": 0.5, "얼음": 2, "바위": 2, "페어리": 2 },
  "페어리": { "불꽃": 0.5, "독": 0.5, "강철": 0.5, "격투": 2, "드래곤": 2, "악": 2 },
};

function calcDefMult(atkType: string, defTypes: string[]): number {
  return defTypes.reduce((acc, dt) => acc * (TYPE_CHART[atkType]?.[dt] ?? 1), 1);
}

function TypeChip({ type }: { type: string }) {
  const c = TYPE_COLORS[type] ?? { bg: "#374151", text: "#E5E7EB" };
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {type}
    </span>
  );
}

const DEF_ROWS = [
  { mult: 4,    label: "4x 약점",  cls: "text-red-400" },
  { mult: 2,    label: "2x 약점",  cls: "text-rose-400" },
  { mult: 0.5,  label: "0.5x 저항", cls: "text-green-400" },
  { mult: 0.25, label: "0.25x 저항", cls: "text-emerald-400" },
  { mult: 0,    label: "무효",     cls: "text-gray-500" },
];

const ATK_ROWS = [
  { mult: 2,   label: "효과 굉장함 2x", cls: "text-rose-400" },
  { mult: 0.5, label: "효과 별로 0.5x",  cls: "text-green-400" },
  { mult: 0,   label: "효과 없음 0x",  cls: "text-gray-500" },
];

export default function PokemonTypeChart({ type }: { type: string }) {
  const [tab, setTab] = useState<"def" | "atk">("def");
  const myTypes = type.split("/").map((t) => t.trim()).filter(Boolean);

  // 내가 공격받을 때: 각 공격 타입이 나에게 주는 배율
  const defMap: Record<number, string[]> = {};
  for (const at of ALL_TYPES) {
    const m = calcDefMult(at, myTypes);
    if (m === 1) continue;
    (defMap[m] ??= []).push(at);
  }

  // 내가 공격할 때: 내 타입 기술이 각 방어 타입에 주는 배율
  const atkData = myTypes.map((at) => {
    const map: Record<number, string[]> = {};
    for (const dt of ALL_TYPES) {
      const m = TYPE_CHART[at]?.[dt] ?? 1;
      if (m === 1) continue;
      (map[m] ??= []).push(dt);
    }
    return { at, map };
  });

  return (
    <div className="bg-white/5 rounded-xl p-4 mb-4">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <h3 className="text-pokeyellow font-bold mr-1">타입 상성</h3>
        <button
          onClick={() => setTab("def")}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            tab === "def" ? "bg-pokeyellow text-[#1a1a2e]" : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          내가 공격받을 때
        </button>
        <button
          onClick={() => setTab("atk")}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            tab === "atk" ? "bg-pokeyellow text-[#1a1a2e]" : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          내가 공격할 때
        </button>
      </div>

      {tab === "def" && (
        <div className="space-y-2.5">
          {DEF_ROWS.map(({ mult, label, cls }) => {
            const types = defMap[mult];
            if (!types?.length) return null;
            return (
              <div key={mult} className="flex items-center gap-3">
                <span className={`text-xs font-semibold w-20 shrink-0 ${cls}`}>{label}</span>
                <div className="flex flex-wrap gap-1.5">
                  {types.map((t) => <TypeChip key={t} type={t} />)}
                </div>
              </div>
            );
          })}
          {Object.keys(defMap).length === 0 && (
            <p className="text-sm text-gray-500">모든 타입의 공격에 1× 효과를 받습니다.</p>
          )}
        </div>
      )}

      {tab === "atk" && (
        <div className="space-y-4">
          {atkData.map(({ at, map }) => (
            <div key={at}>
              <div className="flex items-center gap-2 mb-2">
                <TypeChip type={at} />
                <span className="text-xs text-gray-400">기술로 공격 시</span>
              </div>
              <div className="space-y-2 pl-1">
                {ATK_ROWS.map(({ mult, label, cls }) => {
                  const types = map[mult];
                  if (!types?.length) return null;
                  return (
                    <div key={mult} className="flex items-center gap-3">
                      <span className={`text-xs font-semibold w-28 shrink-0 ${cls}`}>{label}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {types.map((t) => <TypeChip key={t} type={t} />)}
                      </div>
                    </div>
                  );
                })}
                {Object.keys(map).length === 0 && (
                  <p className="text-xs text-gray-500 pl-1">모든 상대에게 1× 효과</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
