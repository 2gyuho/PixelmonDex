import { Metadata } from "next";

export const metadata: Metadata = {
  title: "카레 레시피 | 픽셀몬 위키",
  description: "픽셀몬 카레 등급, 열매, 식재료 정보",
};

const GRADES = [
  { name: "또가스급", effect: "25% HP 회복 · +200 XP · 10 친밀도 상승", color: "bg-gray-600" },
  { name: "마자용급", effect: "50% HP 회복 · +480 XP · 25 친밀도 상승", color: "bg-green-700" },
  { name: "마빌크급", effect: "100% HP 회복 · +1050 XP · 40 친밀도 · 상태이상 회복", color: "bg-blue-700" },
  { name: "대왕끼리동급", effect: "100% HP · +1890 XP · 50 친밀도 · 상태이상·PP 전회복", color: "bg-violet-700" },
  { name: "리자몽급", effect: "100% HP · +2980 XP · 75 친밀도 · 상태이상·PP 전회복", color: "bg-orange-600" },
];

const QUALITY_FORMULA = [
  { grade: "또가스급", cond: "Quality ≤ 15" },
  { grade: "마자용급", cond: "15 < Quality ≤ 40" },
  { grade: "마빌크급", cond: "40 < Quality ≤ 75" },
  { grade: "대왕끼리동급", cond: "75 < Quality ≤ 125" },
  { grade: "리자몽급", cond: "125 < Quality" },
];

const BERRIES = [
  { name: "버치 열매", flavor: "매운맛 10" },
  { name: "유루 열매", flavor: "떫은맛 10" },
  { name: "복슝 열매", flavor: "단맛 10" },
  { name: "복분 열매", flavor: "쓴맛 10" },
  { name: "배리 열매", flavor: "신맛 10" },
  { name: "과사 열매", flavor: "매운·단·쓴·신맛 10" },
  { name: "오랭 열매", flavor: "매운·떫·쓴·신맛 10" },
  { name: "시몬 열매", flavor: "매운·떫·단·신맛 10" },
  { name: "리샘 열매", flavor: "매운·떫·단·쓴맛 10" },
  { name: "자뭉 열매", flavor: "떫·단·쓴·신맛 10" },
  { name: "무화 열매", flavor: "매운맛 15" },
  { name: "위키 열매", flavor: "떫은맛 15" },
  { name: "마고 열매", flavor: "단맛 15" },
  { name: "아바 열매", flavor: "쓴맛 15" },
  { name: "파야 열매", flavor: "신맛 15" },
  { name: "스타 열매", flavor: "매운·떫·단·쓴·신맛 30 (주요 재료)", highlight: true },
  { name: "랑사 열매", flavor: "매운·떫·단·쓴·신맛 30 (주요 재료)", highlight: true },
  { name: "악키 열매", flavor: "매운·떫·단·쓴·신맛 (주요 재료)", highlight: true },
  { name: "타라프 열매", flavor: "매운·떫·단·쓴·신맛 (주요 재료)", highlight: true },
];

const INGREDIENTS = [
  { name: "토스트", score: "2점" },
  { name: "파스타", score: "" },
  { name: "모둠튀김", score: "" },
  { name: "레토르트면", score: "" },
  { name: "레토르트햄버그", score: "" },
  { name: "탱글탱글 부어스트", score: "5점" },
  { name: "콩 통조림", score: "" },
  { name: "버섯팩", score: "" },
  { name: "포테이토팩", score: "" },
  { name: "채소팩", score: "" },
  { name: "야자밀크", score: "12점" },
  { name: "린드 열매(거대파우더)", score: "20점" },
];

const TIPS = [
  { title: "가성비 리자몽급", desc: "스타열매 또는 랑사열매 6개만 넣고 25번 우클릭" },
  { title: "리자몽급 확실히", desc: "랑사·스타·악키·타라프열매를 요리솥에 가득 채우고 15번 이상 우클릭" },
];

export default function CurryPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-pokeyellow mb-2">카레 레시피</h1>
      <p className="text-gray-400 mb-8 text-sm">카레 등급, 열매 맛 수치, 식재료 점수 정보</p>

      {/* 등급 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">카레 등급</h2>
        <div className="space-y-3">
          {GRADES.map(({ name, effect, color }) => (
            <div key={name} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
              <span className={`${color} text-white font-bold text-sm px-3 py-1.5 rounded-lg shrink-0 min-w-[110px] text-center`}>
                {name}
              </span>
              <span className="text-gray-300 text-sm">{effect}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 공식 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Quality 공식</h2>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <p className="text-gray-400 text-sm mb-3">Quality = keyValue + max(fan, stir)</p>
          <ul className="text-gray-400 text-sm space-y-1">
            <li><span className="text-pokeyellow">keyValue</span> — 식재료 점수 합계</li>
            <li><span className="text-pokeyellow">fan</span> — 조리 중 부채질 횟수</li>
            <li><span className="text-pokeyellow">stir</span> — 조리 중 음식 젓는 횟수</li>
          </ul>
        </div>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/10 text-gray-400">
                <th className="px-4 py-2 text-left">등급</th>
                <th className="px-4 py-2 text-left">조건</th>
              </tr>
            </thead>
            <tbody>
              {QUALITY_FORMULA.map(({ grade, cond }) => (
                <tr key={grade} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-2 text-white font-medium">{grade}</td>
                  <td className="px-4 py-2 text-gray-300 font-mono">{cond}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 팁 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">요리 팁</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {TIPS.map(({ title, desc }) => (
            <div key={title} className="bg-pokeyellow/10 border border-pokeyellow/30 rounded-xl p-4">
              <p className="text-pokeyellow font-bold text-sm mb-1">{title}</p>
              <p className="text-gray-300 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 열매 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">열매 맛 수치</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {BERRIES.map(({ name, flavor, highlight }) => (
            <div
              key={name}
              className={`flex justify-between items-center px-4 py-2.5 rounded-lg border text-sm ${
                highlight
                  ? "bg-pokeyellow/10 border-pokeyellow/40 text-pokeyellow"
                  : "bg-white/5 border-white/10 text-gray-300"
              }`}
            >
              <span className="font-medium">{name}</span>
              <span className={highlight ? "text-pokeyellow/80" : "text-gray-500"}>{flavor}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 식재료 */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">식재료 점수</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {INGREDIENTS.map(({ name, score }) => (
            <div key={name} className="flex justify-between items-center px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm">
              <span className="text-gray-300">{name}</span>
              {score && <span className="text-pokeyellow font-bold">{score}</span>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
