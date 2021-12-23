import { urlToBase64, base64ToUrl, getUrl } from "./imageHelpers";

const url = 'http://167.71.42.229:20210/generate'

const getSingleText = (textContent) => {
    return Object.values(textContent).join("\n");
}

 /**
  * @param data Данные для запроса
  * @param data.image URL изображения, которое загружаем
  * @param data.textContent Текст в виде объекта
  */
export const getImages = async (data) => {
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

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log(result);
    //return result['images']
}

 /**
  * @param data Данные для запроса
  * @param data.image URL изображения, которое загружаем
  * @param data.textContent Текст в виде объекта
  * @return {Promise<url>} Промис, который разрешится как base64 строка картинки (data-url)
  */
export const getNextImage = async (data) => {
    const response = await urlToBase64(getUrl(data.image));
    const result = base64ToUrl(response);
    return result;
}