const makeHomeDirNameShort = (name) => {
  let newName = "";
  if (name.length > 10) {
    newName = name.slice(0, 9) + "..";
  } else {
    newName = name;
  }
  return newName;
};

export default makeHomeDirNameShort;
