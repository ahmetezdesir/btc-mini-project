//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "You can go to Bitcoin forum by clicking the button to discuss about Bitcoin-related topics. Bitcoiners are open-minded and eager to brainstorm with you. You can attend to rooms for some serious topics or just chat in daily discussion. What are you waiting for?";
var posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res) {
	res.render(__dirname + "/views/home.ejs", {homeStartingContentContent: homeStartingContent, posts: posts});
});

app.get('/about', function(req, res) {
	res.render(__dirname + "/views/about.ejs", {aboutContent: aboutContent});
});

app.get('/contact', function(req, res) {
	res.render(__dirname + "/views/contact.ejs", {contactContent: contactContent});
});

app.get('/pleasecompose', function(req, res) {
	res.render(__dirname + "/views/compose.ejs");
});

app.post('/pleasecompose', function (req, res) {
    // console.log(req.body);
	// avoid var if at all possible
	const postObject = {
		title: req.body.title,
		writing: req.body.writing
	};
	posts.push(postObject);
	res.redirect("/");
	// console.log(posts);
	// console.log(postObject.writing);
});

app.get('/posts/:postName', function(req, res) {
	// check all the posts and see if any title matches with postName
	// posts array consists of object with title and writing attribute
	const requestedTitle = lodash.lowerCase(req.params.postName);
	index = 0;
	posts.forEach(myFunc);
	function myFunc(item, index) {
		// item is post object
		// console.log(item.title);
		const storedTitle = lodash.lowerCase(item.title);
		if(storedTitle == requestedTitle) {
			res.render(__dirname + "/views/post.ejs", {titleContent: item.title, writingContent: item.writing});
		}
	}
	// console.log(req.params.postName);
	// res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
