## **FreeCodeCamp**- Information Security and Quality Assurance

## Objective

- Build a full stack JavaScript app that is functionally similar to this: https://spark-cathedral.glitch.me/.

- _ADD YOUR MongoDB_ connection string to .env without quotes as db `example: DB=mongodb://admin:pass@1234.mlab.com:1234/fccpersonallib`
- SET NODE_ENV to `test` without quotes
- You need to create all routes within `routes/api.js`
- You will add any security features to `server.js`
- You will create all of the functional tests in `tests/2_functional-tests.js`

# FCC-Personal-Library

## User Stories

- Nothing from my website will be cached in my client as a security measure.

- I will see that the site is powered by `'PHP 4.2.0'` even though it isn't as a security measure.

- I can **post** a title to `/api/books` to add a book and returned will be the object with the title and a unique `\_id`.

- I can **get** `/api/books` to retrieve an aray of all books containing title, \_id, & commentcount.

- I can **get** `/api/books/{\_id}` to retrieve a single object of a book containing title, \_id, & an array of comments (empty array if no comments present).

- I can **post** a comment to `/api/books/{\_id}` to add a comment to a book and returned will be the books object similar to get `/api/books/{\_id}`.

- I can **delete** `/api/books/{\_id}` to delete a book from the collection. Returned will be 'delete successful' if successful.

- If I try to request a book that doesn't exist I will get a 'no book exists' message.

- I can send a **delete** request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.

- All 6 functional tests requiered are complete and passing.

|       API       |      GET       |        POST         |      DELETE      |
| :-------------: | :------------: | :-----------------: | :--------------: |
|   /api/books    | list all books |    add new book     | delete all books |
| /api/books/1234 | show book 1234 | add comment to 1234 |   delete 1234    |

## Technologies

- Node
- Express
- Helmet
- Mocha-Chai
- Bootstrap
- javascript
- Html

## Project Structure:

```
├── assertion-analyser.js
├── package.json
├── package-lock.json
├── public
│   ├── client.js
│   ├── favicon.ico
│   └── style.css
├── README.md
├── routes
│   ├── api.js
│   └── fcctesting.js
├── server.js
├── test-runner.js
├── tests
│   ├── 1_unit-tests.js
│   └── 2_functional-tests.js
└── views
    └── index.html
```

<<<<<<< HEAD
### Project Demo:

- [FCC-Personal-Library](https://avatarfreak-fcc-personal-library.glitch.me)
=======
### Local Dev
- clone the repo
- cd `pgt-personal-library`
- npm install
- node start
>>>>>>> a6d3bf42ebe9c374054ff85fef418553eaa966ec

### Author:

- [avatarfreak](https://github.com/avatarfreak)
