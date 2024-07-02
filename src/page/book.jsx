import { useLoaderData } from "react-router-dom";
import BookInfoCard from "../components/book_info_card";
import {getBookById} from "../service/book";

export async function loader({ params }){
    const book = await getBookById(params.bookId)
    return { book }
}

export default function BookPage() {
    const { book } = useLoaderData();
    return (
        <BookInfoCard book={ book } />
    );
}