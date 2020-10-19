var app = require("express");
var fs = require("fs");
var db = [];
var path = require("path");
const { v4: uuidv4 } = require('uuid');

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    // how to publish a note, needs both content and title to be savedd) 
    app.post("/api/notes", function(req, res) {
            var noteCont = req.body;
            //console.log(noteCont);
            var notes = fs.readFileSync("./db/db.json");
            noteCont.id = uuidv4();
            console.log("The id of note is:", noteCont.id);
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
        notes = notes.filter(function(selectedNote) {
                if (noteID === selectedNote.id) {
                    return false;
                } else {
                    return true;
                }
            })
            // rewriting this into the database that there is one less note
        fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        res.json(notes);
    });

};