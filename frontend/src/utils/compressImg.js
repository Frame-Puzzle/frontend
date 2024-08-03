import imageCompression from 'browser-image-compression';

const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1, // 최대 파일 크기 (MB 단위)
    maxWidthOrHeight: 2048, // 이미지의 최대 너비 또는 높이
    useWebWorker: true, // 웹 워커 사용
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error during image compression:', error);
    throw error;
  }
};

export default compressImage;