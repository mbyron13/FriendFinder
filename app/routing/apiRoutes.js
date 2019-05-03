var express = require("express");
var path = require("path");
var fs = require("fs");

var router = express.Router();
router.get("/friends", function (req, res) {
    fs.readFile(path.join(__dirname, "../data/friends.json"), function (err, data) {
        return res.json(JSON.parse(data));
    });
});

router.post("/friends", function (req, res) {

    var newPerson = req.body;

    fs.readFile(path.join(__dirname, "../data/friends.json"), function (err, data) {
        var people = JSON.parse(data);

        people.push(newPerson);
        
        fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(people), { encoding: "utf-8" }, function (err) {
            if (err) throw err;
            res.sendStatus(202);
        });
    });
});
module.exports = router;
