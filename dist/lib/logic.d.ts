import { OrderSide } from "trade-utils";
export interface LogicNampingSettings {
    pair: string;
    minPrice: number;
    maxPrice: number;
    positionNum: number;
    profitRate: number;
    pricePrecision: number;
    sizePrecision: number;
    minSize: number;
    targetSide: OrderSide[];
    badgetRate: number;
    leverage: number;
    buyOpenSizeBias: number;
    sellOpenSizeBias: number;
    buyCloseSizeBias: number;
    sellCloseSizeBias: number;
}
export interface PositionInfo {
    side: OrderSide;
    openPrice: number;
    closePrice: number;
}
export declare class LogicNampingClass {
    private _settings;
    private _badget;
    private _positions;
    constructor(_settings: LogicNampingSettings);
    updateBadget(value: number): void;
    getPositionInfo(side: OrderSide, index: number): PositionInfo;
    getPositionSize(side: OrderSide, index: number): number;
    getClosePositionSize(side: OrderSide, openSize: number): number;
    getPositionNum(side: OrderSide): number;
    get singleBadget(): number;
    get targetSides(): OrderSide[];
    get maxPrice(): number;
    get minPrice(): number;
}
