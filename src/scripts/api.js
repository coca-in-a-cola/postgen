import { Settings } from "@mui/icons-material";
import { urlToBase64, base64ToUrl, getUrl } from "./imageHelpers";

const apiServer = 'http://176.57.215.4:20210'

const getSingleText = (textContent) => {
    if ( typeof textContent)
    return Object.values(textContent).join("\n");
}

export default class Api {

    static defaults = {
        keepAlive: true,
        sessionTimer: 3 * 60 * 1000
    }

    /**
     * @param data Данные для запроса
     * 
     * **Обязательные параметры:**
     * @param data.image URL изображения, которое загружаем
     * @param data.textContent Текст в виде объекта
     * 
     * **Необязательные параметры:**
     * @param data.sessionTimer Время, через которое мы просим продлить сессию, если включен keepAlive
     * @default 180000
     * @param data.keepAlive Нужно ли всё время продлевать сессию
     * @default true
     * @return {Promise<Api>} созданный объект класса
     */
    constructor(data) {
        const thisObj = this;

        this._keepAlive = data.keepAlive ? data.keepAlive : Api.defaults.keepAlive
        this._sessionTimer = data.sessionTimer ? data.sessionTimer : Api.defaults.sessionTimer

        return new Promise((resolve, reject) => {
            thisObj._initializeGenerator(data).then((result) => {
                if (result) {
                    thisObj._token = result
                    this.setKeepAlive(this._keepAlive);
                    resolve(thisObj);    
                }
                else reject()
            })
        })
    }

    /**
     * @param data Данные для запроса
     * @param data.image URL изображения, которое загружаем
     * @param data.textContent Текст в виде объекта
     * @return {string} строка - токен пользователя
     */
    async _initializeGenerator (data) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: await urlToBase64(data.image),
                text: getSingleText(data.textContent)
            })
        };

        
        const response = await fetch(`${apiServer}/api/init`, requestOptions);
        const result = await response.json()
        return result?.['token'];
        
        /*
        const response = await new Promise( (resolve, reject) => setTimeout( () => resolve("12345"), 2000));
        return response;
        */
    }

     /**
     * Не забудьте привязать её к объекту апи
     * @return {Promise<string>} Промис, который разрешится как url картинки
     */
    async getNextImage() {
        const requestOptions = {
            method: 'GET',
        };

        const url = `${apiServer}/api/getnextimage?token=${this._token}`;

        
        const response = await fetch(url, requestOptions);
        const bodyJson = await response.json();
        const src = bodyJson?.['url'];

        // Фикс относительного адреса
        return `${apiServer}/${src}`
        

        /* const response = await new Promise( (resolve, reject) => setTimeout(
            () => resolve("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsun9-68.userapi.com%2Fimpg%2FuRO24metr4InHFuTVoZMKEaQ8C2O6SiT2TjwxQ%2FSq1dLnZOEp8.jpg%3Fsize%3D604x604%26quality%3D96%26sign%3Df79bf78f1f199f179c1f984cf13ec553%26type%3Dalbum&f=1&nofb=1"),
            2000));
        return response;
        */
    }

    /**
     * Не забудьте привязать её к объекту апи
     * @return {Promise<Response>} Промис, который разрешится как response (как в fetch)
    */
    prolong() {
        const requestOptions = {
            method: 'GET',
        };

        const url = `${apiServer}/api/prolong-token?token=${this._token}`;
        
        return fetch(url);
        ///return new Promise( (resolve, reject) => setTimeout(resolve("12345"), 2000));
    }

    /**
     * После этого прийдётся получать новый токен
     * Не забудьте привязать её к объекту апи
     * @return {Promise<Response>} Промис, который разрешится как response (как в fetch)
    */
    shutdown () {
        const requestOptions = {
            method: 'GET',
        };

        const url = `${apiServer}/api/remove-token?token=${this._token}`;

        return fetch(url);
    }

    setKeepAlive (value) {
        this._keepAlive = value
        if (value)
            this.constantProlong.call(this);
    }

    constantProlong() {
        clearTimeout(this.constantProlong.bind(this))
        this.prolong().then(() => {
            if (this._keepAlive) {
                setTimeout(this.constantProlong.bind(this), this._sessionTimer)
            }
        })
    }
}