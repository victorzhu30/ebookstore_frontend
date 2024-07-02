import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { LoginLayout } from "../components/loginlayout";
import {register} from "../service/register";
import {handleBaseApiResponse} from "../utils/message";
import useMessage from "antd/es/message/useMessage";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        if (values['password'] !== values['comfirmpassword']) {
            messageApi.error("两次输入的密码不一致！");
            return;
        }

        let emailPattern = /^[A-Za-z0-9+_.-]+@(.+)$/;
        if (!emailPattern.test(values['email'])) {
            messageApi.error("邮箱格式不正确！");
            return;
        }

        let username = values['username'];
        let password = values['password'];
        let email = values['email'];

        let res = await register(username, password, email);
        await handleBaseApiResponse(res, messageApi, () => navigate("/"),()=>navigate("/register"))
    }
    /*
    Java 提供了一种标准的方式来验证电子邮件地址格式，那就是使用正则表达式。

Pattern pattern = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
Matcher matcher = pattern.matcher("user@email.com");

if (matcher.find()) {
  System.out.println("Email valid");
} else {
  System.out.println("Email invalid");
}


1. `Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$")`：创建一个正则表达式（RegularExpression），用来定义我们期望的字符串格式，也就是电子邮件地址的格式。其中，
   - `^`：表示一行文本的开头
   - `[A-Za-z0-9+_.-]+`：
[]：括号内的字符表示我们可以接受的一组字符，例如 [abc] 就表示只可以接受字母a、b、c。
A-Z：这表示所有大写的英文字母。
a-z：这表示所有小写的英文字母。
0-9：这表示所有的数字。
+_.-：这表示我们接受的特殊字符，包括 +, _, ., -。
所以 A-Za-z0-9+_.- 的含义就是：接受所有的大写字母、小写字母、数字和特殊字符 +_.-。
最后面的 + 符号则表示字符的数量要求。在正则表达式里，+ 表示“一个或多个”，A+ 就表示一个或多个 A.
[A-Za-z0-9+_.-]+ 表示的是“一个或多个（大/小写字母，数字，或特殊字符+_.-）”。
   - `@`：表示电子邮件地址中必须包含一个 @ 符号。
   - `(.+)`：
. (点)：在正则表达式中，点.是一个特殊字符，代表匹配任意一个字符，除了换行符。
+：+号在正则表达式中也是一个特殊字符，表示前面的元素必须出现一次或多次。也就是说它代表了数量，“一个或者多个”。
()：括号在正则表达式中做为分组符号，将一部分正则表达式组合在一起作为一个整体进行处理。
所以(.+)的含义是：匹配任意一个字符，且这个字符可以出现一次或者多次。在你的例子中，它表示"@"后面至少需要有一个字符。
   - `$`：表示一行文本的末尾。

2. `pattern.matcher("user@email.com")`：这句代码使用以上定义的正则表达式来检查字符串 `user@email.com`。返回一个 `Matcher` 对象。
3. `matcher.find()`：这句代码是检查 `user@email.com` 是否满足正则表达式定义的格式。如果满足，返回 `true`，否则返回 `false`。
4. 最后，如果满足邮件地址格式，就打印 `Email valid`，否则打印 `Email invalid`。
如果需要更复杂和精确的电子邮件格式验证，必须使用更复杂的正则表达式或者使用专门的验证库。

此外，还可以使用 Java Mail API 来验证电子邮件：

public boolean isValidEmailAddress(String email) {
   boolean result = true;
   try {
      InternetAddress emailAddr = new InternetAddress(email);
      emailAddr.validate();
   } catch (AddressException ex) {
      result = false;
   }
   return result;
}
     */

    return (
        <LoginLayout>
            {contextHolder}
            <LoginFormPage
                backgroundImageUrl="http://localhost:8080/images/zhigengniao.jpg"
                logo="http://localhost:8080/images/booklogo.png"
                title="Register"
                subTitle="电子书城"
                onFinish={onSubmit}
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
                <ProFormText.Password
                    name="comfirmpassword"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'再次输入密码'}
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码！',
                        },
                        // ({ getFieldValue }) => ({
                        //     validator(_, value) {
                        //         if (!value || getFieldValue('password') === value) {
                        //             return Promise.resolve();
                        //         }
                        //         return Promise.reject('两次输入的密码不一致！');
                        //     },
                        // }),
                        // To be continued...
                    ]}
                />
                <ProFormText
                    name="email"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'请输入邮箱'}
                    rules={[
                        {
                            required: true,
                            message: '请输入邮箱!',
                        },
                    ]}
                />
            </LoginFormPage>
        </LoginLayout>
    );
};

export default RegisterPage;