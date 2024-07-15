const ht16 = async (fileData: string) => {
  const hash = await sha256(fileData).then((res) => res);
  const hashArr = Array.from(new Int16Array(hash), (el) =>
    el.toString(16).padStart(2, "0"),
  );

  console.log(hashArr);
  return hashArr.join("");
};
//

async function sha256(str: string) {
  const buf = new TextEncoder().encode(str);
  return await crypto.subtle.digest("SHA-256", buf);
}
async function sha512(bytes: Int16Array) {
  const buf = new TextDecoder().decode(bytes);
  return crypto.subtle.digest("SHA-256", bytes);
}

function unDigest(hexString: string) {
  const unHex = (hex: string) => {
    const cleanHex = hex.replace(/^0+/, "");
    return parseInt(cleanHex, 16).toString(16).padStart(2, "0");
  };

  return unHex(hexString);
}

function unHash(hexString: string) {
  // Split the hex string into an array of hex digits
  const hexDigits = hexString.match(/.{1,2}/g) ?? [];

  // Convert each hex digit pair back to decimal and collect them into an array
  const binaryData = hexDigits
    .map((byteHex) => parseInt(byteHex, 16))
    .map((num) => num.toString(10));

  return binaryData;
  // Join the binary data array into a single string
  // const binaryString: string = binaryData.join("");

  // Attempt to decode the binary string as UTF-8 text
  // This step is speculative and may not yield meaningful results
  // due to the lossy nature of hashing.
  // const decodedText = new TextDecoder().decode(binaryString);

  // return decodedText;
}
