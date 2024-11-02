import { BookDto } from './book.model';

export class BookService {
  private books = [];

  getAllBooks() {
    return this.books;
  }

  addBook(bookDto: BookDto) {
    const id = (this.books.length + 1).toString();
    this.books.push({ id, ...bookDto, createdDt: new Date() });
  }

  getBookById(id: string) {
    const book = this.books.find((book) => book.id === id);
    console.log(book);
    return book;
  }

  deleteBook(id: string) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  updateBook(id: string, bookDto: BookDto) {
    const updateIndex = this.books.findIndex((book) => book.id === id);
    if (updateIndex === -1) return null;
    const updatedBook = { id, ...bookDto, updatedDt: new Date() };
    this.books[updateIndex] = updatedBook;
    return updatedBook;
  }
}
