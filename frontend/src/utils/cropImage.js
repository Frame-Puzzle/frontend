export function cropImageToSquare(imageUrl, callback) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // CORS 문제를 방지하기 위해 설정
    img.src = imageUrl;
    var size;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      // 이미지의 중앙에서 정사각형 영역을 크롭
      size = Math.min(img.width, img.height);
      const x = Math.ceil((img.width - size) / 2);
      const y = Math.ceil((img.height - size) / 2);
  
      // 정사각형 크기로 캔버스 크기 설정
      canvas.width = size;
      canvas.height = size;
  
      // 이미지의 중앙을 기준으로 정사각형 영역을 캔버스에 그리기
      context.drawImage(img, x, y, size, size, 0, 0, size, size);

      // 캔버스 데이터를 URL 형식으로 반환
      callback(canvas.toDataURL());
    };
  
    img.onerror = (err) => {
      console.error("이미지를 불러오는 데 실패했습니다.", err);
      callback(null, err);
   };
  return size;
}
  