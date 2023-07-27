import { useRef } from 'react';

import html2canvas from 'html2canvas';

export const resizeImage = (imageFile: File, w: number | undefined, h: number | undefined, callback: (resizedImage: File | null) => void) => {
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

export const MergeImages = async (image1: string, image2: string,
    ref: any, callback: (url: string) => void) => {
    //const mergedCanvasRef = useRef<HTMLCanvasElement>(null);
    /* if (image1 && image2) {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');

        const img1 = new Image();
        img1.src = image1;
        img1.onload = () => {
            ctx?.drawImage(img1, 0, 0, canvas.width, canvas.height);
            if (image1) {
                const img2 = new Image();
                img2.src = image2;
                img2.onload = () => {
                    ctx?.drawImage(img2, 0, 0, canvas.width, canvas.height);

                    canvas.toBlob((blob: any) => {
                        callback(URL.createObjectURL(blob));
                    });

                };
            } else {
                canvas.toBlob((blob: any) => {
                    if (blob) {
                        callback(URL.createObjectURL(blob));
                    }
                });
            }
        };
    } */

    if (image1 && image2) {
        const canvas = ref.current;
        const img1 = new Image();
        img1.src = image1;
        const img2 = new Image();
        img2.src = image2;
        await Promise.all([loadImage(img1), loadImage(img2)]);

        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img1, 0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img2, 0, 0, canvas.width, canvas.height);

        html2canvas(canvas).then((canvasAsImage) => {
            canvasAsImage.toBlob((blob) => {
                blob && callback(URL.createObjectURL(blob));
            })
        });
    } else if (image1) {
        console.log(image1, image2);
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