const fs = require("fs");
const { unlink } = require("fs/promises");
const bcrypt = require("bcrypt");

const deleteFileWithPath = async (path) => {
  const configPath = "." + path;
  if (fs.existsSync(configPath)) {
    // The file exists, so you can proceed with deleting it
    try {
      await unlink(configPath);
      console.log(`File deleted successfully with PATH: ${configPath}`);
    } catch (err) {
      console.error("delete file ERROR: ", err.message);
    }
  } else {
    console.log("File not found");
  }
};

const deleteAllImagesOfCars = (cars) => {
  for (let i = 0; i < cars.length; i++) {
    for (let j = 0; j < cars[i].images.length; j++) {
      const carImagesPath = cars[i].images[j].replace("static", "public");
      deleteFileWithPath(carImagesPath);
    }
  }
};

const deleteAllImagesOfCar = (car) => {
  for (let i = 0; i < car.images.length; i++) {
    const carImagesPath = car.images[i].replace("static", "public");
    deleteFileWithPath(carImagesPath);
  }
};

const bcryptCompareValue = async (value1, value2) => {
  return await bcrypt.compareSync(value1, value2);
};

const cloneImagesPathOfFileToArray = (files) => {
  const imagesPath = [];
  for (let i = 0; i < files.length; i++) {
    imagesPath.push(`/static/images/cars/${files[i].filename}`);
  }
  return imagesPath;
};

const checkUserPermission = (role, endpoint, method) => {
  if (!role || !endpoint || !method) {
    return false;
  }
  return role.permissions.find(
    (x) => x.endpoint == endpoint && x.method == method
  );
};

module.exports = {
  deleteFileWithPath,
  bcryptCompareValue,
  deleteAllImagesOfCars,
  deleteAllImagesOfCar,
  cloneImagesPathOfFileToArray,
  checkUserPermission,
};
