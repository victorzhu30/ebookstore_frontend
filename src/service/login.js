import {post, PREFIX} from "./common";

export async function login(username, password) {
    const url = `${PREFIX}/login`;
    let result,result2;

    try {
        result = await post(url, { username, password });
        result2 = await result.json();
    } catch (e) {
        console.log(e);
        result2 = {
            ok: false,
            message: "用户名或密码不正确！",
        }
    }
    return result2;
}
