interface PokemonFormInfoProps {
  value: string;
}

interface FormSection {
  title: string;
  details: string[];
}

const DETAIL_PREFIXES = [
  "종족값 -",
  "보스포켓몬스폰바이옴 -",
  "보스스폰바이옴 -",
  "스폰바이옴 -",
];

function normalizeFormText(value: string): string {
  let text = value.trim();

  for (const prefix of ["메가 ", "거다이맥스 ", "원시 "]) {
    const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    text = text.replace(new RegExp(`(?!^)${escaped}`, "g"), `\n${prefix}`);
  }

  for (const prefix of DETAIL_PREFIXES) {
    const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    text = text.replace(new RegExp(`\s+${escaped}`, "g"), `\n${prefix}`);
  }

  return text;
}

function parseSections(value: string): FormSection[] {
  const lines = normalizeFormText(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections: FormSection[] = [];
  let current: FormSection | null = null;

  for (const line of lines) {
    const isDetail = DETAIL_PREFIXES.some((prefix) => line.startsWith(prefix));

    if (!isDetail) {
      current = { title: line, details: [] };
      sections.push(current);
      continue;
    }

    if (!current) {
      current = { title: "추가 정보", details: [] };
      sections.push(current);
    }

    current.details.push(line);
  }

  return sections;
}

export default function PokemonFormInfo({ value }: PokemonFormInfoProps) {
  const sections = parseSections(value);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div key={`${section.title}-${section.details.join("|")}`} className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-sm font-semibold text-white">{section.title}</p>
          {section.details.length > 0 && (
            <ul className="mt-2 space-y-1">
              {section.details.map((detail) => (
                <li key={detail} className="text-sm leading-relaxed text-gray-300">
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
