// decode firebase service account key as JSON
const decodeAccountKey = (serviceAccountKey: string) => {
  try {
    const decodedKey = Buffer.from(serviceAccountKey, "base64").toString(
      "utf-8"
    );
    return JSON.parse(decodedKey);
  } catch (error) {
    console.error("Failed to decode Firebase service account key", error);
    throw new Error("Failed to decode Firebase service account key");
  }
};

export default decodeAccountKey;
