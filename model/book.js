const mongoose=require ('mongoose');
const Schema =mongoose.Schema;
const ObjectId=Schema.ObjectId;
const BlogPost =new Schema({
    Bookname:String,
    Author:String,
    BookDescription :String,
});
//schema created of the Mongoose for the connction
//exporting the schema  book model
const Book =mongoose.model("Book",BlogPost);
module.exports =Book;

