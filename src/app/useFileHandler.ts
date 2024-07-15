import type {
  MimeTypeSchema,
  RawDocumentSchema,
} from "@/server/trpc/resource/read";
import { readRequest } from "@/trpc/document-ai/read";
import {
  decrypt_client,
  en64,
  encrypt_client,
  genCryptoKey,
} from "@/utils/crypto/aes/client";
import { errHandler, fileType } from "@/utils/helpers";
import { getGrayscale } from "@/utils/img/grayscale";
import { resizeImage } from "@/utils/img/resize";
import { useEffect, useState } from "react";

export const useFileHandler = () => {
  const [file, setFile] = useState<File | undefined>();
  const [validFormat, setValidFormat] = useState(false);
  const [validSize, setValidSize] = useState(false);
  const [mimeType, setMimeType] = useState<MimeTypeSchema | undefined>();
  const [imageData, setImageData] = useState<string | null>(null);
  const [encryptedBuf, setEncryptedBuf] = useState<ArrayBuffer | undefined>();
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | undefined>();
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const supportedFormats = [
      "pdf",
      "gif",
      "tiff",
      "jpeg",
      "png",
      "bmp",
      "webp",
    ];
    if (file) {
      const format = fileType(file.type);
      setMimeType(file.type as MimeTypeSchema);
      const fileSize = file.size / 1000000;

      const isValidSize = fileSize < 10;
      setValidSize(isValidSize);
      if (!isValidSize) {
        console.error("Invalid File Size.", `Use files below 10MB.`);
      }

      const isValidFormat = supportedFormats.includes(format.toLowerCase());
      setValidFormat(isValidFormat);
      if (!isValidFormat) {
        console.error(
          "Invalid File Format.",
          `Supported formats: PDF, JPG, PNG, GIF, TIFF, & WEBP`,
        );
      }
    }
  }, [file]);

  // const removeFileItem = () => setImageData(null);

  const readFile = async (file: File | undefined) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      if (typeof reader.result === "string") {
        setImageData(reader.result);
        const { width, height } = resizeImage();
        setImageSize({ width, height });
      }

      const fileData = getFileData(reader.result);
      if (fileData?.encoded) {
        // const encryption = await encrypt_client(fileData.encoded, cryptoKey);
        // console.log(encryption.encoded);
      }
    };

    reader.readAsDataURL(file!);
  };

  const conv2Gs = () => {
    if (imageData) {
      const grayscaleImageData = getGrayscale();
      console.log(grayscaleImageData);
    }
  };

  const handleFileChange = (e: FileList | null) => {
    const target = e?.[0];
    readFile(target).catch(errHandler);
    setFile(target);
  };

  const handleFileRemove = () => {
    setFile(undefined);
    // removeFileItem();
  };

  const checkTRPC = () => {
    if (typeof imageData === "string" && mimeType) {
      const rawDocument: RawDocumentSchema = {
        mimeType,
        content: imageData,
      };

      console.log(rawDocument);

      // readRequest(rawDocument)
      //   .then((res) => console.log(res))
      //   .catch(errHandler);
    } else {
      console.log("empty heart");
    }
  };

  return {
    file,
    handleFileRemove,
    handleFileChange,
    conv2Gs,
    imageData,
    imageSize,
    validFormat,
    validSize,
    checkTRPC,
  };
};

const getFileData = (read_res: string | ArrayBuffer | null | undefined) => {
  if (typeof read_res !== "string") return;

  const encoded = read_res.substring(read_res.indexOf(",") + 1);
  const type = read_res.substring(
    read_res.indexOf(":") + 1,
    read_res.indexOf(";"),
  );
  return { type, encoded };
};

// const resizeImage = async (
//   img: HTMLImageElement,
//   maxWidth: number,
//   quality?: number,
// ) => {
//   return new Promise((resolve, reject) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const originalWidth = img.naturalWidth;
//     const originalHeight = img.naturalHeight;

//     // Calculate new dimensions while maintaining aspect ratio
//     let newWidth = originalWidth;
//     let newHeight = originalHeight;
//     if (originalWidth > maxWidth) {
//       newWidth = maxWidth;
//       newHeight = originalHeight * (maxWidth / originalWidth);
//     }

//     canvas.width = newWidth;
//     canvas.height = newHeight;
//     ctx?.drawImage(img, 0, 0, newWidth, newHeight);

//     // Convert canvas content to blob
//     canvas.toBlob(
//       (blob) => {
//         if (!blob) {
//           reject(new Error("Failed to convert canvas to blob"));
//           return;
//         }
//         resolve(blob);
//       },
//       "image/jpeg",
//       quality ?? 80 / 100,
//     ); // Default image quality compression to 80%
//   });
// };
