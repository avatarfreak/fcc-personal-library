/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
require("dotenv").config();

let Book;

MongoClient.connect(
  MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function(err, client) {
    if (err) {
      return console.log("unable to connect to database");
    }
    console.log("connection established");
    Book = client.db("book-collection");
    return Book;
  }
);

module.exports = function(app) {
  app
    .route("/api/books")
    .get(function(req, res) {
      Book.collection("books")
        .find({})
        .toArray()
        .then(book => res.json(book))
        .catch(err => res.status(400).send());
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    .post(function(req, res) {
      //var _id = uuid();
      var title = req.body.title.trim();

      if (!title) {
        return res.status(400).send("Title is missing");
      }
      Book.collection("books")
        .insertOne({
          title: title,
          comments: [],
          commentcount: 0
        })
        .then(doc => res.json(doc.ops[0]))
        .catch(err => res.status(400).send());

      //response will contain new book object including atleast _id and title
    })
    .delete(function(req, res) {
      Book.collection("books")
        .deleteMany({})
        .then(book => {
          if (book.deletedCount < 1) {
            return res.json("Nothing to delete");
          }
          return res.json("complete delete successfull");
        })
        .catch(err => res.status(400).send());
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(function(req, res) {
      var bookid = req.params.id;

      try {
        ObjectId(bookid);
      } catch (error) {
        return res.status(400).send("please provide valid id");
      }
      Book.collection("books")
        .findOne({ _id: ObjectId(bookid) })
        .then(book => {
          if (!book) return res.status(400).send("no match");
          return res.json(book);
        })
        .catch(err => res.status(400).send("no match"));

      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function(req, res) {
      var bookid = req.params.id;
      var comment = req.body.comment;

      try {
        ObjectId(bookid);
      } catch (error) {
        return res.status(400).send("please provide valid id");
      }

      if (!comment) {
        return res.status(400).send("comment field is empty");
      }

      Book.collection("books")
        .findOneAndUpdate(
          { _id: ObjectId(bookid) },
          { $push: { comments: comment }, $inc: { commentcount: 1 } },
          //{ returnNewDocument: true },
          { returnOriginal: false }
        )
        .then(book => {
          if (!book) {
            return res.status(400).send("please provide valid id");
          }
          return res.status(200).json(book.value);
        })
        .catch(err => res.status(400).send("please provide valid id"));
      // json res format same as .get
    })

    .delete(function(req, res) {
      var bookid = req.params.id;
      Book.collection("books")

        .deleteOne({ _id: ObjectId(bookid) })
        .then(book => {
          if (!book) {
            return res.status(400).send("please provide valid id.");
          }
          return res.status(200).send("delete successful");
        })
        .catch(err => res.status(400).send("please provide valid id"));
      //if successful response will be 'delete successful'
    });
};
