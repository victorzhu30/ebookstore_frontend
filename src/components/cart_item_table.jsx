import {Button, Table, InputNumber, Row, Col, Image} from "antd";
import {useEffect, useState} from "react";
import useMessage from "antd/es/message/useMessage";
import {handleBaseApiResponse} from "../utils/message";
import {changeCartItemNumber, deleteCartItem} from "../service/cart";
import {Link} from "react-router-dom";
import OrderModal from "./order_modal";

export default function CartItemTable ({ cartItems, onMutate }) {
    const [messageApi, contextHolder] = useMessage();
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleDeleteItem = async (id) => {
        let res = await deleteCartItem(id);
        handleBaseApiResponse(res, messageApi, onMutate);
        if (res.ok) {
            setSelectedItems(selectedItems.filter(item => item.id !== id));
        }
    }

    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);


    const computeTotalPrice = () => {

        const prices = selectedItems.map(item => item.book.price * item.number);
        console.log(selectedItems);
        console.log(prices);
        return prices.length > 0 ?
            prices.reduce((prev, cur) => prev + cur) : 0;
    };

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleOk = () => {
        setIsModalOpen(false);
        onMutate();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleNumberChange = async (id, number) => {
        let res = await changeCartItemNumber(id, number);
        if (res.ok) {
            items.filter(item => item.book.id === id)[0].number = number;
            let selected = selectedItems.find(item => item.book.id === id);
            if (selected) {
                selected.number = number;
                setSelectedItems([...selectedItems]);
            }
            setItems([...items]);
        }
    }

    const columns = [
        {
            title: '封面',
            dataIndex: 'book',
            key: 'book_cover',
            render: (book,_) => <img src={book.cover} alt="cover" style={{ width: "50px", height: "50px"}} />
            // render：一个返回React节点的函数，用于自定义该列具体如何渲染。接收三个参数：当前行的值，当前行数据，行索引。
        },
        {
            title: '书名',
            dataIndex: 'book',
            key: 'book_title',
            render: (book, _) => (<Link to={`/books/${book.id}`}>{book.title}</Link>)
        },
        {
            title: '数量',
            dataIndex: 'number',
            key: 'number',
            render: (number, item) => <InputNumber min={1} defaultValue={number} value={item.value}
            onChange={(newnumber) => {
                handleNumberChange(item.book.id,newnumber);
            }}/>
        },
        {
            title: '价格',
            dataIndex: 'book',
            key: 'book_price',
            render: (book, _) => <p>{book.price}元</p>
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'action',
            render: (_, item) => <Button type="primary" onClick={()=>{
                handleDeleteItem(item.id);
            }}>删除</Button>,
        },
    ];

    return (
        <>
            {contextHolder}
            {isModalOpen && <OrderModal handleOk={handleOk} handleCancel={handleCancel} selectedItems={selectedItems} />}
            <Table
                columns={columns}
                rowSelection={
                    {
                        type: 'checkbox',
                        onChange: (selectedRowKeys, selectedRows) => {
                            setSelectedItems(selectedRows);
                        }
                    }
                }
                expandable={{
                    expandedRowRender: (item) => (
                        <Row justify={"space-between"} gutter={8}>
                            {/*gutter属性定义了各个列之间的间距，这里为8个像素。*/}
                            <Col >
                                <Image src={item.book.cover} height={150} />
                                {/*height属性定义了图片的高度，单位是像素。*/}
                            </Col>
                            <Col >
                                <p>{item.book.description}</p>
                            </Col>
                            {/*在Ant Design的网格系统中，行(row)会被划分为24份。这是基于一个网格系统（grid system）的设计*/}
                        </Row>
                    ),
                }}
                dataSource={items.map(item => ({
                    ...item,
                    key: item.id
                }))}
            />
            <p>总价：{computeTotalPrice()}元</p>
            <Button type="primary" disabled={selectedItems.length === 0}
                    onClick={showModal}>立刻下单</Button>
        </>
    );
}