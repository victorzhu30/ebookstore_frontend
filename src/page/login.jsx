import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { LoginLayout } from "../components/loginlayout";
import {login} from "../service/login";
import {handleBaseApiResponse} from "../utils/message";
import useMessage from "antd/es/message/useMessage";
import {Link, useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        let username = values['username'];
        let password = values['password'];

        let res = await login(username, password);
        await handleBaseApiResponse(res, messageApi, () => navigate("/"), () => navigate("/login"))
    }

    return (
        <LoginLayout>
            {contextHolder}
            <LoginFormPage
                backgroundImageUrl="http://localhost:8080/images/zhigengniao.jpg"
                logo="http://localhost:8080/images/booklogo.png"
                title="Login"
                subTitle="电子书城"
                onFinish={onSubmit}
                // values是在 Ant Design 的表单（Form 或 ProForm）组件的 onFinish 属性中，这个表单提交完成时调用的回调函数的参数。
                style={{
                    height: "90vh"
                }}
                containerStyle={{
                    backdropFilter: 'blur(4px)',
                }}
            >
                <ProFormText
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'请输入用户名'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <Link to={"/register"}>新账号？前往注册</Link>
                    <Link
                        style={{
                            float: 'right',
                        }}
                        to={"/forgetpassword"}
                    >
                        忘记密码
                    </Link>
                </div>
            </LoginFormPage>
        </LoginLayout>
    );
};

export default LoginPage;