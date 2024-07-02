import {DUMMY_RESPONSE, PREFIX, getJson, put, del} from "./common";

export async function getCartItems() {
    const url = `${PREFIX}/cart`;
    let cartItems;
    try {
        cartItems = await getJson(url);
    } catch (e) {
        console.log(e);
        cartItems = []
    }
    return cartItems;

}

export async function addCartItem(bookId) {
    const url = `${PREFIX}/cart?bookId=${bookId}`;
    let response,response2;
    try {
        response = await put(url);
        response2 = await response.json();
    } catch (e) {
        console.log(e);
        response2 = DUMMY_RESPONSE;
    }
    return response2;
}

export async function deleteCartItem(id) {
    const url = `${PREFIX}/cart/${id}`;
    let res,res2;
    try {
        res = await del(url);
        res2 = await res.json();
    } catch (e) {
        console.log(e);
        res2 = DUMMY_RESPONSE;
    }
    return res2;
}

export async function changeCartItemNumber(id, newnumber) {
    const url = `${PREFIX}/cart/${id}?number=${newnumber}`;
    let response,response2;
    try {
        response = await put(url);
        response2 = await response.json();
    } catch (e) {
        console.log(e);
        response2 = DUMMY_RESPONSE;
    }
    return response2;
}