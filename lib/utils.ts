export const TYPE_COLORS: Record<string, string> = {
  "노말":   "bg-gray-400 text-white",
  "불꽃":   "bg-orange-500 text-white",
  "물":     "bg-blue-500 text-white",
  "풀":     "bg-green-500 text-white",
  "전기":   "bg-yellow-400 text-black",
  "얼음":   "bg-cyan-300 text-black",
  "격투":   "bg-red-700 text-white",
  "독":     "bg-purple-600 text-white",
  "땅":     "bg-yellow-700 text-white",
  "비행":   "bg-sky-400 text-white",
  "에스퍼": "bg-pink-500 text-white",
  "벌레":   "bg-lime-600 text-white",
  "바위":   "bg-stone-500 text-white",
  "고스트": "bg-indigo-700 text-white",
  "드래곤": "bg-violet-700 text-white",
  "악":     "bg-gray-800 text-white",
  "강철":   "bg-slate-500 text-white",
  "페어리": "bg-pink-300 text-black",
};

export const RARITY_COLORS: Record<string, string> = {
  "Common":       "bg-gray-200 text-gray-800 border border-gray-400",
  "Uncommon":     "bg-green-100 text-green-800 border border-green-500",
  "Rare":         "bg-blue-100 text-blue-800 border border-blue-500",
  "Ultra Rare":   "bg-purple-100 text-purple-800 border border-purple-500",
  "Special":      "bg-yellow-100 text-yellow-800 border border-yellow-500",
};

export const SPAWN_TIME_LABELS: Record<string, string> = {
  "아침": "🌅",
  "낮":   "☀️",
  "저녁": "🌆",
  "밤":   "🌙",
  "새벽": "🌃",
  "모든시간대": "🕐",
  "특정 시간 없음": "⏱️",
};

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type] ?? "bg-gray-300 text-gray-800";
}

export function getRarityColor(rarity: string): string {
  for (const key of Object.keys(RARITY_COLORS)) {
    if (rarity.includes(key)) return RARITY_COLORS[key];
  }
  return "bg-gray-200 text-gray-700";
}

export function getPokemonImageUrl(nameEn: string): string {
  const encoded = nameEn.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://img.pokemondb.net/artwork/large/${encoded}.jpg`;
}

export function getPokemonSpriteUrl(id: number): string {
  const padded = String(id).padStart(3, "0");
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
