import { statusCodes } from '../enums'

export default class ImageListModel {
    constructor(getNextImage, onImageLoaded = undefined) {
        this._cache = []
        this._getNextFunc = getNextImage;
        this.onImageLoaded = onImageLoaded;
        this._maxRequestedIndex = 0;
        return this;
    }

    getUrlByIndex(index) {
        if (this._cache.length > index) {
            // В кэше есть индекс
            return this._cache[index];
        }
        else return;
    }

    async _requestNext() {
        if (this._maxRequestedIndex > this._cache.length - 1) {
            this._getNextFunc().then((result) => {
                if (result) {
                    this._cache.push(result);

                    const index = this._cache.length - 1;

                    this.onImageLoaded?.(index, result)

                    return this._requestNext.call(this);
                }

                else {
                    return statusCodes.ERROR;
                }
            })
        }
        else {
            return statusCodes.SUCCESS;
        }
    }

    async requestTo(count) {
        this._maxRequestedIndex = count;
        const result = await this._requestNext()
        return result;
    }
}