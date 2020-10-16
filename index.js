const express= require("express");
const mysql= require("mysql");
const bodyParser= require("body-parser");
const cors= require("cors");
const dotenv= require("dotenv");

    // dotenv
    dotenv.config();
    //JSON Parser
    var jsonParser= bodyParser.json();

    //URL Encoded Parser
    var urlEncodedParser= bodyParser.urlencoded({extended: false});

let app= express();
app.use(cors());
let con= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
});
console.log(con);
app.listen(3000);

// Index Route
app.get('/', (req, res)=>{
    let data={ 
        "title":"Book API",
        "version": "V1",
        "author": "Akshay",
        "routes": {
            "index": "/",
            "insert book": "/insert [POST]",
            "all books": "/books",
            "all books in desc order": "/books/desc",
            "get book by id": "/book/id",
            "get random book": "/book/rand",
            "show all book names": "/bookNames",
            "sort books by price gt": "/book/pgt/value",
            "sort books by price lt": "/boo/plt/value"
        }
    }
    res.send(data);
});

// Insert Data
app.post('/insert', jsonParser, (req, res)=>{
    let book_name= req.body.book_name.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    let isbn= req.body.isbn;
    let book_author= req.body.book_author.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    let book_price= parseInt(req.body.book_price);
    let book_desc= req.body.book_desc.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    let qr=`INSERT INTO books (book_name, book_author, book_desc, isbn, book_price) VALUES ('${book_name}', '${book_author}', '${book_desc}', '${isbn}', ${book_price}) `;
    // console.log(qr);
    con.query(qr, (err, data)=>{
        if(err) res.send(JSON.parse('{"msg":"error"}'));
        res.send(JSON.parse('{"msg":"book added"}'));
    });
});


// all book data
app.get('/books',(req, res)=>{
    let qr= "SELECT * FROM books";
    con.query(qr, (err, data)=>{
        if(data=="") res.send(JSON.parse('{"msg":"error"}'));
        res.send(data);
    });
    
});

// all books in descending order
app.get('/books/desc',(req, res)=>{
    let qr= "SELECT * FROM books";
    con.query(qr, (err, data)=>{
        if(data=="") res.send(JSON.parse('{"msg":"error"}'));
        res.send(data.reverse());
    });
    
});


// Random Book
app.get('/book/rand', (req, res)=>{
    let lenQr= "SELECT id FROM books ORDER BY id DESC LIMIT 1";
    con.query(lenQr, (err, data)=>{
        let len=JSON.stringify(data).match(/\d+/)[0];
        let rand= Math.floor(Math.random() * (`${len}`)+1);
        let qr= `SELECT * FROM books WHERE id=${rand}`;
        con.query(qr, (err, data)=>{
            res.send(data);
        });
    });
});


// all book names
app.get('/bookNames', (req, res)=>{
    let qr= "SELECT id,book_name FROM books";
    con.query(qr, (err, data)=>{
        if(data=="") res.send(JSON.parse('{"msg":"error"}'));
        res.send(data);
    });
});

// get book by id
app.get('/book/:id',(req, res)=>{
    let id= req.params.id;
    let qr=`SELECT * FROM books WHERE id='${id}'`;
    con.query(qr, (err, data)=>{
        if(data=="") res.send(JSON.parse('{"msg":"error"}'));
        res.send(data);
    });
});

// Price Greater Than
app.get('/book/pgt/:price', (req, res)=>{
    let price= req.params.price;
    let qr= `SELECT * FROM books WHERE book_price >'${price}'`;
    con.query(qr, (err, data)=>{
        if(data=="") res.send(JSON.parse('{"msg":"error"}'));
        res.send(data);
    });
})

// Price Less Than
app.get('/book/plt/:price', (req, res)=>{
    let price= req.params.price;
    let qr= `SELECT * FROM books WHERE book_price <'${price}'`;
    con.query(qr, (err, data)=>{
        if(data=="") res.send(JSON.parse('{"msg":"error"}'));
        res.send(data);
    });
});