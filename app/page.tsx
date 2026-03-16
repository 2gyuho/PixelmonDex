import Link from "next/link";

export default function Home() {
  const cards = [
    {
      href: "/pokedex",
      title: "포켓몬 도감",
      desc: "1,084마리의 포켓몬 스폰 정보, 희귀도, 바이옴을 검색하세요.",
      color: "from-red-900/40 to-rose-800/20 border-red-700/30",
    },
    {
      href: "/items",
      title: "도구 정보",
      desc: "몬스터볼, 진화 아이템 등 픽셀몬 도구의 획득 방법을 확인하세요.",
      color: "from-blue-900/40 to-sky-800/20 border-blue-700/30",
    },
    {
      href: "/natures",
      title: "성격 / 크기",
      desc: "성격별 능력치 배율 표와 포켓몬 크기 정보를 확인하세요.",
      color: "from-green-900/40 to-emerald-800/20 border-green-700/30",
    },
    {
      href: "/curry",
      title: "카레 레시피",
      desc: "카레 등급, 열매 배합, 재료 점수 등 카레 조리법을 확인하세요.",
      color: "from-yellow-900/40 to-amber-800/20 border-yellow-700/30",
    },
  ];

  return (
    <div className="text-center">
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold mb-3">
          <span className="text-pokeyellow">픽셀몬</span>{" "}
          <span className="text-white">위키</span>
        </h1>
        <p className="text-gray-400 text-lg">
          마인크래프트 픽셀몬 모드 — 한국어 공략 정보
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ href, title, desc, color }) => (
          <Link
            key={href}
            href={href}
            className={`bg-gradient-to-br ${color} border rounded-2xl p-6 text-left hover:scale-105 transition-transform`}
          >
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
