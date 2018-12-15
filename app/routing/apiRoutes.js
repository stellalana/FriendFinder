// Gets data from friends.js file
var allFriends = require("../data/friends")

// Variables
var bestMatch;
var difference = 0;
var closestMatch = 9999;

// App
module.exports = function(app) {
  
    //GET request for the friends table
    app.get("/api/friends", function(req, res) {
      //responds with JSON
      res.json(allFriends);
    });

    //POST request
  app.post("/api/friends", function(req, res) {

    //Compares newFriend to allFriends to find best match
    var newFriend = req.body;

    // Runs loop for all friends
    for (var i = 0; i < allFriends.length; i++) {
    //   Runs loop for all object parameters
      for (var x = 0; x < 10; x++) {
        difference += Math.abs(allFriends[i].scores[x] - newFriend.scores[x]);
      }
        if (difference < closestMatch) {
            closestMatch = difference;
            bestMatch = allFriends[i];
        }
        difference = 0;
    }
    closestMatch = 9999;
    //updates allFriends array 
    allFriends.push(newFriend);
    //Sends bestMatch to client
    res.json(bestMatch);
  });
};