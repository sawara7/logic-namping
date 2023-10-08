import { OrderSide } from "utils-trade";
import { LogicNampingSettings, PositionInfo } from "./params";
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
