import { Column } from '@ant-design/plots';
export default function CostRankChart({ costs }) {
    const data = costs.map(cost => ({
        userId: cost.userId,
        cost: cost.cost,
    }));
    const config = {
        data,
        xField: 'userId',
        yField: 'cost',
        label: {
            position: 'top',
            style: {
                fill:'#0000FF',
                opacity: 0.8,
                fontSize: 20,
            },
        },
        xAxis: {
            label: {
                // autoHide: true,
                autoRotate: true,
                title: {
                    text: '用户ID',
                }
            },
        },
        yAxis: {
            label:{
                title: {
                    text: '总消费额',
                }
            }
        },
        meta: {
            title: {
                alias: '用户ID',
            },
            sales: {
                alias: '总消费额',
            },
        },
        style: {
            // 圆角样式
            radiusTopLeft: 60,
            radiusTopRight: 60,

            fill: '#FFA500',
        },
    };
    return <Column {...config} />;
}