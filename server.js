var express = require("express");
var path = require("path");

var app = express();
var port = 3000;
var apiRoutes = require("./app/routing/apiRoutes.js");
var htmlRoutes = require("./app/routing/htmlRoutes.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api",apiRoutes);
app.use("/",htmlRoutes);
app.use(express.static("./app/public/"));

app.listen(port, function(){
    console.log('listening on ' +port+ '.');
});

