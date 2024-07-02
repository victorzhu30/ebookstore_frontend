import {DUMMY_RESPONSE, getJson, post, PREFIX} from "./common";

export async function getOrders() {
        const url = `${PREFIX}/order`;
        let orders
        try {
            orders = await getJson(url);
        } catch (e) {
            console.log(e);
            orders = []
        }
        return orders;
}

export async function searchOrders(searchTerm, startDate, endDate) {
    // if (!(arg1 || arg2 || arg3)) {
    //        /*
    //     如果`arg1`或`arg2`或`arg3`中至少有一个是"真值"，
    //     （在JavaScript中，真值可以是任何非假值的值，比如非零的数字，非空的字符串，数组，对象等）
    //     那么表达式`arg1 || arg2 || arg3`返回true。
    //     `!(arg1 || arg2 || arg3)`将会在`arg1`、`arg2`和`arg3`都是假值的时候返回true。
    //     （在JavaScript中，假值可以是`false`、`null`、`undefined`、零(`0`)、`NaN`或空字符串(`""`)）
    //     如果`arg1`、`arg2`或`arg3`中至少有一个是真值，那么`!(arg1 || arg2 || arg3)`就返回false。
    //      */
    //     const url = `${PREFIX}/order`;
    //     let orders
    //     try {
    //         orders = await getJson(url);
    //     } catch (e) {
    //         console.log(e);
    //         orders = []
    //     }
    //     return orders;
    // }
    const url = `${PREFIX}/order/search?searchTerm=${searchTerm}&startDate=${startDate}&endDate=${endDate}`
    console.log(url)
    let orders
        try {
            orders = await getJson(url);
        } catch (e) {
            console.log(e);
            orders = []
        }
        return orders;
}

export async function addOrder(orderItems) {
    const url = `http://localhost:8080/order/submit`;
    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderItems)
        });
        console.log(response);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }
    return response.json();
}

export async function submitOrder(orderInfo) {
    const url = `${PREFIX}/order`;
    let res, res2;
    try {
        res = await post(url, orderInfo);
        console.log(res);
        res2 = await res.json();
        console.log(res2);
    } catch (e) {
        console.log(e);
        res2 = DUMMY_RESPONSE;
    }
    return res2;
}