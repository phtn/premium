import jsPDF from "jspdf";
import { useState } from "react";

export const useJsPDF = () => {
  const [base64, setBase64] = useState<string | undefined>();
  const [dim, setDim] = useState(0);

  const createPDF = (type: string) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      compress: true,
    });
    const canvas = document.getElementById("grayscale") as HTMLCanvasElement;
    const w = canvas.width * 0.4;
    const h = canvas.height * 0.42;
    const x = (448 - w) / 2;
    const y = 56;
    const imageData = canvas.toDataURL();
    doc.addImage(imageData, type, x, y, w, h, "re-up.ph", "FAST");

    // doc.save("test.pdf");

    console.log(doc.output("blob"));
    setBase64(doc.output("datauristring"));
  };

  return { createPDF, base64, dim };
};
