import {post, PREFIX} from "./common";

export async function register(username, password, email) {
    const url = `${PREFIX}/register`;
    let result,result2;

    try {
        result = await post(url, { username, password, email });
        result2 = await result.json();
    } catch (e) {
        console.log(e);
        result2 = {
            ok: false,
            message: "注册失败！",
        }
    }
    return result2;
}