
import React from 'react';
import {Card, Button, Form, Input, InputNumber, Radio, Col,} from 'antd';
import useMessage from "antd/es/message/useMessage";
import {addNewBook} from "../service/book";
import {useNavigate} from "react-router-dom";
import {handleBaseApiResponse} from "../utils/message";
const { TextArea } = Input;

export default function AddBookPage() {
    const [isStock, setIsStock] = React.useState(false);
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();

    const handleAddBook = async (values) => {
        let stock = 0;
        if (values['stock'] === "true") {
            stock = values['stocknumber'];
        }
        const newbook = {
            title: values['title'],
            author: values['author'],
            cover: values['cover'],
            price: values['price'],
            stock: stock,
            isbn: values['isbn'],
            description: values['description'],
            sales: 0
        }
        // 校验数据
        console.log(newbook);
        let res = await addNewBook(newbook);
        handleBaseApiResponse(res, messageApi, ()=>navigate('/'));
    }

    return (
            <Card className="card-container">
                {contextHolder}
                    <Form
                        labelCol={{
                            span: 12,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        layout="horizontal"
                        // layout="vertical"
                        style={{
                            maxWidth: 800,
                            marginTop:'50px'
                        }}
                        onFinish={handleAddBook}
                        // Form 组件的 onFinish 属性设置了表单提交后的回调函数
                    >
                        <Form.Item name="title" label={<p style={{fontSize:'20px'}}>书名</p>}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="author" label={<p style={{fontSize:'20px'}}>作者</p>}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="cover" label={<p style={{fontSize:'20px'}}>封面</p>}>
                            <Input placeholder="请上传封面图片后输入URL"></Input>
                        </Form.Item>
                        <Form.Item label={<p style={{fontSize:'20px'}}>推荐使用图像托管服务</p>}>
                            <a href="https://postimages.org/" target="_blank" style={{fontSize:'20px'}}>Postimages</a>、
                            <a href="https://picui.cn/" target="_blank" style={{fontSize:'20px'}}>PICUI</a>、
                            <a href="https://sm.ms/" target="_blank"style={{fontSize:'20px'}}>SM.MS</a>、
                            <a href="https://imgbb.com/" target="_blank" style={{fontSize:'20px'}}>IMGBB</a>
                        </Form.Item>
                        <Form.Item name="price" label={<p style={{fontSize:'20px'}}>价格/元</p>}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name="stock" label={<p style={{fontSize:'20px'}}>是否有库存</p>} >
                            <Radio.Group>
                                <Radio style={{fontSize:'20px'}} value="true" onClick={()=>{setIsStock(true)}}>是</Radio>
                                <Radio style={{fontSize:'20px'}} value="false" onClick={()=>{setIsStock(false)}}> 否 </Radio>
                            </Radio.Group>
                        </Form.Item>
                        {isStock && <Form.Item name="stocknumber" label={<p style={{fontSize:'20px'}}>库存量</p>}>
                            <InputNumber min={1} />
                        </Form.Item>}
                        <Form.Item name="isbn" label={<p style={{fontSize:'20px'}}>ISBN</p>}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label={<p style={{fontSize:'20px'}}>作品简介</p>}>
                            <TextArea showCount maxLength={300} rows={6} />
                        </Form.Item>
                        <Form.Item  wrapperCol={{
                            span: 20,
                            offset: 12,
                        }}>
                            <Button type="primary" size="large" htmlType="submit">提交</Button>
                            {/*在 HTML 中，按钮元素 <button> 的 type 属性可以有几个值，其中一个值是 "submit"。
                            当一个按钮的 type 属性被设置为 "submit" 时，点击这个按钮会触发表单的提交事件。
                            在 Ant Design 中，Button 组件的 htmlType 属性实际上是对原生 HTML type 属性的一个封装：
                            htmlType="submit" 等价于 HTML 中的 <button type="submit">*/}
                        </Form.Item>
                    </Form>
            </Card>
    );
};
/*
在 Ant Design 的 `Form` 组件中，`labelCol` 和 `wrapperCol` 是用来控制表单布局的两个属性。
它们主要用于设置表单项的标签和输入控件的栅格布局（Grid layout）。

`labelCol` 用于设置表单项标签的栅格布局。它定义了标签所占的列数。通过设置这个属性，你可以指定标签在每行中占用的栅格宽度。

`wrapperCol` 用于设置表单项输入控件的栅格布局。它定义了输入控件所占的列数。

示例

假设有一个 24 列的栅格系统，`labelCol` 和 `wrapperCol` 的设置分别会影响标签和输入控件在这一行中各自占用多少列。比如：

import React from 'react';
import { Form, Input, Button } from 'antd';

const DemoForm = () => {
  return (
    <Form
      labelCol={{
        span: 8, // 标签占 8 列
      }}
      wrapperCol={{
        span: 16, // 输入控件占 16 列
      }}
      layout="horizontal"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Username">
        <Input />
      </Form.Item>
      <Form.Item label="Password">
        <Input type="password" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8, // 偏移 8 列，使按钮对齐到右侧输入框的位置
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DemoForm;

在这个例子中：

- `labelCol={{ span: 8 }}` 表示标签（例如 "Username" 和 "Password"）在每行中占用 8 列。
- `wrapperCol={{ span: 16 }}` 表示输入控件（例如 `Input` 和 `Button`）在每行中占用 16 列。
- `Form.Item` 中的 `wrapperCol={{ offset: 8, span: 16 }}` 表示按钮的栅格布局偏移了 8 列（对齐到输入框），并且占用 16 列。

这样可以统一表单中每个项目的布局，标签和输入框会按照指定的列宽进行排列，保证表单布局的一致性。

### 总结

`labelCol` 和 `wrapperCol` 是 Ant Design 表单组件中的布局属性，通过设置它们可以轻松控制标签和输入控件在表单中的排列方式，确保表单的美观和一致性。
 */