"use client";

import Image from "next/image";
import { Pokemon } from "@/lib/types";
import TypeBadge from "./TypeBadge";
import RarityBadge from "./RarityBadge";
import { getPokemonSpriteUrl } from "@/lib/utils";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 flex flex-col items-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-pokeyellow/50 hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)] cursor-pointer w-full text-left"
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-16 bg-gradient-to-b from-pokeyellow/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative w-20 h-20">
        <Image
          src={getPokemonSpriteUrl(pokemon.id)}
          alt={pokemon.name}
          fill
          className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
          unoptimized
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/pokeball-placeholder.png";
          }}
        />
      </div>
      <span className="text-gray-400 text-[11px] tracking-wider">#{String(pokemon.id).padStart(3, "0")}</span>
      <h3 className="text-white font-bold text-center text-sm leading-tight tracking-tight">
        {pokemon.name.split("(")[0].trim()}
      </h3>
      <p className="text-gray-400 text-xs tracking-wide">{pokemon.nameEn}</p>
      <TypeBadge type={pokemon.type} small />
      <RarityBadge rarity={pokemon.rarity} />
    </button>
  );
}
