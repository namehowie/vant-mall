const filters = {
    readFile(fileName) {
      return `${process.env.VUE_APP_BASE_API}/readFile?fileName=${fileName}`;
    }
};

export default filters;