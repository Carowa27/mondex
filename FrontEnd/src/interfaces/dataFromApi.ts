interface IAttack {
  convertedEnergyCost: number;
  cost: string[];
  damage: string;
  name: string;
  text: string;
}
interface ITCGMarket {
  prices: {
    normal: IPrice | undefined;
    unlimited: IPrice | undefined;
    unlimitedHolofoil: IPrice | undefined;
    holofoil: IPrice | undefined;
    reverseHolofoil: IPrice | undefined;
    "1stEdition": IPrice | undefined;
    "1stEditionNormal": IPrice | undefined;
    "1stEditionHolofoil": IPrice | undefined;
  };
  updatedAt: string;
  url: string;
}
interface ICardMarket {
  prices: {
    averageSellPrice: number | null;
    lowPrice: number | null;
    lowPriceExPlus: number | null;
    trendPrice: number | null;
    germanProLow: number | null;
    suggestedPrice: number | null;
    reverseHoloSell: number | null;
    reverseHoloLow: number | null;
    reverseHoloTrend: number | null;
    avg1: number | null;
    avg7: number | null;
    avg30: number | null;
    reverseHoloAvg1: number | null;
    reverseHoloAvg7: number | null;
    reverseHoloAvg30: number | null;
  };
  updatedAt: string;
  url: string;
}
interface IPrice {
  directLow?: number;
  low?: number;
  mid?: number;
  high?: number;
  market?: number;
}
interface IImage {
  small: string;
  large: string;
}
interface IWeakness {
  type: string;
  value: string;
}
export interface IPkmnResponse {
  count: number;
  data: IPkmnCard[];
  page: number;
  pageSize: number;
  totalCount: number;
}
export interface ICardResponse {
  count: number;
  data: IPkmnCard;
  page: number;
  pageSize: number;
  totalCount: number;
}
export interface ISetResponse {
  data: IPkmnSet;
}
export interface IPkmnCard {
  artist?: string;
  attacks?: IAttack[];
  cardmarket: ICardMarket;
  convertedRetreatCost: number;
  evolvesFrom?: string[];
  evolvesTo?: string[];
  flavorText?: string;
  hp?: string;
  id: string;
  images: IImage;
  legalities: { unlimited: string };
  level: string;
  name: string;
  nationalPokedexNumbers: number[];
  number: string;
  rarity: string;
  retreatCost: string[];
  set: IPkmnSet;
  subtypes: string[];
  supertype: string;
  tcgplayer?: ITCGMarket;
  types?: string[];
  weaknesses: IWeakness;
}
export interface IPkmnSet {
  id: string;
  images: { logo: string; symbol: string };
  legalities: { expanded: string; unlimited: string; standard?: string };
  name: string;
  printedTotal: number;
  ptcgoCode: string;
  releaseDate: string;
  series: string;
  total: number;
  updatedAt: string;
}
