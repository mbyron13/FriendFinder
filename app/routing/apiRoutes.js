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
        var newBestFriend = calcNewBestFriend(people, newPerson)
        people.push(newPerson);

        fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(people), { encoding: "utf-8" }, function (err) {
            if (err) throw err;
            res.status(202).send(newBestFriend);
        });
    });
});

function calcNewBestFriend(people, newPerson) {
    var newBestFriendIndex = 0;
    var newBestFriendDiff = 0;

    for (var i = 0; i < people.length; i++) {
        var diff = 0;
        for (var j = 0; j < newPerson.scores.length; j++){
           diff += Math.abs(newPerson.scores[j] - people[i].scores[j]);
        }
        if(i == 0 || diff < newBestFriendDiff){
            newBestFriendIndex = i;
            newBestFriendDiff = diff;
        }
    }
    console.log(people[newBestFriendIndex]);
    console.log("people new best friend index: " + people[newBestFriendIndex]);
    console.log("new best friend index: "+ newBestFriendIndex);
    return people[newBestFriendIndex];
}
module.exports = router;
