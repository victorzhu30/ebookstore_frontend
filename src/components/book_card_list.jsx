import { List, Pagination, Space } from 'antd';
import BookCard from "./book_card";

export default function BookList({books, pageSize, current, total, onPageChange}) {
    return (
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <List
                grid={{
                    gutter: 16, column: 4
                }}
                dataSource={books.map(b => ({
                    ...b,
                    key: b.id,
                }))}
                renderItem={(book) => (
                    <List.Item>
                        <BookCard book={book} />
                    </List.Item>
                )}
            />
            <Pagination current={current} pageSize={pageSize} total={total} onChange={onPageChange}  />
            {/*current：当前处于活动状态的页码 pageSize：每一页展示数据的数量 total:全部数据的数量 onChange：页码改变的回调函数，参数是改变后的页码以及每页展示数据的数量*/}
        </Space>
        );
}



