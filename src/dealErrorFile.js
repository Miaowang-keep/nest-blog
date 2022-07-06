const fs = require('fs');
const path = require('path');
const moment = require('moment');

function rmErrorFiles() {
  fs.readdirSync(path.resolve(__dirname, '../logs'))
    .map((item) => {
      return formatterObject(item);
    })
    .forEach((item) => {
      const { fileType, type } = item;
      return rmFile(fileType, type);
    });

  function rmFile(Logpath, type) {
    const files = fs.readdirSync(Logpath);
    let newFiles;
    if (files && files.length) {
      newFiles = files
        .map((item) => item.split('.')[1])
        .filter((file) => moment(file).isBefore(moment().subtract(2, 'w')))
        .map((fileName) => `${type}.${fileName}.log`);
    }
    if (newFiles && newFiles.length) {
      const arr = newFiles.map((item) => {
        const s = path.join(__dirname, '../logs', `./${type}/` + item);
        return fs.unlinkSync(s);
        // path.join(__dirname, `./${type}/` + item);
      });
    }
  }

  function formatterObject(type) {
    return {
      fileType: path.resolve(__dirname, '../logs', `${type}`),
      type,
    };
  }
}

rmErrorFiles();
