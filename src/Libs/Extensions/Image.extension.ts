//import html2canvas from 'html2canvas';

export const ResizeImage = (imageFile: File, w: number | undefined, h: number | undefined, callback: (resizedImage: File) => void) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            if (w && h) {
                if (width > height) {
                    if (width > w) {
                        height *= w / width;
                        width = w;
                    }
                } else {
                    if (height > h) {
                        width *= h / height;
                        height = h;
                    }
                }
            };

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            ctx?.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                callback(new File([blob as Blob], imageFile.name, { type: imageFile.type }));
            }, imageFile.type, 1);
        };
        if (typeof event.target.result === 'string') {
            img.src = event.target.result;
        }
    };

    reader.readAsDataURL(imageFile);
};

/* export const MergeImages = async (image1: string, image2: string,
    ref: any, callback: (url: string) => void) => {
    try {
        if (image1 && image2) {
            var canvas = ref.current;
            const img1 = new Image();
            img1.src = image1;
            const img2 = new Image();
            img2.src = image2;
            await Promise.all([loadImage(img1), loadImage(img2)]);

            console.log(canvas, '...', image1, '...', image2, canvas);
            if (canvas === null) {
                canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
                ctx?.drawImage(img2, 0, 0, canvas.width, canvas.height);
                ctx?.drawImage(img1, canvas.width, 0, canvas.width, canvas.height);

                console.log(img2, '+++', img1);
                canvas.toBlob((blob: any) => {
                    console.log(URL.createObjectURL(blob));
                    blob && callback(URL.createObjectURL(blob));
                });
            } else {
                const ctx = canvas.getContext('2d');
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
                ctx?.drawImage(img1, 0, 0, canvas.width, canvas.height);
                ctx?.drawImage(img2, 0, 0, canvas.width, canvas.height);
                html2canvas(canvas).then((canvasAsImage) => {
                    canvasAsImage.toBlob((blob) => {
                        blob && callback(URL.createObjectURL(blob));
                    })
                });
            }



        } else {
            if (image1) {
                const canvas = ref.current;
                if (canvas === undefined) return;
                const img1 = new Image();
                img1.src = image1;
                await Promise.all([loadImage(img1)]);

                const ctx = canvas.getContext('2d');
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
                ctx?.drawImage(img1, 0, 0, canvas.width, canvas.height);
                html2canvas(canvas).then((canvasAsImage) => {
                    canvasAsImage.toBlob((blob) => {
                        blob && callback(URL.createObjectURL(blob));
                    })
                });
            }
        }
    } catch (e) { */
/*  canvas = document.createElement('canvas');
 const ctx = canvas.getContext('2d');
 ctx?.clearRect(0, 0, canvas.width, canvas.height);
 ctx?.drawImage(img1, 0, 0, canvas.width, canvas.height);
 ctx?.drawImage(img2, 0, 0, canvas.width, canvas.height); */
/*     }
};

const loadImage = (image: HTMLImageElement): Promise<void> => {
    return new Promise((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = (e) => reject(e);
    });
};

export const GetFileImages = (
    ref: any, callback: (f: File) => void) => {
    const canvas = ref.current;
    if (!canvas) return;

    html2canvas(canvas).then((canvasAsImage) => {
        canvasAsImage.toBlob((blob) => {
            if (!blob) return;
            const file = new File([blob], 'canvas_image.png', { type: blob.type });
            callback(file);
        });
    });
}
 */

export async function MergeImages(imageUrls: string[],
    w: number, h: number,
    callback: (url: File) => void) {

    const canvas = document.createElement('canvas');
    var images = [];
    for (var i = 0; i < imageUrls.length; i++) {
        const img = new Image();
        // eslint-disable-next-line
        await new Promise((resolve) => {
            //img.onerror = () => reject(new Error('Couldn\'t load image'));
            img.onload = resolve;
            img.src = imageUrls[i];
        });
        images.push(img);
    }

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    images.forEach((image) => {
        image && ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    });

    canvas.toBlob(async (blob: any) => {
        if (blob) {
            var fileBlob: File = await new File([blob as Blob], 'icon.png', { type: 'image/png' })
            callback(fileBlob);
        }
    });
    // Export the merged image as a Data URL
    const mergedImageURL = canvas.toDataURL('image/png');
    return mergedImageURL;
}

export async function DrawImage(imageUrls: string, w: number, h: number,
    callback: (url: File) => void) {
    const canvas = document.createElement('canvas');

    const img = new Image();
    await new Promise((resolve) => {
        img.onload = resolve;
        img.src = imageUrls;
    });
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    img && ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob: any) => {
        if (blob) {
            var fileBlob: File = await new File([blob as Blob], 'icon.png', { type: 'image/png' })
            callback(fileBlob);
        }
    });

}