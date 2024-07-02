import {Button, Form, Input, Modal} from "antd";
import useMessage from "antd/es/message/useMessage";
import {handleBaseApiResponse} from "../utils/message";
import {submitOrder} from "../service/order";
import TextArea from "antd/es/input/TextArea";

export default function OrderModal ({ handleOk, handleCancel, selectedItems} ) {
    console.log(selectedItems);

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();

    const handlesubmitOrder = async ({ address, receiver, tel }) => {
        if (!address || !receiver || !tel) {
            messageApi.error("请填写完整信息！");
            return;
        }

        let orderInfo = {
            ids:selectedItems.map(item => item.id),
            // cart_item表中的id
            address,
            receiver,
            tel,
            numbers: selectedItems.map(item => item.number),
            // 每本书的数量
            itemIds: selectedItems.map(item => item.book.id)
            // book表中的id
        }
        console.log(orderInfo);
        let res = await submitOrder(orderInfo);
        handleBaseApiResponse(res, messageApi, handleOk);
    }

    return (
        <Modal
        open
        title="请填写订单信息"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        >
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={handlesubmitOrder}
                preserve={false}
            >
                <Form.Item
                    name="receiver"
                    label="收货人"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="tel"
                    label="联系电话"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="收货地址"
                    required
                >
                    <TextArea rows={2} maxLength={100} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
