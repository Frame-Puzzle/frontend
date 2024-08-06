const isValidKoreanNumeric = (str) => {
  // 한글과 숫자로만 이루어졌는지 검사하는 정규표현식
  const regex = /^[가-힣0-9]+$/;
  // 문자열이 한글과 숫자로만 이루어졌는지 검사
  if (!regex.test(str)) {
    return false;
  }
  // 문자열 길이가 6자 이내인지 검사
  return str.length <= 6;
};

export default isValidKoreanNumeric;