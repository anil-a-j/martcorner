import path from "path";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    switch (req.route.path) {
      case "/editshop": {
        if (file.fieldname === "shopLogo") {
          if (!fs.existsSync(`./uploads/shop/${req.shop.id}/shoplogo`)) {
            fs.mkdirSync(`./uploads/shop/${req.shop.id}/shoplogo`, {
              recursive: true,
            });
          }
          cb(null, `uploads/shop/${req.shop.id}/shoplogo`);
        }
        if (file.fieldname === "shopBanner") {
          if (!fs.existsSync(`./uploads/shop/${req.shop.id}/shopBanner`)) {
            fs.mkdirSync(`./uploads/shop/${req.shop.id}/shopbanner`, {
              recursive: true,
            });
          }
          cb(null, `uploads/shop/${req.shop.id}/shopbanner`);
        }
        break;
      }
      case "/addproduct": {
        if (!fs.existsSync(`./uploads/shop/${req.shop.id}/products`)) {
          fs.mkdirSync(`./uploads/shop/${req.shop.id}/products`, {
            recursive: true,
          });
        }
        cb(null, `uploads/shop/${req.shop.id}/products`);
        break;
      }
      case "/editproduct": {
        if (!fs.existsSync(`./uploads/shop/${req.shop.id}/products`)) {
          fs.mkdirSync(`./uploads/shop/${req.shop.id}/products`, {
            recursive: true,
          });
        }
        cb(null, `uploads/shop/${req.shop.id}/products`);
        break;
      }
      default:
        cb(null, "uploads/");
    }
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("You can upload only images"));
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;
