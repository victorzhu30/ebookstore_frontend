export async function handleBaseApiResponse(res, messageApi, onSuccess, onFail) {
    if (res.ok) {
        console.log(res.message);
        await messageApi.success(res.message, 1.5);
        onSuccess?.();
    } else {
        console.log(res.message);
        await messageApi.error(res.message, 1.5);
        onFail?.();
    }
}