import imageCompression from 'browser-image-compression';

// 이미지 압축 함수
const compressImage = async (file) => {

  const options = {
    maxSizeMB: 2, // 최대 파일 크기 (MB)
    maxWidthOrHeight: 800, // 최대 너비 또는 높이 (px)
    useWebWorker: true // 웹 워커를 사용하여 압축 수행
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return convertToBase64(compressedFile);

  } catch (error) {
    console.error("Image compression failed:", error);
    throw error;
  }
};

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default compressImage;
