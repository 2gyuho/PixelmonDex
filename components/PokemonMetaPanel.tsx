import { Pokemon } from "@/lib/types";

interface PokemonMetaPanelProps {
  pokemon: Pokemon;
}

const META_HELP_TEXT: Record<string, string> = {
  "포획률": "수치가 높을수록 포켓몬을 잡기 쉽습니다.",
  "키": "포켓몬의 평균 신장(미터)입니다.",
  "몸무게": "포켓몬의 평균 체중(킬로그램)입니다.",
  "기본 경험치": "이 포켓몬을 쓰러뜨렸을 때 얻는 기본 경험치입니다.",
  "기본 친밀도": "처음 얻었을 때 시작하는 친밀도 수치입니다.",
  "성비(수컷)": "수컷 개체가 나올 확률입니다. 나머지는 암컷입니다.",
};

function ChipList({ values }: { values: string[] }) {
  if (values.length === 0) {
    return <span className="text-sm text-gray-500">없음</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value, index) => (
        <span key={`${value}-${index}`} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-200">
          {value}
        </span>
      ))}
    </div>
  );
}

function InfoGridItem({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const helpText = META_HELP_TEXT[label];

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-1">
        <p className="text-xs text-gray-500">{label}</p>
        {helpText && (
          <div className="relative group">
            <span className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-gray-600 text-[10px] text-gray-400">
              ?
            </span>
            <div className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-52 rounded-lg border border-white/15 bg-[#0f1020] px-3 py-2 text-xs leading-relaxed text-gray-100 opacity-0 shadow-xl transition-opacity duration-100 group-hover:opacity-100">
              {helpText}
            </div>
          </div>
        )}
      </div>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export default function PokemonMetaPanel({ pokemon }: PokemonMetaPanelProps) {
  return (
    <div className="bg-white/5 rounded-xl p-4 mb-4">
      <h3 className="text-pokeyellow font-bold mb-4">기본 정보</h3>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 mb-2">특성</p>
          <ChipList values={pokemon.abilities} />
        </div>

        {pokemon.hiddenAbilities.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">숨겨진 특성</p>
            <ChipList values={pokemon.hiddenAbilities} />
          </div>
        )}

        {pokemon.eggGroups.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">알 그룹</p>
            <ChipList values={pokemon.eggGroups} />
          </div>
        )}

        {pokemon.evYields.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">EV 보상</p>
            <ChipList values={pokemon.evYields} />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <InfoGridItem label="포획률" value={pokemon.catchRate} />
          <InfoGridItem label="키" value={pokemon.height ? `${pokemon.height}m` : undefined} />
          <InfoGridItem label="몸무게" value={pokemon.weight ? `${pokemon.weight}kg` : undefined} />
          <InfoGridItem label="기본 경험치" value={pokemon.baseExp} />
          <InfoGridItem label="기본 친밀도" value={pokemon.baseFriendship} />
          <InfoGridItem label="성비(수컷)" value={pokemon.malePercentage !== undefined ? `${pokemon.malePercentage}%` : undefined} />
        </div>
      </div>
    </div>
  );
}