export interface BaseStats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export interface OfficialSpawnEntry {
  source: string;
  category: string;
  locationTypes: string[];
  minLevel?: number;
  maxLevel?: number;
  rarity?: number;
  times: string[];
  weathers: string[];
  biomes: string[];
  isBoss?: boolean;
}

export interface Pokemon {
  uid: number;
  id: number;
  name: string;
  nameEn: string;
  type: string;
  bst: number;
  stats: BaseStats;
  spawnTime: string;
  biome: string;
  rarity: string;
  weather: string;
  method: string;
  form: string;
  abilities: string[];
  hiddenAbilities: string[];
  eggGroups: string[];
  catchRate?: number;
  malePercentage?: number;
  height?: number;
  weight?: number;
  baseExp?: number;
  baseFriendship?: number;
  evYields: string[];
  officialSpawns: OfficialSpawnEntry[];
}

export interface Item {
  name: string;
  info: string;
  obtain: string;
  craft: string;
}

export type NatureRow = string[];
export type CurryRow = string[];
