import { useEffect, useState } from "react";
import {Button, Card, DatePicker, Form, Input, Space} from "antd";
import OrderTable from "../components/order_table";
import {getOrders, searchOrders} from "../service/order";

export default function OrderPage() {
    const { RangePicker } = DatePicker;
    const [orders, setOrders] = useState([]);
    const [form] = Form.useForm();
    // const [searchTerm, setSearchTerm] = useState("");
    // const [dateRange, setDateRange] = useState([])

    const initOrders = async () => {
        let orders = await getOrders();
        setOrders(orders);
    }

    const fetchOrders = async (searchTerm, startDate, endDate) => {
        let orders = await searchOrders(searchTerm, startDate, endDate);
        setOrders(orders);
    }

    useEffect(() => {
        initOrders();
    }, []);

    /*
    undefined & undefined -> initOrders();

    "" & undefined -> initOrders();
    string & undefined -> fetchOrders(searchTerm, startDate, endDate);

    undefined & moment -> fetchOrders(searchTerm, startDate, endDate);
    undefined & null -> initOrders();

    "" & null -> initOrders();
    "" & moment -> fetchOrders(searchTerm, startDate, endDate);
    string & null -> fetchOrders(searchTerm, startDate, endDate);
    string & moment -> fetchOrders(searchTerm, startDate, endDate);
     */
    const handleOrderQuerySubmit =(values) => {
        console.log(values);
        if (values['searchTerm'] === undefined) {
            if (values['dateRange'] === undefined || values['dateRange'] === null){
                initOrders();
            }
            else {
                let searchTerm = "";
                let dateRange = values['dateRange'];
                let startDate = dateRange[0].format('YYYY-MM-DD');
                let endDate = dateRange[1].format('YYYY-MM-DD');
                /*
                RangePicker组件在用户选择日期范围后返回一个包含两个moment对象的数组，这个数组中的元素分别对应于用户选择的开始和结束日期。
                若用户没有选择日期，RangePicker组件则返回undefined
                将选择的开始和结束日期转化为'YYYY-MM-DD'格式的字符串
                 */
                console.log(searchTerm, dateRange, startDate, endDate);
                fetchOrders(searchTerm, startDate, endDate);
            }
        }
        else if (values['searchTerm'] === "" ) {
            if (values['dateRange'] === null || values['dateRange'] === undefined) {
                initOrders();
            }
            else {
                let searchTerm = "";
                let dateRange = values['dateRange'];
                let startDate = dateRange[0].format('YYYY-MM-DD');
                let endDate = dateRange[1].format('YYYY-MM-DD');
                console.log(searchTerm, dateRange, startDate, endDate);
                fetchOrders(searchTerm, startDate, endDate);
            }
        }
        else if (values['dateRange'] === undefined || values['dateRange'] === null) {
            let searchTerm = values['searchTerm'];
            let dateRange = "";
            let startDate = "";
            let endDate = "";
            console.log(searchTerm, dateRange, startDate, endDate);
            fetchOrders(searchTerm, startDate, endDate);
        }
        else {
            let searchTerm = values['searchTerm'];
            let dateRange = values['dateRange'];
            let startDate = dateRange[0].format('YYYY-MM-DD');
            let endDate = dateRange[1].format('YYYY-MM-DD');
            console.log(searchTerm, dateRange, startDate, endDate);
            fetchOrders(searchTerm, startDate, endDate);
        }
    }

    return (
        <Card className="card-container">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Form layout={"inline"} form={form} onFinish={handleOrderQuerySubmit}>
                    <Form.Item name="searchTerm">
                        <Input placeholder="搜索订单" />
                    </Form.Item>
                    <Form.Item name="dateRange">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
                <OrderTable orders={orders}/>
            </Space>
        </Card>
    );
}