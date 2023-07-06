const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
var conn =mongoose.Collection;

var employeeSchema =new mongoose.Schema({
	name: String,
	email: String,
	etype: String,
	hourlyrate: Number,
	totalHour: Number,
	total: Number,
	image:String,
});

var employeeModel = mongoose.model('Employee', employeeSchema);
module.exports=employeeModel;