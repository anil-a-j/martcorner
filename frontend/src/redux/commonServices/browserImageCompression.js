import imageCompression from "browser-image-compression";
const reduceSize = async (file) => {
  const options = {
    maxSizeMB: 0.5,
    useWebWorker: true,
  };
  try {
    // stores Blob type data
    const compressedFile = await imageCompression(file, options);
    // convert Blob to File
    const image = new File([compressedFile], file.name, {
      type: compressedFile.type,
    });
    return image;
  } catch (error) {
    throw new Error(error);
  }
};

const reduceSizeBanner = async (file) => {
  const options = {
    maxSizeMB: 0.8,
    useWebWorker: true,
  };
  try {
    // stores Blob type data
    const compressedFile = await imageCompression(file, options);
    // convert Blob to File
    const image = new File([compressedFile], file.name, {
      type: compressedFile.type,
    });
    return image;
  } catch (error) {
    throw new Error(error);
  }
};

export { reduceSize, reduceSizeBanner };
