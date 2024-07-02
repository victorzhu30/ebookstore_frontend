import { Table } from "antd";
import {formatTime} from "../utils/time";
import OrderItemList from "./order_item_list";
import {useContext} from "react";
import {UserContext} from "../lib/context";

export default function OrderTable({ orders }) {
    const user = useContext(UserContext);

    const columns = [
        { title: '收货人', dataIndex: 'receiver', key: 'receiver', },
        { title: '联系方式', dataIndex: 'tel', key: 'tel', },
        { title: '收货地址', dataIndex: 'address', key: 'address', },
        {
            title: '下单时间', dataIndex: 'createdAt', key: 'createdAt',
            render: (time) => formatTime(time)
        },
    ];

    const adminColumns = [
        { title: '收货人', dataIndex: 'receiver', key: 'receiver', },
        { title: '联系方式', dataIndex: 'tel', key: 'tel', },
        { title: '收货地址', dataIndex: 'address', key: 'address', },
        {
            title: '下单时间', dataIndex: 'createdAt', key: 'createdAt',
            render: (time) => formatTime(time)
        },
        { title: '用户ID',dataIndex: 'userId', key: 'userId' },
    ];

    return <Table
        columns={user?.isAdmin ? adminColumns : columns}
        /*
        Cannot read properties of null (reading 'isAdmin')
        TypeError: Cannot read properties of null (reading 'isAdmin')
         at OrderTable (http://localhost:3000/static/js/bundle.js:2103:19)
         */
        expandable={{
            expandedRowRender: (order) => (
                <OrderItemList orderItems={order.orderItems} />
            ),
        }}
        dataSource={orders.map(order => ({
            ...order,
            key: order.id
        }))}
    />
    /*
    Ant Design 的 Table 组件默认是支持分页的，但分页的行为需要根据您的需求进行配置。
    通过使用 pagination 属性，您可以很容易地控制分页特性。
    默认情况下，Table 组件会自动分页，并且默认分页条数是 10 条。
     */
}