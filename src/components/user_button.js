import {Col, Row, Button, Dropdown} from "antd";
import { UserOutlined, FormOutlined, AccountBookOutlined, LogoutOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom"
import {logout} from "../service/logout";
import {handleBaseApiResponse} from "../utils/message";
import useMessage from "antd/es/message/useMessage";
import {useState} from "react";
import ChangePasswordModal from "./change_password_modal";

export default function UserButton( {user} ) {
    console.log(user); // 可以看到user第一次渲染为null，第二次为Object

    const [showModal, setShowModal] = useState(false);
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();

    const handleOk = () => {
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    }
    const handleMenuClick = async (e) => {
        // E是一个表示菜单选项的对象，包含了key属性
        if (e.key === "logout") {
            let res = await logout();
            console.log(res);
            handleBaseApiResponse(res, messageApi, () => navigate("/login"));
            return;
        }
        if (e.key === "password") {
            setShowModal(true);
            return;
        }
    }

    const dropMenuItems = [
        {
            key: "password",
            label: "Change Password",
            icon: <FormOutlined />
        },
        {
            key: "balance",
            label: `balance: ${user?.balance }元`,
            /*
            这里的 `?` 符号是JavaScript（有效范围是ES2020及以上版本）中的可选链运算符（Optional Chaining）。
            可选链运算符允许你读取位于连接对象链深处的属性的值，而不必明确验证链中的每一步是否有效。
            在 `user?.balance` 表达式中，`?` 符号前面的 `user` 变量可能是 `undefined` 或 `null`。
            在正常情况下，如果我们试图访问 `undefined` 或 `null` 对象的属性，JavaScript会抛出错误。
            可是如果使用了`?.`运算符，那么当尝试取得的对象确实是`undefined`或`null`时，表达式会立即返回`undefined`，而不会抛出错误。
            如果没有 `?.` 的话，代码 `user.balance / 100` 在 `user` 为 `undefined` 或 `null` 时会导致程序中断并抛出错误。
            所以 `?.` 在这里是为了安全访问`user`对象的`balance`属性。这样，代码就不用担心在`user`未定义的时候会出现错误了，安全很多。
             */
            icon: <AccountBookOutlined />
        },
        {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined />
        }
    ];

    return (
        <Row className="navbar" justify="space-between">
            {contextHolder}
            <Col style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
                <img src="http://localhost:8080/images/owl.jpg" alt="owl" style={{height: '60px', width: '60px'}} />
                <Link to="/">Book Store</Link>
            </Col>
            <Col>
                <Dropdown menu={{ onClick: handleMenuClick, items: dropMenuItems}}>
                    <Button shape="circle" icon={<UserOutlined />} />
                </Dropdown>
            </Col>
            {user && <ChangePasswordModal open={showModal} onOk={handleOk} onCancel={handleCancel}/>}
        </Row>
    );
}