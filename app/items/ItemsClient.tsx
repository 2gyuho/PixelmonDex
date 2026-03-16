"use client";

import { useState, useMemo } from "react";
import { Item } from "@/lib/types";

interface ItemsClientProps {
  items: Item[];
}

export default function ItemsClient({ items }: ItemsClientProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.info.toLowerCase().includes(q) ||
        item.obtain.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div>
      <input
        type="text"
        placeholder="도구 이름 또는 설명 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm outline-none focus:border-pokeyellow mb-6"
      />

      <p className="text-gray-500 text-sm mb-4">
        총 <span className="text-pokeyellow font-bold">{filtered.length}</span>개
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
            <h3 className="text-pokeyellow font-bold text-base mb-2">🎒 {item.name}</h3>
            {item.info && (
              <p className="text-gray-300 text-sm mb-2 leading-relaxed whitespace-pre-line">{item.info}</p>
            )}
            {item.obtain && (
              <div className="text-sm mt-2">
                <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">획득 방법</span>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{item.obtain}</p>
              </div>
            )}
            {item.craft && (
              <div className="text-sm mt-2">
                <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">제작 방법</span>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{item.craft}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-16">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
