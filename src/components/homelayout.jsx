import {Layout, Space} from "antd";
import UserButton from "./user_button";
import BookstoreMenu from './menu'
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMe} from "../service/user";
import {UserContext} from "../lib/context";
const { Header, Footer, Sider, Content } = Layout;

export function HomeLayout() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const checkLogin = async () => {
        let me = await getMe();
        console.log(me);
        if (!me) {
            navigate("/login");
        } else {
            setUser(me);
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);
    /*
    在 `useEffect` 中，你可以传入一个依赖数组作为第二个参数。这个数组决定了 `useEffect` 配套的副作用函数何时执行。
    - 如果你传入一个空数组 `[]`，则 `useEffect` 中的副作用函数只会在组件第一次渲染（mount）后执行一次，并且在组件销毁（unmount）的时候执行清理工作（如果你有返回一个清理函数）。
      对于这种情况，你可以把 `useEffect` 看作 `componentDidMount` 和 `componentWillUnmount` 生命周期方法的结合。
     */
    console.log(user); // 可以看到user第一次渲染为null，第二次为Object

    return (
        <Layout className="layout">
            <Header className="header">
                <UserButton user={user}></UserButton>
                {/*第一次渲染时user为null，user.balance会报错Cannot read properties of null (reading 'balance') */}
                {/*Problem：user.balance不能及时更新 需要在“/”页刷新*/}
            </Header>
            <Layout>
                <Sider width="20%" theme="light">
                    <div className="bookstoreMenu">
                        <UserContext.Provider value={user}>
                            <BookstoreMenu></BookstoreMenu>
                        </UserContext.Provider>
                    </div>
                </Sider>
                <Content>
                    <UserContext.Provider value={user}><Outlet /></UserContext.Provider>
                </Content>
            </Layout>
            <Footer className="footer">
                <Space direction={"vertical"}>
                    <Link target="_blank" to="https://github.com/victorzhu30">关于作者 Victor Zhu</Link>
                    <div>电子书城 REINS 2024</div>
                </Space>
            </Footer>
        </Layout>
    )
}
/*
如何使用React的Context提供用户状态：

首先，创建一个UserContext：

import React from 'react';
export const UserContext = React.createContext(null);

然后，在父组件中使用`UserContext.Provider`来提供`user`：

import { UserContext } from './UserContext';

// 假设 "user" 是从服务器获取的用户信息，包括 "isAdmin"
function App() {
  const user = // 拉取用户信息的代码;

  return (
        <UserContext.Provider value={user}>
            <YourChildComponent />
        </UserContext.Provider>
    );
}

在子组件中，你可以使用`UserContext.Consumer`或`useContext` Hook来获取`user`：

import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function YourChildComponent() {
    const user = useContext(UserContext);

    return (
        <div>
            {user && user.isAdmin && '您是管理员'}
    );
}
这样 `user` 状态就可以在整个应用中流动，并且在需要的地方（如`YourChildComponent`示例中）进行访问或修改。
现在，只要在`UserContext.Provider`的范围内，我们就可以在任何地方获取到用户数据了。这样我们可以根据用户的 `isAdmin` 来决定是否显示管理功能。
*/