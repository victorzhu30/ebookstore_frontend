import {useEffect, useState} from "react";
import {banUser, getAllUsers} from "../service/user";
import {Button, Card, ConfigProvider, Table} from "antd";
import Column from "antd/es/table/Column";
import useMessage from "antd/es/message/useMessage";
import {handleBaseApiResponse} from "../utils/message";
import { TinyColor } from '@ctrl/tinycolor';

export default function AllUserPage() {
    const [users, setUsers] = useState([]);
    const [messageApi, contextHolder] = useMessage();

    const initUsers = async () => {
        let users = await getAllUsers();
        setUsers(users);
    }

    useEffect(() => {
        initUsers();
    }, []);

    const handleBanUser = async (user) => {
        console.log(user);
        let res = await banUser(user);
        if (res.ok) {
            handleBaseApiResponse(res, messageApi);
            initUsers();
        }
    }

    const colors1 = ['#6253E1', '#04BEFE'];
    const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    return (
        <Card className="card-container">
            {contextHolder}
            <Table dataSource={users.map(user => ({...user, key: user.id}))}>
                <Column title="UserId" dataIndex="id" key="id"/>
                <Column
                    title="Nickname"
                    dataIndex="nickname"
                    key="nickname"
                    render = {(nickname,_) => {
                        return <b>{nickname}</b>
                }}
                />
                <Column
                    title="Balance"
                    dataIndex="balance"
                    key="balance"
                    render = {(balance,_) => {
                        return `${balance}元`
                    }}
                />
                <Column
                    title="Action"
                    dataIndex="isBanned"
                    key="action"
                    render = {(isBanned,user) => {
                        return isBanned
                            ?
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                                            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                                            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                                            lineWidth: 0,
                                        },
                                    },
                                }}
                            >
                            <Button type="primary" size="large" onClick={()=> handleBanUser(user)}>解禁该用户</Button>
                            </ConfigProvider>
                                :
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            colorPrimary: `linear-gradient(135deg, ${colors2.join(', ')})`,
                                            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors2).join(', ')})`,
                                            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors2).join(', ')})`,
                                            lineWidth: 0,
                                        },
                                    },
                                }}
                            >
                            <Button type="primary" size="large" onClick={() => handleBanUser(user)}>禁用该用户</Button>
                            </ConfigProvider>
                    }}
                />
            </Table>
        </Card>
    );
}
/*
- 在React中，当你使用 `onClick={myFun}` 的形式，React会在点击事件发生时自动将事件对象（`event`）传递给 `myFun`。
你不需要显式地在函数定义中接收它，除非你需要在函数体中使用。

- 当你使用 `onClick={myFun(event)}` 的形式时，这其实并不能工作
因为此时你尝试在赋值时立即执行函数 `myFun`，但此时没有 `event` 可用。这实际上通常会导致一个错误。

- 当你使用 `onClick={() => myFun(someData)}` 的形式，你创建了一个新的箭头函数，当点击事件发生时这个新的函数会接收事件对象并执行。
但由于箭头函数内部并没有引用这个事件对象，而是直接调用了 `myFun(someData)`
因此实际上 `myFun` 在执行时并没有接收任何由点击事件产生的事件对象，反而它接收了你提供的 `someData`。

所以在需要传入一些其他的数据（即用户或记录数据）时，应该使用像 `onClick={() => myFun(someData)}` 这样的形式。
这样你可以将你需要的数据传递给函数，而不是与事件相关的数据。
 */

/*
在React中，点击事件产生的事件对象是一个SyntheticEvent实例，SyntheticEvent是React自己实现的跨浏览器原生事件包装器。
它与你在浏览器中的原生事件对象十分相似，但提供了一些额外的好处和功能。
一个点击事件的event对象通常会有如下的属性：
 */