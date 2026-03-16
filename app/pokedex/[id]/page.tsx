import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import pokemonData from "@/data/pokemon.json";
import { Pokemon } from "@/lib/types";
import TypeBadge from "@/components/TypeBadge";
import RarityBadge from "@/components/RarityBadge";
import PokemonFormInfo from "@/components/PokemonFormInfo";
import PokemonMetaPanel from "@/components/PokemonMetaPanel";
import PokemonSpawnPanel from "@/components/PokemonSpawnPanel";
import PokemonStatsPanel from "@/components/PokemonStatsPanel";
import { getPokemonSpriteUrl } from "@/lib/utils";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return (pokemonData as Pokemon[]).map((p) => ({ id: String(p.uid) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pokemon = (pokemonData as Pokemon[]).find((p) => p.uid === Number(params.id));
  if (!pokemon) return { title: "포켓몬 없음" };
  return {
    title: `${pokemon.name} (#${pokemon.id}) | 픽셀몬 위키`,
    description: `${pokemon.name} (${pokemon.nameEn}) — 타입: ${pokemon.type}, 희귀도: ${pokemon.rarity}`,
  };
}

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 py-2 border-b border-white/5 last:border-0">
      <span className="text-gray-400 text-sm w-32 shrink-0">{label}</span>
      <span className="text-white text-sm whitespace-pre-wrap leading-relaxed">{value}</span>
    </div>
  );
}

export default function PokemonDetailPage({ params }: Props) {
  const uid = Number(params.id);
  const list = pokemonData as Pokemon[];
  const pokemon = list.find((p) => p.uid === uid);
  if (!pokemon) notFound();

  const prev = list.find((p) => p.uid === uid - 1);
  const next = list.find((p) => p.uid === uid + 1);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 뒤로 가기 */}
      <Link href="/pokedex" className="text-gray-400 hover:text-pokeyellow text-sm mb-6 inline-flex items-center gap-1 transition-colors">
        ← 목록으로
      </Link>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-3">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="relative w-36 h-36 shrink-0">
            <Image
              src={getPokemonSpriteUrl(pokemon.id)}
              alt={pokemon.name}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">#{String(pokemon.id).padStart(3, "0")}</p>
            <h1 className="text-3xl font-extrabold text-white leading-tight">
              {pokemon.name.split("(")[0].trim()}
            </h1>
            {pokemon.name.includes("(") && (
              <p className="text-pokeyellow text-sm mt-0.5">
                ({pokemon.name.match(/\((.+?)\)/)?.[1]})
              </p>
            )}
            <p className="text-gray-400 mt-1">{pokemon.nameEn}</p>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <TypeBadge type={pokemon.type} />
              <RarityBadge rarity={pokemon.rarity} />
            </div>
          </div>
        </div>

        <PokemonStatsPanel stats={pokemon.stats} total={pokemon.bst} />
  <PokemonMetaPanel pokemon={pokemon} />
  <PokemonSpawnPanel entries={pokemon.officialSpawns} />

        {/* 포획 방법 */}
        {(pokemon.method || pokemon.form) && (
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <h2 className="text-pokeyellow font-bold mb-3">포획 / 진화 정보</h2>
            <InfoRow label="그 외 포획 방법" value={pokemon.method} />
            {pokemon.form && (
              <div className="flex gap-2 py-2 border-b border-white/5 last:border-0">
                <span className="text-gray-400 text-sm w-32 shrink-0">폼체인지 / 메가진화</span>
                <div className="min-w-0 flex-1">
                  <PokemonFormInfo value={pokemon.form} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 이전 / 다음 */}
      <div className="flex justify-between mt-6 gap-3">
        {prev ? (
          <Link
            href={`/pokedex/${prev.uid}`}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-center transition-colors"
          >
            <p className="text-gray-500 text-xs">← 이전</p>
            <p className="text-white text-sm font-medium">#{prev.id} {prev.name.split("(")[0].trim()}</p>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link
            href={`/pokedex/${next.uid}`}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-center transition-colors"
          >
            <p className="text-gray-500 text-xs">다음 →</p>
            <p className="text-white text-sm font-medium">#{next.id} {next.name.split("(")[0].trim()}</p>
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  );
}
