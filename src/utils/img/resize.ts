type Dimension = number | null;
export const resizeImage = () => {
  const photo = document.getElementById("gray-canvas") as HTMLImageElement;
  const canvas = document.getElementById("test") as HTMLCanvasElement;

  const context = canvas.getContext("2d");
  context?.drawImage(photo, 0, 0);
  const grayImageData = context?.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  );

  context?.putImageData(grayImageData!, 0, 0);

  canvas.width = photo.naturalWidth ? photo.naturalHeight * 0.41 : 350;
  canvas.height = photo.naturalHeight ? photo.naturalHeight * 0.4 : 248;

  const width = canvas.width;
  const height = canvas.height;

  return { width, height };
};
