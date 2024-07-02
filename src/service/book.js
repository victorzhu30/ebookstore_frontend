import {del, getJson, post, PREFIX, put} from "./common";

export async function searchBooks(keyword,currentPage, pageSize) {
    const url = `${PREFIX}/books?keyword=${keyword}&pageIndex=${currentPage}&pageSize=${pageSize}`;
    let books;
    try {
        books = await getJson(url);
        // if (keyword) {
        //     return books.filter((book) => book.title.toLowerCase().includes(keyword.toLowerCase()));
        // }
        return books;
    }
        catch(e) {
            console.log(e);
            books = {
                items: [],
                total: 0,
            };
        }
        return books;
}

export async function getBookById(bookId) {
    const url = `${PREFIX}/books/${bookId}`;
    let book;
    try {
        book = await getJson(url);
    } catch (error) {
        console.log(error);
        book = null;
    }
    return book;
}

export async function onUpdateBookInfo(book){
    const url = `${PREFIX}/books/${book.id}`;
    let res,res2;
    try {
        res = await put(url, book);
        console.log(res);
        res2 = await res.json();
        console.log(res2);
    } catch (e) {
        console.log(e);
        res2 = null;
    }
    return res2;
}

export async function addNewBook(book) {
    const url = `${PREFIX}/addbook`;
    let res,res2;
    try {
        res = await post(url, book);
        res2 = await res.json();
    } catch (e) {
        console.log(e);
        res2 = null;
    }
    return res2;
}

export async function deleteOldBook(book) {
    const url = `${PREFIX}/books/${book.id}`;
    let res,res2;
    try {
        res = await del(url,book);
        res2 = await res.json();
    } catch (e) {
        console.log(e);
        res2 = null;
    }
    return res2;
}

export async function getTop10BestSellingBooks(startDate="", endDate="") {
    const url = `${PREFIX}/books/rank?startDate=${startDate}&endDate=${endDate}`;
    // http://localhost:8080/books/rank?startDate=&endDate=
    // http://localhost:8080/books/rank?startDate=2024-06-04&endDate=2024-06-08
    console.log(url);
    let books;
    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = [];
    }
    return books;
}