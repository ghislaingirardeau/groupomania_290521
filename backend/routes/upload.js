const express = require('express')
const router = express.Router()

/* FORM: EN UTILISANT MULTER */

var multer = require("multer");

const MIME_TYPE = { /* POUR DEFINIR LE TYPE D'IMAGE QUE NOUS RECEVRONS */
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

const storage = multer.diskStorage({
    destination: function (req, file, event) {
        event(null, "images")
    },
    filename: function (req, file, event) {
        const name = file.originalname.split(' ').join("_")
        const extension = MIME_TYPE[file.mimetype]
        const newName = name.slice(0, -4) /* POUR SUPPR EXTENSION NAME ORIGINALE */
        event(null, newName + Date.now() + "." + extension)
    }
})

router.post('/uploadtes', multer({storage}).single('image'),function(req, res) {
    /* mettre la route qui correspond entre backend et frontend '/upload' */
  console.log(req.body);
  res.send(req.file)

});

/* FORM: EN UTILISANT NPM FILEUPLOAD */

router.post('/upload', function(req, res) {
  console.log(req.files.image); // the uploaded file object
  res.send('File uploaded!');
});

/* FORM: EN UTILISANT REQ.FILES POUR ENREGISTRER LE FICHIER COTE SERVEUR */

router.post('/uploadtest', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  image = req.files.image;
  console.log(req.body);
  console.log(image);
  uploadPath = __dirname + '/images/' + image.name;

  // Use the mv() method to place the file somewhere on your server
  image.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

module.exports = router