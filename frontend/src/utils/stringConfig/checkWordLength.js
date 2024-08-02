const chekcWordLength = (word, length) => {
  const encoder = new TextEncoder();
  const byteArray = encoder.encode(word);

  return byteArray.length <= length;
}

export default chekcWordLength;