import {
    ListByOrderSide,
    OrderSide,
    getListByOrderSide
} from "trade-utils"

import {
    floor
} from "my-utils"

export interface LogicNampingSettings {
    pair: string
    minPrice: number
    maxPrice: number
    positionNum: number
    profitRate: number
    pricePrecision: number
    sizePrecision: number
    minSize: number
    targetSide: OrderSide[]
    badgetRate: number
    leverage: number
}

export interface PositionInfo {
    side: OrderSide
    openPrice: number
    closePrice: number
}

export class LogicNampingClass {
    private _badget: number = 0
    private _positions: ListByOrderSide<PositionInfo[]> = getListByOrderSide<PositionInfo[]>((s: OrderSide): PositionInfo[] => {return []})

    constructor(private _settings: LogicNampingSettings) {
        const posNum = Math.floor(this._settings.positionNum)
        const range = this._settings.maxPrice - this._settings.minPrice
        for (const s of this._settings.targetSide) {
            for (let i = 0; i < posNum; i++) {
                const openPrice = this._settings.minPrice + range * (1 - Math.log2(2-i/posNum))
                const closePrice = openPrice * (1+this._settings.profitRate * (s === "buy"? 1: -1)) 
                this._positions[s].push({
                    side: s,
                    openPrice: floor(openPrice, this._settings.pricePrecision),
                    closePrice: floor(closePrice, this._settings.pricePrecision)
                })
            }
        }
    }
    
    updateBadget(value: number) {
        this._badget = value * this._settings.leverage
    }

    getPositionInfo(side: OrderSide, index: number): PositionInfo {
        return this._positions[side][index]
    }

    getPositionSize(side: OrderSide, index: number): number {
        return floor(this.singleBadget/this._positions[side][index].openPrice, this._settings.sizePrecision)
    }

    getPositionNum(side: OrderSide): number {
        return this._positions[side].length
    }

    get singleBadget(): number {
        return this._badget/this._settings.positionNum * this._settings.badgetRate
    }

    get targetSides(): OrderSide[] {
        return this._settings.targetSide
    }

    get maxPrice(): number {
        return this._settings.maxPrice
    }

    get minPrice(): number {
        return this._settings.minPrice
    }
}