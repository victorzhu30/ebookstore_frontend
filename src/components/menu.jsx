import {
    ReadOutlined,
    ShoppingCartOutlined,
    FileSearchOutlined,
    UserOutlined,
    UserSwitchOutlined,
    UnorderedListOutlined,
    FileAddOutlined,
    AreaChartOutlined, AccountBookOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../lib/context";

const ordinaryNavItems = [
    { label: "Books", value: "/" , icon: <ReadOutlined />},
    { label: "My Cart", value: "/cart", icon: <ShoppingCartOutlined />},
    { label: "My Order", value: "/order", icon: <FileSearchOutlined />},
    { label: "My Profile", value: "/profile", icon: <UserOutlined />},
    { label: "Count", value: "/count", icon: <AccountBookOutlined />}
];

const ordinaryNavMenuItems = ordinaryNavItems.map(item => ({
    key: item.value,
    label: <Link to={item.value}>{item.label}</Link>,
    icon: item.icon
}));

const adminNavItems = [
    { label: "Books", value: "/" , icon: <ReadOutlined />},
    { label: "All Users", value: "/alluser", icon: <UserSwitchOutlined />},
    { label: "All Orders", value: "/allorder", icon: <UnorderedListOutlined />},
    { label: "Add Books", value: "/addbook", icon: <FileAddOutlined />},
    { label: "Rank", value: "/rank", icon: <AreaChartOutlined />},
];
const adminNavMenuItems = adminNavItems.map(item => ({
    key: item.value,
    label: <Link to={item.value}>{item.label}</Link>,
    icon: item.icon
}));
// const user = useContext(UserContext); ×
/*
这个ESLint错误出现，表示你正在尝试在React组件的顶部层级（也就是非函数组件或者自定义Hook函数之外）调用useContext这个React Hooks函数。
根据React Hooks的规则，我们不能在React组件的顶层代码或者非React函数中使用Hook。Hook的调用必须在React函数组件内部，或者在你自定义的Hook函数里。以下条件就不能使用Hook：
不在React函数组件中调用Hook
不在自定义Hook函数中调用Hook
在条件、循环或者嵌套函数中调用Hook
 */
export default function BookstoreMenu(){
    const user = useContext(UserContext);
    if (user?.isAdmin) {
        return (
            <Menu mode="vertical" items={adminNavMenuItems} style={{ fontSize: '18px' }}/>
        );
    }
    else {
        return (
            <Menu mode="vertical" items={ordinaryNavMenuItems} style={{ fontSize: '18px' }}/>
        );
    }
};