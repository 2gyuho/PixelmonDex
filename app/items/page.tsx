import { Metadata } from "next";
import itemsData from "@/data/items.json";
import { Item } from "@/lib/types";
import ItemsClient from "./ItemsClient";

export const metadata: Metadata = {
  title: "도구 정보 | 픽셀몬 위키",
  description: "픽셀몬 도구 획득 방법 및 제작 방법",
};

export default function ItemsPage() {
  const items = itemsData as Item[];
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-pokeyellow mb-2">도구 정보</h1>
      <p className="text-gray-400 mb-6 text-sm">몬스터볼, 진화 아이템 등 픽셀몬 도구의 획득·제작 방법을 확인하세요.</p>
      <ItemsClient items={items} />
    </div>
  );
}
