import axios from 'axios';
import { IBook, ICategory } from './bookSlice';

export const bookAPI = () => {
  return new Promise<IBook[]>((resolve, reject) => {
    let bookData: IBook[] = [];
    axios
      .get('http://gutendex.com/books')
      .then(res => {
        res.data.results.forEach((ele: any) => {
          const book: IBook = {
            id: ele.id,
            title: ele.title,
            author: ele.authors[0].name,
            genre: ele.subjects,
            image: ele.formats['image/jpeg'],
            file: ele.formats['text/html'],
            price:parseInt((Math.random()*1000).toFixed(2))
          };
          bookData.push(book);
        });
        resolve(bookData);
      })
      .catch(error => {
        console.log('Book API Error:', error);
      });
  });
};

export const bookCategoriesAPI = (genre: string) => {
  return new Promise<ICategory>((resolve, reject) => {
    let bookData: IBook[] = [];
    axios.get(`http://gutendex.com/books?topic=${genre}`).then(res => {
      res.data.results.forEach((ele: any) => {
        const book: IBook = {
          id: ele.id,
          title: ele.title,
          author: ele.authors[0]?.name,
          genre: ele.subjects,
          image: ele.formats['image/jpeg'],
          file: ele.formats['text/html'],
          price:parseInt((Math.random()*1000).toFixed(2))
        };
        bookData.push(book);
      });
      const category: ICategory = {
        category: genre,
        data: bookData,
      };
      resolve(category);
    });
  });
};

