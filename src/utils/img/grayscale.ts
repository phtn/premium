type Dimension = number | null;
export const toGrayscale = (imageData: string, quality?: number) => {
  const photo = document.getElementById("photo") as HTMLImageElement;
  photo.src = imageData;
  const canvas = document.getElementById("test-canvas") as HTMLCanvasElement;
  canvas.height = photo.naturalHeight;
  canvas.width = photo.naturalWidth;

  const context = canvas.getContext("2d");

  context?.drawImage(photo, 0, 0);
  const img = context?.getImageData(0, 0, canvas.width, canvas.height);

  const pixels = img?.data;
  if (pixels) {
    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i];
      const green = pixels[1];
      const blue = pixels[2];
      const grayscale = color2Grayscale(red!, green!, blue!);

      pixels[i] = grayscale;
      pixels[i + 1] = grayscale;
      pixels[i + 2] = grayscale;
    }
  }

  context?.putImageData(img!, 0, 0);

  const imgData = canvas.toDataURL();

  const width: Dimension = canvas.width ?? 300;
  const height: Dimension = canvas.height ?? 300;

  const blob = canvas.toBlob((blob) => blob, "image/jpeg", quality ?? 80 / 100);

  return { width, height, imgData, blob };
};

const color2Grayscale = (r: number, g: number, b: number) =>
  (r * 6966 + g * 23436 + b * 2366) >> 15;
// (r * 9798 + g * 19235 + b * 3735) >> 15;
// ((r + g + b) / 3) >> 0;

export const getGrayscale = () => {
  const grayImage = document.getElementById("gray-image") as HTMLImageElement;

  const canvas = document.getElementById("test-canvas") as HTMLCanvasElement;

  const context = canvas.getContext("2d");
  context?.drawImage(grayImage, 0, 0);
  const grayImageData = context?.getImageData(
    0,
    0,
    grayImage.naturalWidth,
    grayImage.naturalHeight,
  );
  canvas.width = grayImage.naturalWidth ? grayImage.naturalHeight * 0.55 : 350;
  canvas.height = grayImage.naturalHeight ? grayImage.naturalHeight * 0.5 : 248;

  context?.putImageData(grayImageData!, 0, 0);

  return canvas.toDataURL();
};
