"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicNampingClass = void 0;
const trade_utils_1 = require("trade-utils");
const my_utils_1 = require("my-utils");
class LogicNampingClass {
    constructor(_settings) {
        this._settings = _settings;
        this._badget = 0;
        this._positions = (0, trade_utils_1.getListByOrderSide)((s) => { return []; });
        const posNum = Math.floor(this._settings.positionNum);
        const range = this._settings.maxPrice - this._settings.minPrice;
        for (const s of this._settings.targetSide) {
            for (let i = 0; i < posNum; i++) {
                const openPrice = this._settings.minPrice + range * (1 - Math.log2(2 - i / posNum));
                const closePrice = openPrice * (1 + this._settings.profitRate * (s === "buy" ? 1 : -1));
                this._positions[s].push({
                    side: s,
                    openPrice: (0, my_utils_1.floor)(openPrice, this._settings.pricePrecision),
                    closePrice: (0, my_utils_1.floor)(closePrice, this._settings.pricePrecision)
                });
            }
        }
    }
    updateBadget(value) {
        this._badget = value * this._settings.leverage;
    }
    getPositionInfo(side, index) {
        return this._positions[side][index];
    }
    getPositionSize(side, index) {
        return (0, my_utils_1.floor)(this.singleBadget / this._positions[side][index].openPrice, this._settings.sizePrecision);
    }
    getPositionNum(side) {
        return this._positions[side].length;
    }
    get singleBadget() {
        return this._badget / this._settings.positionNum * this._settings.badgetRate;
    }
    get targetSides() {
        return this._settings.targetSide;
    }
    get maxPrice() {
        return this._settings.maxPrice;
    }
    get minPrice() {
        return this._settings.minPrice;
    }
}
exports.LogicNampingClass = LogicNampingClass;
