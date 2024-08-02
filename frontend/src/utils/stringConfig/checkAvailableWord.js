const checkAvailableWord = (word) => {
  const regex = /^[a-zA-Z가-힣0-9]*$/;
  return regex.test(word);
}

export default checkAvailableWord;
