import { DUMMY_RESPONSE, PREFIX, getJson, put } from "./common";

export async function getMe() {
    const url = `${PREFIX}/user/me`;
    let me = null;
    try {
        me = await getJson(url);
        console.log(me);
    } catch(e) {
        console.log(e);
    }
    return me;
}

export async function getAllUsers() {
    const url = `${PREFIX}/allusers`;
    let users = [];
    try {
        users = await getJson(url);
        console.log(users);
    } catch(e) {
        console.log(e);
    }
    return users;
}

export async function banUser(user) {
    const url = `${PREFIX}/user/ban`;
    let res, res2;
    try {
        res = await put(url,user);
        res2 = await res.json();
    } catch(e) {
        console.log(e);
        res2 = DUMMY_RESPONSE;
    }
    return res2;
}

export async function changePassword(request) {
    const url = `${PREFIX}/user/me/password`;
    let res, res2;
    try {
        res = await put(url, request);
        res2 = await res.json();
    } catch(e) {
        console.log(e);
        res2 = DUMMY_RESPONSE;
    }
    return res2;
}

//顾客可以统计在指定时间范围内⾃⼰购买书籍的情况 ，包括每种书购买了多少本，购书总本数和总⾦额
export async function getUserCost(startDate="", endDate=""){
    const url = `${PREFIX}/user/count?&startDate=${startDate}&endDate=${endDate}`
    console.log(url);
    let userCost;
    try {
        userCost = await getJson(url);
    } catch (e) {
        console.log(e);
        userCost = [];
    }
    return userCost;
}

// 管理员可以统计在指定时间范围内每个⽤户的累计消费情况，按照购书进⾏排序，形成消费榜，以图或表的⽅式呈现
export async function getUsersCosts(startDate="", endDate="") {
    const url = `${PREFIX}/users/rank?startDate=${startDate}&endDate=${endDate}`;
    console.log(url);
    let users;
    try {
        users = await getJson(url);
    } catch (e) {
        console.log(e);
        users = [];
    }
    return users;
}