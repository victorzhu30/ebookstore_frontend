import {handleBaseApiResponse} from "../utils/message";
import {changePassword} from "../service/user";
import {Button, Form, Modal} from "antd";
import useMessage from "antd/es/message/useMessage";
import Password from "antd/es/input/Password";

export default function ChangePasswordModal({ open, onOk, onCancel}) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();
    const handleSubmit = async ({ password, confirm }) => {
        console.log({ password, confirm });
        if (!password || !confirm) {
            messageApi.error("请填写完整信息！");
            return;
        }
        if (password !== confirm) {
            messageApi.error("新密码和确认新密码不一致！");
            return;
        }
        let request = {
            password
        }
        console.log(request);
        // 感觉怪怪的

        let res = await changePassword(request);
        handleBaseApiResponse(res, messageApi, onOk);
    };

    return (
        <Modal
            title={"修改密码"}
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            // 自定义页脚
            // 不需要默认确定取消按钮时，你可以把 footer 设为 null。
            footer={null}
            width={800}
        >
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                preserve={false}
            >
                <Form.Item
                    name="password"
                    label="新密码"
                    required
                >
                    <Password placeholder="请输入新密码" />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="确认新密码"
                    required
                >
                    <Password placeholder="请再次输入新密码" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
/*
在这段代码中，`handleSubmit` 函数的参数是一个解构对象，包括 `password` 和 `confirm` 两个字段。
这种写法是JavaScript的参数解构语法，直接将传入的对象属性解构成局部变量。

这相当于：

const handleSubmit = async (values) => {
    const password = values.password;
    const confirm = values.confirm;
    // ...
};

这样可以简化代码，使得直接使用 `password` 和 `confirm` 变量，而不需要每次都通过 `values['password']` 这样的方式来获取值。

### 更具体的解释

`handleSubmit` 函数被作为表单的 `onFinish` 属性传递给 `Form` 组件。
当表单提交时，Ant Design 的 `Form` 组件会自动调用这个 `onFinish` 函数，并且会将表单中各字段的值作为参数传递进来。
由于表单字段的名称是 `password` 和 `confirm`，因此 `onFinish` 调用的 `handleSubmit` 函数会接收到一个对象，其中包含这两个字段的值：
这时，通过对象解构，可以简单地取用 `password` 和 `confirm` 这两个字段，无需每次都访问整个对象。

### 代码可读性提升

为了更好地理解和熟悉解构赋值的用法，这里提供一个格式化的版本，以便观察和对比：

const handleSubmit = async (values) => {
    const { password, confirm } = values; // 对象解构

    if (!password || !confirm) {
        messageApi.error("请填写完整信息！");
        return;
    }

    if (password !== confirm) {
        messageApi.error("新密码和确认新密码不一致！");
        return;
    }

    let request = {
        password
    };

    let res = await changePassword(request);
    handleBaseApiResponse(res, messageApi, onOk);
};

使用解构赋值的意义在于使代码更加简洁和可读，减少临时变量的声明，也能更直接地操作我们关心的数据。
 */