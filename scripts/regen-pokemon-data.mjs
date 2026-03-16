import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const dataFile = path.join(rootDir, "data", "pokemon.json");
const abilityKoFile = path.join(rootDir, "data", "ability-ko.json");
const speciesDir = path.join(rootDir, "pixelmon_csv", "pixelmon", "species");
const spawningDir = path.join(rootDir, "pixelmon_csv", "pixelmon", "spawning");

const REGION_FORM_MAP = [
  { needle: "알로라", form: "alolan" },
  { needle: "가라르", form: "galarian" },
  { needle: "히스이", form: "hisuian" },
  { needle: "팔데아", form: "paldean" },
];

const TIME_LABELS = {
  MORNING: "아침",
  DAY: "낮",
  DUSK: "저녁",
  EVENING: "저녁",
  NIGHT: "밤",
  DAWN: "새벽",
  ALL: "전체",
};

const WEATHER_LABELS = {
  CLEAR: "맑음",
  RAIN: "비",
  THUNDER: "천둥",
  STORM: "폭풍",
  SNOW: "눈",
  SNOWING: "눈",
  FOG: "안개",
};

const LOCATION_LABELS = {
  Land: "지상",
  Air: "공중",
  Water: "물",
  Underwater: "수중",
  Lava: "용암",
  TreeTop: "나무 위",
  Grass: "잔디",
  Indoors: "실내",
  SurfaceWater: "수면",
};

const EV_LABELS = {
  hp: "HP",
  attack: "공격",
  defense: "방어",
  specialAttack: "특수공격",
  specialDefense: "특수방어",
  speed: "스피드",
};

const EXCLUDED_SPAWN_CATEGORIES = new Set(["headbutt", "curry"]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function prettifyToken(value) {
  const token = value.replace(/^#/, "");
  const afterSlash = token.includes("/") ? token.split("/").at(-1) : token;
  const afterColon = afterSlash.includes(":") ? afterSlash.split(":").at(-1) : afterSlash;
  return titleCase(afterColon.replace(/[_-]+/g, " ").toLowerCase());
}

function normalizeAbilityName(value) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function abilityKey(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function detectFormName(pokemon) {
  const match = REGION_FORM_MAP.find((entry) => pokemon.name.includes(entry.needle));
  return match?.form ?? "base";
}

function parseSpec(spec) {
  const speciesMatch = spec.match(/species:([^\s]+)/);
  const formMatch = spec.match(/form:([^\s]+)/);
  const paletteMatch = spec.match(/palette:([^\s]+)/);
  return {
    species: speciesMatch?.[1] ?? "",
    form: formMatch?.[1] ?? "base",
    palette: paletteMatch?.[1] ?? "",
  };
}

function humanizeConditionList(values, labelMap = {}) {
  return (values ?? []).map((value) => labelMap[value] ?? prettifyToken(value));
}

function relativeSpawnSource(filePath) {
  return path.relative(spawningDir, filePath).replace(/\\/g, "/");
}

function buildSpeciesFileMap() {
  const map = new Map();
  for (const fileName of fs.readdirSync(speciesDir)) {
    if (!fileName.endsWith(".json")) continue;
    const dexId = Number(fileName.split("_")[0]);
    map.set(dexId, path.join(speciesDir, fileName));
  }
  return map;
}

function collectSpawnFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSpawnFiles(fullPath));
      continue;
    }
    if (entry.name.endsWith(".json")) files.push(fullPath);
  }
  return files;
}

function getFormData(speciesData, formName) {
  const defaultFormName = speciesData.defaultForms?.[0] ?? "base";
  return speciesData.forms.find((form) => form.name === formName)
    ?? speciesData.forms.find((form) => form.name === defaultFormName)
    ?? speciesData.forms[0];
}

function formatEvYields(evYields = {}) {
  return Object.entries(evYields)
    .filter(([, value]) => Number(value) > 0)
    .map(([key, value]) => `${EV_LABELS[key] ?? key} +${value}`);
}

function buildOfficialSpawns(pokemon, spawnFileData) {
  const formName = detectFormName(pokemon);
  const entries = [];

  for (const [filePath, spawnData] of spawnFileData) {
    for (const spawnInfo of spawnData.spawnInfos ?? []) {
      const parsed = parseSpec(spawnInfo.spec ?? "");
      if (parsed.species !== pokemon.nameEn) continue;
      if (parsed.palette) continue;

      const normalizedForm = parsed.form || "base";
      const formMatches = formName === "base"
        ? normalizedForm === "base"
        : normalizedForm === formName;

      if (!formMatches) continue;

      const category = relativeSpawnSource(filePath).split("/")[0] ?? "standard";
      if (EXCLUDED_SPAWN_CATEGORIES.has(category)) continue;
      const condition = spawnInfo.condition ?? {};
      entries.push({
        source: relativeSpawnSource(filePath),
        category,
        locationTypes: humanizeConditionList(spawnInfo.stringLocationTypes, LOCATION_LABELS),
        minLevel: spawnInfo.minLevel,
        maxLevel: spawnInfo.maxLevel,
        rarity: typeof spawnInfo.rarity === "number" ? spawnInfo.rarity : undefined,
        times: humanizeConditionList(condition.times, TIME_LABELS),
        weathers: humanizeConditionList(condition.weathers, WEATHER_LABELS),
        biomes: humanizeConditionList(condition.biomes),
        isBoss: Boolean(spawnInfo.spawnSpecificBossRate || spawnInfo.interval === "megaBoss"),
      });
    }
  }

  entries.sort((left, right) => {
    if (left.isBoss !== right.isBoss) return left.isBoss ? 1 : -1;
    return (right.rarity ?? 0) - (left.rarity ?? 0);
  });
  return entries;
}

const pokemon = readJson(dataFile);
const abilityKoMap = fs.existsSync(abilityKoFile) ? readJson(abilityKoFile) : {};
const speciesFileMap = buildSpeciesFileMap();
const spawnFileData = collectSpawnFiles(spawningDir).map((filePath) => [filePath, readJson(filePath)]);

for (const entry of pokemon) {
  const speciesPath = speciesFileMap.get(entry.id);
  if (!speciesPath) {
    entry.abilities = [];
    entry.hiddenAbilities = [];
    entry.eggGroups = [];
    entry.evYields = [];
    entry.officialSpawns = [];
    continue;
  }

  const speciesData = readJson(speciesPath);
  const formData = getFormData(speciesData, detectFormName(entry));
  const abilities = formData.abilities ?? {};
  const spawn = formData.spawn ?? {};
  const dimensions = formData.dimensions ?? {};

  entry.stats = {
    hp: formData.battleStats?.hp ?? entry.stats?.hp ?? 0,
    atk: formData.battleStats?.attack ?? entry.stats?.atk ?? 0,
    def: formData.battleStats?.defense ?? entry.stats?.def ?? 0,
    spa: formData.battleStats?.specialAttack ?? entry.stats?.spa ?? 0,
    spd: formData.battleStats?.specialDefense ?? entry.stats?.spd ?? 0,
    spe: formData.battleStats?.speed ?? entry.stats?.spe ?? 0,
  };
  entry.bst = Object.values(entry.stats).reduce((sum, value) => sum + value, 0);
  entry.abilities = (abilities.abilities ?? []).map((ability) => {
    const english = normalizeAbilityName(ability);
    const ko = abilityKoMap[abilityKey(ability)] ?? abilityKoMap[abilityKey(english)];
    return ko ? `${ko} (${english})` : english;
  });
  entry.hiddenAbilities = (abilities.hiddenAbilities ?? []).map((ability) => {
    const english = normalizeAbilityName(ability);
    const ko = abilityKoMap[abilityKey(ability)] ?? abilityKoMap[abilityKey(english)];
    return ko ? `${ko} (${english})` : english;
  });
  entry.eggGroups = (formData.eggGroups ?? []).map(prettifyToken);
  entry.catchRate = formData.catchRate;
  entry.malePercentage = formData.malePercentage;
  entry.height = dimensions.height;
  entry.weight = formData.weight;
  entry.baseExp = spawn.baseExp;
  entry.baseFriendship = spawn.baseFriendship;
  entry.evYields = formatEvYields(formData.evYields);
  entry.officialSpawns = buildOfficialSpawns(entry, spawnFileData);
}

writeJson(dataFile, pokemon);
console.log(`Regenerated ${pokemon.length} pokemon entries with species/spawn metadata.`);