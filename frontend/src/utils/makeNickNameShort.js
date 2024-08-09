const makeNickNameShort = (name) => {
  let newName = "";
  if (name.length > 3) {
    newName = name.slice(0, 2) + "..";
  } else {
    newName = name;
  }
  return newName;
}

export default makeNickNameShort;
