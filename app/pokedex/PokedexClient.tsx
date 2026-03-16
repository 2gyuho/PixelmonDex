"use client";

import { useState, useMemo } from "react";
import { Pokemon } from "@/lib/types";
import PokemonCard from "@/components/PokemonCard";
import PokemonModal from "@/components/PokemonModal";

const RARITY_OPTIONS = ["전체", "Common", "Uncommon", "Rare", "Ultra Rare", "Special"];
const SPAWN_TIME_OPTIONS = ["전체", "아침", "낮", "저녁", "밤", "새벽"];
const PAGE_SIZE = 60;

const ALL_TYPES = ["노말","불꽃","물","전기","풀","얼음","격투","독","땅","비행","에스퍼","벌레","바위","고스트","드래곤","악","강철","페어리"];

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "노말":   { bg: "#9CA3AF", text: "#FFF" },
  "불꽃":   { bg: "#F97316", text: "#FFF" },
  "물":     { bg: "#3B82F6", text: "#FFF" },
  "전기":   { bg: "#FACC15", text: "#1F2937" },
  "풀":     { bg: "#22C55E", text: "#FFF" },
  "얼음":   { bg: "#67E8F9", text: "#0F172A" },
  "격투":   { bg: "#B91C1C", text: "#FFF" },
  "독":     { bg: "#9333EA", text: "#FFF" },
  "땅":     { bg: "#A16207", text: "#FFF" },
  "비행":   { bg: "#38BDF8", text: "#FFF" },
  "에스퍼": { bg: "#EC4899", text: "#FFF" },
  "벌레":   { bg: "#65A30D", text: "#FFF" },
  "바위":   { bg: "#78716C", text: "#FFF" },
  "고스트": { bg: "#4338CA", text: "#FFF" },
  "드래곤": { bg: "#6D28D9", text: "#FFF" },
  "악":     { bg: "#1F2937", text: "#FFF" },
  "강철":   { bg: "#64748B", text: "#FFF" },
  "페어리": { bg: "#F9A8D4", text: "#1F2937" },
};

interface PokedexClientProps {
  pokemonList: Pokemon[];
}

export default function PokedexClient({ pokemonList }: PokedexClientProps) {
  const [query, setQuery] = useState("");
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [rarityFilter, setRarityFilter] = useState("전체");
  const [spawnFilter, setSpawnFilter] = useState("전체");
  const [page, setPage] = useState(1);
  const [selectedUid, setSelectedUid] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return pokemonList.filter((p) => {
      const matchQuery =
        !q ||
        p.name.includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        String(p.id).includes(q);
      const pTypes = p.type.split("/").map((t) => t.trim());
      const matchType =
        typeFilters.length === 0 || typeFilters.every((t) => pTypes.includes(t));
      const matchRarity =
        rarityFilter === "전체" || p.rarity.includes(rarityFilter);
      const matchSpawn =
        spawnFilter === "전체" || p.spawnTime.includes(spawnFilter);
      return matchQuery && matchType && matchRarity && matchSpawn;
    });
  }, [pokemonList, query, typeFilters, rarityFilter, spawnFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);

  // 모달용: filtered 기준 이전/다음
  const selectedIdx = selectedUid !== null ? filtered.findIndex((p) => p.uid === selectedUid) : -1;
  const selectedPokemon = selectedIdx >= 0 ? filtered[selectedIdx] : null;
  const prevPokemon = selectedIdx > 0 ? filtered[selectedIdx - 1] : undefined;
  const nextPokemon = selectedIdx < filtered.length - 1 ? filtered[selectedIdx + 1] : undefined;

  const toggleType = (t: string) => {
    setTypeFilters((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
    resetPage();
  };

  return (
    <>
      {/* 검색 / 필터 바 */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex flex-col gap-3">
        {/* 1행: 검색 + 희귀도 + 시간대 + 초기화 */}
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <input
            type="text"
            placeholder="포켓몬 이름 또는 번호 검색..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); resetPage(); }}
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm outline-none focus:border-pokeyellow"
          />
          <select
            value={rarityFilter}
            onChange={(e) => { setRarityFilter(e.target.value); resetPage(); }}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-pokeyellow"
          >
            {RARITY_OPTIONS.map((r) => <option key={r} value={r} className="bg-gray-900">{r}</option>)}
          </select>
          <select
            value={spawnFilter}
            onChange={(e) => { setSpawnFilter(e.target.value); resetPage(); }}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-pokeyellow"
          >
            {SPAWN_TIME_OPTIONS.map((s) => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
          </select>
          <button
            onClick={() => { setQuery(""); setTypeFilters([]); setRarityFilter("전체"); setSpawnFilter("전체"); resetPage(); }}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
          >
            초기화
          </button>
        </div>

        {/* 2행: 타입 다중 선택 토글 */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
          <span className="text-xs text-gray-500 self-center mr-1">타입</span>
          {ALL_TYPES.map((t) => {
            const active = typeFilters.includes(t);
            const c = TYPE_COLORS[t] ?? { bg: "#374151", text: "#E5E7EB" };
            return (
              <button
                key={t}
                onClick={() => toggleType(t)}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all border ${
                  active ? "ring-2 ring-white/60 scale-105" : "opacity-50 hover:opacity-80"
                }`}
                style={{ backgroundColor: c.bg, color: c.text, borderColor: active ? "#fff" : "transparent" }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* 결과 수 */}
      <p className="text-gray-500 text-sm mb-4">
        총 <span className="text-pokeyellow font-bold">{filtered.length}</span>마리
      </p>

      {/* 카드 그리드 */}
      {paged.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {paged.map((p) => (
            <PokemonCard
              key={p.uid}
              pokemon={p}
              onClick={() => setSelectedUid(p.uid)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-16">검색 결과가 없습니다.</p>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ‹ 이전
          </button>
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
            const offset = Math.max(0, Math.min(page - 6, totalPages - 10));
            const n = i + 1 + offset;
            return (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  page === n
                    ? "bg-pokeyellow text-pokegray"
                    : "bg-white/10 hover:bg-white/20 text-gray-300"
                }`}
              >
                {n}
              </button>
            );
          })}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            다음 ›
          </button>
        </div>
      )}

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedUid(null)}
          onPrev={prevPokemon ? () => setSelectedUid(prevPokemon.uid) : undefined}
          onNext={nextPokemon ? () => setSelectedUid(nextPokemon.uid) : undefined}
        />
      )}
    </>
  );
}
