const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const bcrypt = require('bcrypt')
const articleRouter = require('./routes/articles')
const loginRouter = require('./routes/articles')
const methodOverride = require('method-override')
// const fileUpload= require('express-fileupload')
var bodyParser = require('body-parser');
// const multer= require('multer')
const path= require('path')
var fs = require('fs');
const app = express()
const uploadModel=require('./models/upload')
require('dotenv/config');
var jwt = require('jsonwebtoken');

var empModel = require('./models/employee');

// var imageData =uploadModel.find({});


// const storage = multer.diskStorage({
//   destination: (req,file,cb)=>{
//     cb(null, 'uploads')
//   },
//   filename: (req, file, cb)=>{
//     console.log(file)
//     cb(null,Date.now()+path.extname(file.originalname))
//   }
// })

// const upload= multer({storage: storage})

// mongoose.createConnection('mongodb+srv://vaibzi:BiotSavart12@@cluster0.0ujadeq.mongodb.net/test', {
//   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
// })

const DB=process.env.DATABASE;
const connectionParams={
	useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}
mongoose.createConnection(DB, connectionParams).then(()=>{
	console.log("connected")
}).catch((err)=>console.log(err))
// mongoose.createConnection('mongodb+srv://vaib:BiotSavart12%40@cluster0.spujmwb.mongodb.net/blog?retryWrites=true&w=majority', {
//   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
// })
// mongoose.createConnection('mongodb://localhost/blog,imagesInMongoApp', {
//   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
// })





app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use('/public', express.static('public'));

// app.use(fileUpload());




app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  // res.render('articles/index-articles', { articles: articles })
  res.render('articles/index', { articles: articles })
})
app.get('/articles', async (req, res) => {
	const articles = await Article.find().sort({ createdAt: 'desc' })
	res.render('articles/index-articles', { articles: articles})
	
  // res.render('/articles/index-articles', { articles: articles })
})

// app.get("/upload", (req, res)=>{

//   imageData.exec(function(err,data){
//     if(err) throw err;
//     res.render('new', {title: 'Upload File',records: data, success: ''})
//   })

//   res.render("upload");
// });




// app.post("/upload", upload.single("image"), (req,res)=>{
  
//   var imageFile=req.file.filename;
//   var success =req.file.filename+ " uploaded successfully";
//   var imageDetails= new uploadModel({
//     imagename: imageFile
//   });
//   imageDetails.save(function(err,doc){
//     if(err) throw err;
// })
// imageData.exec(function(err,data){
//   if(err) throw err;
//   res.render('new', {title: 'Upload File',records: data, success: success})
// })


//   res.send("uploaded")
// });







app.use('/articles', articleRouter)
app.use('/', loginRouter)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// app.post('/upload', (req, res) => {
//   // Get the file that was set to our field named "image"
//   const { image } = req.files;

//   // If no image submitted, exit
//   if (!image) return res.sendStatus(400);

//   // Move the uploaded image to our upload folder
//   image.mv(__dirname + '/upload/' + image.name);

//   res.sendStatus(200);
// });










// Step 5 - set up multer for storing uploaded files

// var multer = require('multer');

// var storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'uploads')
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, file.fieldname + '-' + Date.now())
// 	}
// });

// var upload = multer({ storage: storage });


// Step 6 - load the mongoose model for Image




// Step 7 - the GET request handler that provides the HTML UI

// app.get('/ImagesPage', (req, res) => {
// 	imgModel.find({}, (err, items) => {
// 		if (err) {
// 			console.log(err);
// 			res.status(500).send('An error occurred', err);
// 		}
// 		else {
// 			res.render('ImagesPage', { items: items });
// 		}
// 	});
// });

// Step 8 - the POST handler for processing the uploaded file

// app.post('/', upload.single('image'), (req, res, next) => {

// 	var obj = {
// 		name: req.body.name,
// 		desc: req.body.desc,
// 		img: {
// 			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
// 			contentType: 'image/png'
// 		}
// 	}
// 	imgModel.create(obj, (err, item) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			// item.save();
// 			res.redirect('/index-articles');
// 		}
// 	});
// });

// Step 9 - configure the server's port

var port = process.env.PORT || '3000'
app.listen(port, err => {
	if (err)
		throw err
	console.log('Server listening on port', port)
})


// app.listen(5000)
// localhost:(your-port)