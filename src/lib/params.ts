import {
    OrderSide
} from "utils-trade"

export interface LogicNampingSettings {
    pair: string
    minPrice: number
    maxPrice: number
    positionNum: number
    profitRate: number
    losscutRate: number
    pricePrecision: number
    sizePrecision: number
    minSize: number
    targetSide: OrderSide[]
    badgetRate: number
    leverage: number
    buyOpenSizeBias: number
    sellOpenSizeBias: number
    buyCloseSizeBias: number
    sellCloseSizeBias: number
}

export interface PositionInfo {
    side: OrderSide
    openPrice: number
    closePrice: number
    losscutPrice: number
}