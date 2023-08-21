const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(!fs.existsSync('public/images')) {
      fs.mkdirSync('public/images', { recursive: true });
    }
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({
  onError : function(err, next) {
      console.log('error', err);
      next(err);
    },
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image file is allowed!'));
    }
    cb(null, true);
  }
});

module.exports = (_req, _res, _next) => {
    upload.single('image')(_req, _res, err => {
        if(err) {
          const errors = [
              {
                msg: err.message,
                param: "image",
                location: "body"
              }
          ];
          
          return _res.status(422).json({ errors });
        }

        _next();
    })
};
