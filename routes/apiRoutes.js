var app = require("express");
var fs = require("fs");
var db = [];
var path = require("path");


module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    //post request
    app.post("/api/notes", function(req, res) {
        var noteCont = req.body;
        var notes = fs.readFileSync("./db/db.json");
        noteCont.id = String(notes.length);
        notes = JSON.parse(notes);
        notes.push(noteCont);
        fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        res.json(notes);
    })


    // delete saved note
    app.delete("/api/notes/:id", function(req, res) {
        var noteID = req.params.id;
        console.log(noteID);
        notes = fs.readFileSync("./db/db.json");
        notes = JSON.parse(notes);
        notes = notes.filter(function(farley) {
            if (noteID === farley.id) {
                return false;
            } else {
                return true;
            }
        })
        fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        res.json(notes);
    });

};