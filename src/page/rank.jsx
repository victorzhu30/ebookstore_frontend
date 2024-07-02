// import React from 'react';
// import { Line } from '@ant-design/charts';
//
// const RankPage = () => {
//     const data = [
//         { year: '1991', value: 3 },
//         { year: '1992', value: 4 },
//         { year: '1993', value: 3.5 },
//         { year: '1994', value: 5 },
//         { year: '1995', value: 4.9 },
//         { year: '1996', value: 6 },
//         { year: '1997', value: 7 },
//         { year: '1998', value: 9 },
//         { year: '1999', value: 13 },
//     ];
//     const config = {
//         data,
//         height: 400,
//         xField: 'year',
//         yField: 'value',
//         point: {
//             size: 5,
//             shape: 'diamond',
//         },
//     };
//     return <Line {...config} />;
// };
// export default RankPage;

import {Button, Card, DatePicker, Form, Space} from "antd";
import BookRankChart from "../components/book_rank_chart";
import { useEffect, useState } from "react";
import { getTop10BestSellingBooks } from "../service/book";
import {getUsersCosts} from "../service/user";
import CostRankChart from "../components/cost_rank_chart";

export default function RankPage() {
    const { RangePicker } = DatePicker;
    const [books, setBooks] = useState([]);
    const [costs, setCosts] = useState([]);
    const [form1,form2] = Form.useForm();
    /*
    在这段代码中，`const [form] = Form.useForm();`是React Hooks中的一种用法。
    1. `Form.useForm()`是Ant Design中提供的一个用于创建表单对象的方法。
    2. 当你调用`Form.useForm()`时，它返回一个包含以下属性和方法的对象：
       - `form`：表示表单对象，通过它可以访问表单的状态和方法。
       - 其他一些方便构建和验证表单的方法。
    3. `const [form] = Form.useForm();`是使用数组解构的方式，通过将`Form.useForm()`返回的对象解构赋值给`form`变量。这么做的好处是可以在代码中直接访问`form`变量，而不需要通过`Form.useForm()`来获取该对象。
    4. 在这段代码中，创建了一个表单对象`form`，并将其与`Form`组件绑定。这样，该表单对象将被用于处理表单中的输入、提交等操作，以便与其他表单元素进行交互和处理用户输入。
     */

    /*
    当你注释掉其中一个表单后，按钮可以正常工作的原因可能是因为多个表单共享同一个`form`对象导致的。在React中，当多个表单使用同一个`form`对象时，可能会导致表单状态混乱或者事件冲突，从而影响按钮的点击事件响应。

    具体来说，当你的两个表单都使用了同一个`form`对象时，这个`form`对象会被同时绑定到多个表单元素上。当你点击一个按钮提交表单时，由于多个表单元素共享同一个`form`对象，可能会导致表单状态在刷新时出现问题，从而影响按钮的响应。

    通过注释掉其中一个表单后，只有一个表单绑定了`form`对象，这样避免了多个表单共享同一个状态的情况，可能使得按钮可以正常工作。

    要解决这个问题，你可以尝试以下方法：
    1. 给不同的表单元素使用不同的`form`对象，即在每个表单中分别使用不同的`Form.useForm()`来创建独立的表单对象，避免共享状态的情况。
    2. 如果需要共享表单状态，可以考虑使用不同的状态变量来管理不同的表单数据，而不是共享一个表单对象。
     */

    // undefined
    // null
    // [Moment, Moment]
    const handleBookQuerySubmit = async (values) => {
        console.log(values);
        console.log(values['bookDateRange']);
        if (values['bookDateRange'] === undefined || values['bookDateRange'] === null) {
            let books = await getTop10BestSellingBooks();
            console.log(books);
            setBooks(books);
        }

        else {
            let startDate = values['bookDateRange'][0].format('YYYY-MM-DD');
            let endDate = values['bookDateRange'][1].format('YYYY-MM-DD');
            console.log(startDate, endDate);
            let books = await getTop10BestSellingBooks(startDate, endDate);
            console.log(books);
            setBooks(books);
        }
    }

    const handleCostQuerySubmit = async (values) => {
        console.log(values);
        console.log(values['costDateRange']);
        if (values['costDateRange'] === undefined || values['costDateRange'] === null) {
            let userCosts = await getUsersCosts();
            console.log(userCosts);
            setCosts(userCosts);
        }

        else {
            let startDate = values['costDateRange'][0].format('YYYY-MM-DD');
            let endDate = values['costDateRange'][1].format('YYYY-MM-DD');
            console.log(startDate, endDate);
            let userCosts = await getUsersCosts(startDate, endDate);
            console.log(userCosts);
            setCosts(userCosts);
        }
    }

    const initRankings = async () => {
        let books = await getTop10BestSellingBooks();
        let costs = await getUsersCosts();
        setBooks(books);
        setCosts(costs);
    }

    useEffect(() => {
        console.log(books);
        initRankings();
    }, []);


    return (
        <Card className="card-container">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Form layout={"inline"} form={form1} onFinish={handleBookQuerySubmit}>
                    <Form.Item name="bookDateRange">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">书籍销量Top10</Button>
                    </Form.Item>
                </Form>
                <BookRankChart books={books} />
                <Form layout={"inline"} form={form2} onFinish={handleCostQuerySubmit}>
                    <Form.Item name="costDateRange">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">用户累计消费排行</Button>
                    </Form.Item>
                </Form>
                <CostRankChart costs={costs}  />
            </Space>
        </Card>
    );
}