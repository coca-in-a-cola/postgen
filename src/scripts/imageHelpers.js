import { imageLoadStatus } from './enums'


export const getUrl = (source) => {
    if (source instanceof String) {
        // предполагаем, что у нас строка-url
        return source;
    }

    else if (source instanceof File
        || source instanceof Blob
        || source instanceof MediaSource) {
            return URL.createObjectURL(source)
    }

    return source;
}

export function base64ToUrlSync(base64str) {
    // Предполагаем, что работаем с jpg
    // data-url
    return "data:image/jpg;base64," + base64str
}

export async function base64ToUrl(base64str) {
    // Предполагаем, что работаем с jpg
    // data-url
    return "data:image/jpg;base64," + base64str
}

export async function urlToBase64(url) {
    if ((await testImageURL(url)) !== imageLoadStatus.SUCCESS)
        return
    
    const dataURL = await new Promise((resolve, reject)=> {
        const image = new Image();
        image.src = url
    
        image.onload = (() => {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
            resolve(canvas.toDataURL("image/jpg"));
        })
    })

  
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

export function testImageURL(url, timeout = 5000) {
    return new Promise(function (resolve, reject) {
        var timer, img = new Image();
        img.onerror = img.onabort = function () {
            clearTimeout(timer);

            if (!url || url === "")
                reject(imageLoadStatus.EMPTY)
            else
                reject(imageLoadStatus.ERROR);
        };
        img.onload = function () {
            clearTimeout(timer);
            resolve(imageLoadStatus.SUCCESS);
        };
        timer = setTimeout(function () {
            // reset .src to invalid URL so it stops previous
            // loading, but doesn't trigger new load
            img.src = "//!!!!/test.jpg";
            reject(imageLoadStatus.TIMEOUT);
        }, timeout);
        img.src = url;
    });
}