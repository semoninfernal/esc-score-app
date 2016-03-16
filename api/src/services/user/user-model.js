export default function(bookshelf) {
  // require (some other model).default(bookshelf)
  return bookshelf.model('User', {
    tablename: 'users'
  });
}
