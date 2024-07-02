export async function getJson(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    let data = await res.json();
    return data;
}

export async function put(url, data) {
    let opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res;
}

export async function post(url, data) {
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res;
}

export async function del(url, data) {
    let res = await fetch(url, { method: "DELETE", credentials: "include", body: JSON.stringify(data) });
    return res;
}

export const DUMMY_RESPONSE = {
    ok: false,
    message: "网络错误！"
}

export const PREFIX = 'http://localhost:8080';