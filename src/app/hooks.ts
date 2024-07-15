// import { DocumentProcessorServiceClient } from "@google-cloud/documentai";

// type AcceptedMimeType = "application/pdf";

// interface RequestProps {
//   skipHumanReview: boolean;
//   rawDocument: {
//     mimeType: AcceptedMimeType;
//     content: string;
//   };
// }

// export const documentReader = (request: RequestProps) => {
//   const client = new DocumentProcessorServiceClient();

//   const process_document = async () => {
//     // const name =
//     // "/projects/20013354165/locations/us/processors/bac05e2a9d46a902:process";

//     // Read the file into memory.
//     // const imageFile = await fs.readFile("/images/cert.jpg");

//     // Convert the image data to a Buffer and base64 encode it.

//     // Recognizes text entities in the PDF document
//     const [result] = await client.processDocument(request);
//     const { document } = result;

//     // Get all of the document text as one big string
//     return document;
//   };

//   return { process_document };
// };

// // const {text} = document;

// // // Extract shards from the text field
// // const getText = textAnchor => {
// //   if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
// //     return '';
// //   }

// //   // First shard in document doesn't have startIndex property
// //   const startIndex = textAnchor.textSegments[0].startIndex || 0;
// //   const endIndex = textAnchor.textSegments[0].endIndex;

// //   return text.substring(startIndex, endIndex);
// // };
