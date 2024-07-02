import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
function getBase64(img, callback) {
    // 使用 HTML5 提供的 FileReader API 将图片文件转换为 Base64 编码的字符串
    const reader = new FileReader();

    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    // 调用 FileReader 对象的 readAsDataURL 方法，传入图片文件对象。这将启动读取文件的过程。
    // readAsDataURL 方法会将读取的文件数据编码为 Base64 并生成一个代表这些数据的 URL 字符串。
}
function beforeUpload(file) {
    // 用于上传文件之前进行检查，验证上传的文件是否满足特定的条件。
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    // 检查文件的大小是否小于 2MB（megabytes）。这是通过检查 file.size / 1024 / 1024 < 2 来实现的。file.size 属性给出的是文件大小，单位是字节。将它除以 1024 两次可以把单位转换为 MB。如果文件大于 2MB，那么它会显示一条错误消息，提示用户图片必须小于 2MB
    if (!isLt10M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt10M;
    // 如果这两个条件都满足，函数返回 true，表示文件可以上传。如果任一条件不满足，那么函数返回 false，表示文件不应上传。
    // 这种文件类型和大小的检查在很多文件上传的场景中都是常见的，例如图片上传到网站或者应用，上传前的检查能保证用户上传的文件符合特定的要求。
}
function Uploadavatar() {
    const [loading, setLoading] = useState(false);
    // 标识图片是否正在上传，初始化为false，表示不在上传状态
    const [imageUrl, setImageUrl] = useState();
    // 存储上传图片的URL
    function handleChange(info){
        // 处理文件上传状态的改变
        if (info.file.status === 'uploading') {
            // 判断文件状态是否为 'uploading'（即图片正在上传），如果是，则通过 setLoading(true) 将 loading 状态设置为 true。
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // 判断文件状态是否为 'done'（即图片上传完成），如果是，则调用 getBase64 函数，该函数会将图片文件转换为Base64格式，然后回调函数将 loading 状态设置为 false，并将转换得到的 URL 设置为 imageUrl。
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    }
    function UploadButton() {
        return (
            <button
                style={{
                    border: 0,
                    background: 'none',
                }}
                type="button"
            >
                {loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Upload
                </div>
            </button>
        );
    }

    return (
        <>
            <Upload
                name="avatar"
                listType="picture-card"
                //listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}

            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : (
                    <UploadButton></UploadButton>
                )}
            </Upload>
        </>
    );
}
export default Uploadavatar;