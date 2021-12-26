import { urlToBase64, base64ToUrl, getUrl } from "./imageHelpers";

const url = 'http://167.71.42.229:20210/generate'

const getSingleText = (textContent) => {
    return Object.values(textContent).join("\n");
}

let lastImages = [];
let lastIndex = 0;

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
    lastImages = result['images'];
    return lastImages
}

 /**
  * Не забудьте сначала зпустить getImages(...)
  * @return {Promise<url>} Промис, который разрешится как base64 строка картинки (data-url)
  */
export const getNextImage = async (data) => {
    const currentIndex = lastIndex;
    lastIndex++;
    const result = await base64ToUrl(lastImages[currentIndex % lastImages.length]);
    return result;
}