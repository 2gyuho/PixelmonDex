"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Pokemon } from "@/lib/types";
import TypeBadge from "./TypeBadge";
import RarityBadge from "./RarityBadge";
import PokemonFormInfo from "./PokemonFormInfo";
import PokemonMetaPanel from "./PokemonMetaPanel";
import PokemonSpawnPanel from "./PokemonSpawnPanel";
import PokemonStatsPanel from "./PokemonStatsPanel";
import PokemonTypeChart from "./PokemonTypeChart";
import { getPokemonSpriteUrl } from "@/lib/utils";

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
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

export default function PokemonModal({ pokemon, onClose, onPrev, onNext }: PokemonModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  // 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* 모달 패널 */}
      <div
        className="relative bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
        >
          ✕
        </button>

        <div className="p-6">
          {/* 헤더 */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
            <div className="relative w-32 h-32 shrink-0">
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
              <h2 className="text-2xl font-extrabold text-white leading-tight">
                {pokemon.name.split("(")[0].trim()}
              </h2>
              {pokemon.name.includes("(") && (
                <p className="text-pokeyellow text-sm mt-0.5">
                  ({pokemon.name.match(/\((.+?)\)/)?.[1]})
                </p>
              )}
              <p className="text-gray-400 text-sm mt-1">{pokemon.nameEn}</p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <TypeBadge type={pokemon.type} />
                <RarityBadge rarity={pokemon.rarity} />
              </div>
            </div>
          </div>

          <PokemonStatsPanel stats={pokemon.stats} total={pokemon.bst} />
          <PokemonTypeChart type={pokemon.type} />
          <PokemonMetaPanel pokemon={pokemon} />
          <PokemonSpawnPanel entries={pokemon.officialSpawns} />

          {/* 포획 / 진화 */}
          {(pokemon.method || pokemon.form) && (
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <h3 className="text-pokeyellow font-bold mb-3">포획 / 진화 정보</h3>
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

        {/* 이전 / 다음 버튼 */}
        <div className="flex border-t border-white/5">
          <button
            onClick={onPrev}
            disabled={!onPrev}
            className="flex-1 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors rounded-bl-2xl disabled:opacity-20 disabled:cursor-not-allowed"
          >
            ← 이전
          </button>
          <div className="w-px bg-white/5" />
          <button
            onClick={onNext}
            disabled={!onNext}
            className="flex-1 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors rounded-br-2xl disabled:opacity-20 disabled:cursor-not-allowed"
          >
            다음 →
          </button>
        </div>
      </div>
    </div>
  );
}
