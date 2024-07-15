import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { useState } from "react";

export const usePDFKit = () => {
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);

  const createPDF = async (imageSrc: string | undefined, title?: string) => {
    const doc = new PDFDocument();
    const stream = doc.pipe(blobStream());
    doc.info.Title = title ?? "";
    doc.info.Author = "hq@re-up.ph";
    doc.info.CreationDate = new Date();

    doc.addPage({
      margins: {
        top: 50,
        bottom: 50,
        left: 25,
        right: 25,
      },
      displayTitle: true,
    });

    doc
      .image(imageSrc!, 430, 15, {
        fit: [100, 100],
        align: "center",
        valign: "center",
      })
      .text("Centered");

    doc.end();

    stream.on("finish", () => {
      const blob = stream.toBlob("application/pdf");
      setFileBlob(blob);
      console.log(blob);
    });
  };

  return { createPDF, fileBlob };
};
