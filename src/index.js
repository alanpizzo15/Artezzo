const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const morgan = require('morgan');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');

//Settings

app.set('port', process.env.PORT || 27017);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

//Cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
  });

//Database config
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('Conectado con la BD atlas'))
    .catch((error)=> console.log(error));

//midlewares
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image')); 

//Routes
app.use(require('./routes/index'));
app.use(require('./apiProducts/products'));
app.use(require('./orders/sendOrders'));

//Public static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(`${__dirname}/public/`));

//Port config
app.listen(app.get('port'), () => {
    console.log("Server activo en puerto", app.get('port'));
});
