import { type ProcRequestSchema } from "@/server/trpc/resource/ocr";
import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import { useDocumentAI } from "./useDocumentAI";
import { useImageProc } from "./useImageProc";
import { useJsPDF } from "./useJsPDF";

const ClaudeImageUploader: React.FC = () => {
  const [format, setFormat] = useState<string>("");
  const { processedImage, processImage } = useImageProc();
  const { clientRequest, sendProcRequest, loading } = useDocumentAI();
  const { createPDF, base64 } = useJsPDF();

  const payload: ProcRequestSchema = useMemo(
    () => ({
      skipHumanReview: true,
      rawDocument: {
        mimeType: "application/pdf",
        content: `${base64?.replace("data:application/pdf;filename=generated.pdf;base64,", "")}`,
      },
    }),
    [base64],
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
      setFormat(file.type);
    }
  };

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    createPDF(format);
    if (base64) {
      sendProcRequest(payload);
    }
  };

  const handleDocumentProcClient = () => {
    createPDF(format);
    if (base64) {
      const content = `${base64?.replace("data:application/pdf;filename=generated.pdf;base64,", "")}`;
      clientRequest(content);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div className="flex items-center space-x-4">
        <button onClick={handleSelectImage}>Select Image</button>
        <button
          onClick={handleDocumentProcClient}
          disabled={!processedImage?.grayscale}
        >
          {loading ? "Processing" : "Process Image"}
        </button>
      </div>
      {processedImage && (
        <div className="space-y-10">
          <Image
            src={processedImage.grayscale}
            alt="Processed"
            className="w-auto"
            width={0}
            height={0}
            unoptimized
            priority
          />

          <div className="py-6 text-xs">
            {/* <pre>{fileBlob?.text()}</pre> */}
          </div>

          {/* <Image
            src={processedImage.original}
            alt="Original"
            className="w-auto"
            width={0}
            height={0}
            unoptimized
            priority
          /> */}
        </div>
      )}

      <canvas id="grayscale" className="hidden" />
    </div>
  );
};

export default ClaudeImageUploader;
