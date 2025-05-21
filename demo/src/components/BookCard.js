const BookCard = ({ book }) => {
  return (
    <div className="card">
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <a href={book.url} target="_blank" rel="noreferrer">View Book</a>
    </div>
  );
};

export default BookCard;
