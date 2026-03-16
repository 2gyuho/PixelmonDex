import { Metadata } from "next";
import pokemonData from "@/data/pokemon.json";
import { Pokemon } from "@/lib/types";
import PokedexClient from "./PokedexClient";

export const metadata: Metadata = {
  title: "포켓몬 도감 | 픽셀몬 위키",
  description: "픽셀몬 포켓몬 스폰 정보, 희귀도, 바이옴 검색",
};

export default function PokedexPage() {
  const pokemonList = pokemonData as Pokemon[];
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-pokeyellow mb-2">포켓몬 도감</h1>
      <p className="text-gray-400 mb-6 text-sm">이름·번호·타입·희귀도·스폰 시간대로 검색할 수 있습니다.</p>
      <PokedexClient pokemonList={pokemonList} />
    </div>
  );
}
