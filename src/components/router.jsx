import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as bookLoader } from "../page/book";
import { HomeLayout } from "./homelayout";
import HomePage from "../page/home";
import CartPage from "../page/cart";
import ProfilePage from "../page/profile";
import BookPage from "../page/book";
import LoginPage from "../page/login";
import OrderPage from "../page/order";
import AllUserPage from "../page/alluser";
import AllOrderPage from "../page/allorder";
import RegisterPage from "../page/register";
import AddBookPage from "../page/addbook";
import RankPage from "../page/rank";
import CountPage from "../page/count";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path:"/register",
        element: <RegisterPage />
    },
    {
       path:"/forgetpassword"
    },
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/books/:bookId",
                element: <BookPage />,
                loader: bookLoader,
            },
            {
                path:"/cart",
                element: <CartPage />,
            },
            {
                path: "/order",
                element: <OrderPage />,
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path:"/count",
                element: <CountPage />
            },
            {
                path: "/alluser",
                element: <AllUserPage />
            },
            {
                path: "/allorder",
                element: <OrderPage />
            },
            {
                path: "/addbook",
                element: <AddBookPage />
            },
            {
                path:"/rank",
                element:<RankPage />
            }
        ]
    },
]);
/*
严格来说，useEffect 的执行时间是在 DOM 更新之后，但在浏览器绘制屏幕之前。因此，即使 useEffect 中的代码是异步的，在用户实际看到页面之前，组件会经历一个同步渲染的周期。
不过，关键点在于，现代浏览器和 React 的执行速度非常快，在绝大多数情况下，你不会注意到页面先渲染一次 HomePage 再跳转到 LoginPage。

详细解析
初始渲染阶段：
组件第一次渲染时，React 会先渲染 HomePage，然后渲染其中的 PrivateLayout 组件。
此时，PrivateLayout 组件中的 useEffect 还未运行。
useEffect 启动：
PrivateLayout 完成渲染（即 DOM 更新完成）后，useEffect 会立即执行。
useEffect 中的 checkLogin 函数会启动异步操作，检查用户是否已登录。
异步操作完成：
在 checkLogin 异步操作完成之后，如果用户未登录，调用 navigate("/login")，React 会导航到 LoginPage 并重新渲染。
用户体验
尽管 React 会先渲染一遍 HomePage，然后再跳转到 LoginPage，在用户体验上这几乎不会察觉到页面切换。现代浏览器处理速度非常快，整个过程常常在毫秒级别完成。
进一步改进
为了更直观的用户体验，可以显示一个加载状态，提示用户正在检查登录状态。这种设计避免了页面之间的快速闪烁，更加友好。
 */

export default function AppRouter() {
    return (
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    );
}
