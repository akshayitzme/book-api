# Book-API
Book API coded in NodeJS. Uses MySQL Database.

### Features
- Returns Book Name, ID, Author, Description, ISBN, Book Price in JSON format.
- Routes, <br>
Index : ` "/"` <br>
Insert Book : [POST] `"/insert"`<br>
Return all Books : `"/books"`<br>
Return all books in descending order : `"/books/desc"` <br>
Return all Book Names : `"/bookNames"`<br>
Return a Book by id : `"/book/<id>"`<br>
Return a random Book : `"/book/rand"` <br>
Return Books Price > : `"/book/pgt/<value>"` <br>
Return Books Price < : `"/book/plt/<value>"`

### Installation
- Install Node Modules 
<br>for npm `npm install`
<br>for yarn `yarn install` <br>
- Create .env file. See [example](.env.example) <br>

- Import [books.sql](books.sql) to MySQL Database.

### Usage
- Run App 
<br>for npm, `npm start`
<br>for yarn, `yarn start`

- Run in Dev Mode,
<br>for npm `npm run dev`
<br>for yarn `yarn run dev`

### Misc
- Example POST data to insert a book <br>
`{
    "book_name": "Gooseberries",
    "book_price": 250,
    "book_author": "Anton Chekhov",
    "isbn": "ISBN-13: 978-1-56619-909-4",
    "book_desc": "Gooseberries is one of Anton Chekhov's most famous short stories."
}`
