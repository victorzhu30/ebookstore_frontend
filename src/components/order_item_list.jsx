import { List, Avatar } from "antd"

export default function OrderItemList({ orderItems }) {
    return <List
        dataSource={orderItems}
        renderItem={(orderItem, _) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar shape="square" size={80} src={orderItem.book.cover} />}
                    title={orderItem.book.title}
                    description={`数量：${orderItem.number}`}
                />
            </List.Item>
        )}
    />
}
