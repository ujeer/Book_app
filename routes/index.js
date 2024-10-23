var express = require('express');
var router = express.Router();
const Book = require('../model/book');
const { ObjectId } = require('mongodb');


/* GET home page. */
router.get('/', async function(req, res, next) {

    try{
      const books = await Book.find();
      res.render("index",{title:"BookApp",bookList : books})
      // res.json(books);
    }catch(err){
      console.log(err);
    }
  });


router.get('/add-books', function(req, res, next) {
  res.render('add-books');
});



router.post('/save',async function(req, res, next) {
  try{
    const newBook = new Book(req.body);
    await newBook.save();
    console.log("Book Saved: ",newBook);
  }catch(err){
    console.log(err);
  }
  res.redirect("/");
});
router.get('/edit/:id',async function(req, res, next) {
  try{
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    res.render('edit-books',{book});
  }catch(err){
    console.log(err);
  }
});

// Route to update book details
router.post('/update/:id', async function(req, res, next) {
  try {
    const bookId = req.params.id;
    const updatedData = req.body; // Get the updated data from the form
    await Book.findByIdAndUpdate(bookId, updatedData, { new: true }); // Update the book
    res.redirect("/"); // Redirect to the home page after updating
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating book.");
  }
});



router.post('/delete/:id',async function(req, res, next) {
  try{
   const bookId = req.params.id;
   console.log('Attempting to delete book with ID:', bookId); // Debug log
   await Book.findByIdAndDelete(new ObjectId(bookId));
   res.redirect("/");
  }catch(err){
   console.log(err); 
   res.status(500).send("Error deleting book.");
  }
});
 
 
module.exports = router;