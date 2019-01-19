// Load data 
// data store in variable
var friendsData = require("../data/friends");

// npm array short 
// 
var arraySort = require('array-sort');

//Routing
module.exports = function (app) {
    //API GET request
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/Friends", function (req, res) {
        res.json(friendsData)
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {

        // request body store in one variable
        var userinputdata = (req.body);

        // results variable store diff in userdata and frienddata
        // scoretotaldiff array in store all diff 
        // for loop for frinddata and userdata
        var results = 0;
        var scoretotaldiff = [];
        for (var i = 0; i < friendsData.length; i++) {
            results = 0;
            for (var j = 0; j < 10; j++) {
                results += Math.abs(userinputdata.scores[j] - friendsData[i].scores[j]);
            }
            scoretotaldiff.push({ name: friendsData[i].name, photo: friendsData[i].photo, score: Math.abs(results) });
        }

        arraySort(scoretotaldiff, 'score');
        // console.log(scoretotaldiff);

        // data push in friend.js file
        friendsData.push(req.body);
        
        // return data in survey.html 
        return res.json(scoretotaldiff[0]);
    });
}