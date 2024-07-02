import {Button, Card, DatePicker, Form, Space} from "antd";
import { useEffect, useState} from "react";
import DemoPie from "../components/user_rank_chart";
import {getUserCost} from "../service/user";
import UserStatistic from "../components/statistic"

export default function CountPage() {

    <CountPage />

    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();

    const [userCost, setUserCost] = useState([]);

    // undefined
    // null
    // [Moment, Moment]

    const handleQuerySubmit = async (values) => {
        console.log(values);
        console.log(values['userDateRange']);
        if (values['userDateRange'] === undefined || values['userDateRange'] === null) {
            let userCost = await getUserCost();
            console.log(userCost);
            setUserCost(userCost);
        }

        else {
            let startDate = values['userDateRange'][0].format('YYYY-MM-DD');
            let endDate = values['userDateRange'][1].format('YYYY-MM-DD');
            console.log(startDate, endDate);
            let userCost = await getUserCost(startDate, endDate);
            console.log(userCost);
            setUserCost(userCost);
        }
    }

    const initRankings = async () => {
        let userCost = await getUserCost();
        setUserCost(userCost);
    }

    useEffect(() => {
        console.log(userCost);
        initRankings();
    }, []);


    return (
        <Card className="card-container">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Form layout={"inline"} form={form} onFinish={handleQuerySubmit}>
                    <Form.Item name="userDateRange">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">用户消费统计</Button>
                    </Form.Item>
                </Form>
                <DemoPie infos={userCost}/>
                { userCost.length > 0  && <UserStatistic datas={userCost}/>}
                {/*React 组件应该以大写字母开头命名，也就是说应该是 <UserStatistic />*/}
                {/*在 JavaScript 中，非空数组是 truthy 值，所以即使 userCost 是一个空数组，表达式 userCost && <UserStatistic totalNumber={} totalPrice={}/> 仍然会执行。然而，如果你希望仅当 userCost 非空时才渲染 UserStatistic 组件，则需要检查数组是否有元素。*/}
            </Space>
        </Card>
    );
}