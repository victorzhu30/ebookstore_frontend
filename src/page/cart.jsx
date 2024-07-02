import { Card } from "antd";
import CartItemTable from "../components/cart_item_table";
import {useEffect, useState} from "react";
import {getCartItems} from "../service/cart";

export default function CartPage() {
    const[cartItems, setCartItems] = useState([]);

    const initCartItems = async () => {
        let cartItems = await getCartItems();
        setCartItems(cartItems);
    }

    useEffect(() => {
        initCartItems();
    }, []);

    return (
        <Card className="card-container">
            <CartItemTable cartItems={cartItems} onMutate={initCartItems}/>
        </Card>
    );
}