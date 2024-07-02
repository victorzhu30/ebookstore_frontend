import { DUMMY_RESPONSE, PREFIX, put } from "./common";

export async function logout() {
    const url = `${PREFIX}/logout`;
    let res, res2;
    try {
        res = await put(url);
        res2 = res.json();
    } catch (e) {
        console.log(e);
        res2 = DUMMY_RESPONSE;
    }
    return res2;
}
/*
logout 请求的 HTTP 方法选择通常取决于项目对 RESTful API 或其他 HTTP API 设计的约定。一般情况下，logout 操作可能使用以下几种方法中的一种：
POST：因为 POST 通常用于创建资源或执行操作，而不一定是幂等的。
DELETE：因为它涉及清除（删除）用户会话，通常可以认为是幂等的。
PUT：这种情况较少见，但有些项目可能会这样设计。
为什么使用 PUT 方法？
在你的代码中使用 PUT 方法可能基于以下几个原因：
遵循特定的 API 设计约定：你的项目可能遵循一种特定的约定，其中 PUT 被用于更新状态或触发某些逻辑。
幂等性（Idempotency）：PUT 方法的一个特点是幂等性，即同样的操作会产生相同的结果。这或许是为了确保多次 logout 请求都能够安全地处理。
更常见的实现方法
尽管在某些项目中使用 PUT 方法是合理的，但更常见的方式是使用 POST 方法来实现 logout 操作。POST 方法通常用于执行一些不一定幂等的操作，如提交表单、执行登录或者注销等。
 */