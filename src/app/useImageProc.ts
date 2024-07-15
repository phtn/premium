import { fileType } from "@/utils/helpers";
import { useState, useCallback } from "react";

interface ProcessedImage {
  grayscale: string;
  original: string;
}

export const useImageProc = () => {
  const [fileFormat, setFileFormat] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(
    null,
  );

  const processImage = useCallback((file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const format = fileType(file.type);
      setFileFormat(format);

      const img = new Image();
      img.onload = () => {
        const canvas = document.getElementById(
          "grayscale",
        ) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          console.error("Unable to get 2D context");
          return;
        }

        // Calculate new dimensions
        const dw = img.width * 0.4;
        const dh = img.height * 0.42;

        canvas.width = dw;
        canvas.height = dh;

        // Draw resized image
        ctx.drawImage(img, 0, 0, dw, dh);

        // Convert to grayscale
        const imageData = grayscale(ctx, dw, dh);

        ctx.putImageData(imageData, 0, 0);

        // Set processed images
        setProcessedImage({
          grayscale: canvas.toDataURL("image/jpeg"),
          original: e.target?.result as string,
        });
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  }, []);

  return { processedImage, processImage, fileFormat };
};

const grayscale = (ctx: CanvasRenderingContext2D, sw: number, sh: number) => {
  const imageData = ctx.getImageData(0, 0, sw, sh);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  return imageData;
};
