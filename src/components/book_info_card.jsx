import {Card} from "antd";
import BookDetails from "./book_details";
import useMessage from "antd/es/message/useMessage";
import {handleBaseApiResponse} from "../utils/message";
import {addCartItem} from "../service/cart";

export default function BookInfoCard({book}) {
    const [messageApi, contextHolder] = useMessage();
    const handleAddCartItem = async () => {
        let res = await addCartItem(book.id);
        handleBaseApiResponse(res, messageApi);
    };

    return (
        <Card className="card-container">
            {contextHolder}
            <BookDetails book={book} onAddCartItem={handleAddCartItem}/>
        </Card>
    );
}