import { Col, Row, Statistic } from 'antd';
export default function UserStatistic({ datas }) {
    let totalNumber = 0;
    let totalPrice = 0;
    for (let data of datas) {
        totalNumber += data.number;
        totalPrice += data.number * data.price;
    }
    /*
    for...in 循环用于迭代对象的可枚举属性键，而在你的情况中，你需要使用 for...of 循环来正确地迭代数组中的每个元素。
     */
    console.log(totalNumber);
    console.log(totalPrice);

    return (
            <Row gutter={16}>
                {/*gutter 属性*/}
                {/*定义：gutter 属性定义栅格系统中每行中列之间的间距。*/}
                {/*数值：数值 16 表示每列之间的间距是 16 像素。*/}
                <Col span={8}>
                    <Statistic title="购书总本数" value={totalNumber}/>
                </Col>
                <Col span={8}>
                    <Statistic title="总金额 (RMB)" value={totalPrice} precision={2}/>
                </Col>
            </Row>
    )
};