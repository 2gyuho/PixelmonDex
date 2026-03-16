import { Metadata } from "next";

export const metadata: Metadata = {
  title: "성격 / 크기 | 픽셀몬 위키",
  description: "포켓몬 성격별 능력치 배율 및 크기 정보",
};

const NATURES = [
  {
    down: "공격(A)",
    up: "방어(B)",
    name: "외로운 / Lonely",
    effect: { up: "공격", down: "방어" },
  },
];

// 성격표 데이터 (하강→상승 순서)
const NATURE_TABLE = {
  headers: {
    rows: ["공격(A)", "방어(B)", "특수공격(C)", "특수방어(D)", "스피드(S)"],
    cols: ["공격(A)", "방어(B)", "특수공격(C)", "특수방어(D)", "스피드(S)"],
  },
  data: [
    ["변덕/Quirky(중립)", "외로운/Lonely", "고집스런/Adamant", "개구쟁이/Naughty", "용감한/Brave"],
    ["대담/Bold", "수줍음/Bashful(중립)", "장난꾸러기/Impish", "촐랑/Lax", "무사태평/Relaxed"],
    ["조심/Modest", "의젓/Mild", "노력/Hardy(중립)", "덜렁/Rash", "냉정/Quiet"],
    ["차분/Calm", "얌전/Gentle", "신중/Careful", "온순/Docile(중립)", "건방/Sassy"],
    ["겁쟁이/Timid", "성급/Hasty", "명량/Jolly", "천진난만/Naive", "성실/Serious(중립)"],
  ],
};

// 크기 정보
const SIZE_TABLE = [
  { size: "가장 작음", en: "Microscopic", desc: "매우 희귀한 미니 크기" },
  { size: "매우 작음", en: "Pygmy", desc: "" },
  { size: "작음", en: "Runt", desc: "" },
  { size: "조금 작음", en: "Small", desc: "" },
  { size: "보통", en: "Ordinary", desc: "기본 크기" },
  { size: "조금 큼", en: "Huge", desc: "" },
  { size: "큼", en: "Giant", desc: "" },
  { size: "매우 큼", en: "Enormous", desc: "" },
  { size: "가장 큼", en: "Ginormous", desc: "매우 희귀한 대형 크기" },
];

const STAT_COLORS: Record<string, string> = {
  "공격(A)": "text-red-400",
  "방어(B)": "text-orange-400",
  "특수공격(C)": "text-blue-400",
  "특수방어(D)": "text-green-400",
  "스피드(S)": "text-yellow-400",
};

export default function NaturesPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-pokeyellow mb-2">성격 / 크기</h1>
      <p className="text-gray-400 mb-8 text-sm">성격별 능력치 1.1× 상승 / 0.9× 하강 배율 표</p>

      {/* 성격표 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-1">성격표</h2>
        <p className="text-gray-500 text-xs mb-4">행 = 하강 스탯 · 열 = 상승 스탯 · 대각선(중립)은 능력치 변화 없음</p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-white/10 text-gray-300">
                <th className="px-3 py-2 text-left border-r border-white/10 text-gray-500">하강 ↓ / 상승 →</th>
                {NATURE_TABLE.headers.cols.map((col) => (
                  <th key={col} className={`px-3 py-2 ${STAT_COLORS[col] ?? ""}`}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NATURE_TABLE.data.map((row, ri) => (
                <tr key={ri} className="border-t border-white/5 hover:bg-white/5">
                  <td className={`px-3 py-2 border-r border-white/10 font-medium ${STAT_COLORS[NATURE_TABLE.headers.rows[ri]] ?? "text-gray-300"}`}>
                    {NATURE_TABLE.headers.rows[ri]}
                  </td>
                  {row.map((cell, ci) => {
                    const isNeutral = ri === ci;
                    return (
                      <td key={ci} className={`px-3 py-2 text-center ${isNeutral ? "text-gray-500 bg-white/5" : "text-white"}`}>
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 크기표 */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">포켓몬 크기</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {SIZE_TABLE.map(({ size, en, desc }) => (
            <div key={en} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">
                {size === "가장 작음" ? "🔬" : size === "가장 큼" ? "🏔️" : size === "보통" ? "⚖️" : "📏"}
              </div>
              <p className="text-white font-bold text-sm">{size}</p>
              <p className="text-gray-500 text-xs">{en}</p>
              {desc && <p className="text-pokeyellow text-xs mt-1">{desc}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
