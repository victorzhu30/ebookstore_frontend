import {Button, Col, Image, Input, InputNumber, Modal, Row, Space} from "antd";
import { Divider, Typography } from 'antd';
import {useContext, useState} from "react";
import {UserContext} from "../lib/context";
import {deleteOldBook, onUpdateBookInfo} from "../service/book";
import {handleBaseApiResponse} from "../utils/message";
import useMessage from "antd/es/message/useMessage";
import {useNavigate} from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function BookDetails({ book, onAddCartItem }) {
    const [messageApi, contextHolder] = useMessage();
    const user = useContext(UserContext);
    const [editedBook, setEditedBook] = useState(book);
    const [isEditing, setIsEditing] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const navigate = useNavigate();
    /*
    confirmLoading 是一个用来控制 Modal 组件中 "OK" 按钮加载状态的状态（state）。
    当 Modal 组件正在执行一些异步操作时，例如网络请求或者一些需要等待完成才能关闭的操作，你可以用 confirmLoading 来显示一个加载中的动画，以提示用户正在进行操作。
     */

    const showModal = () => {
        setOpenModal(true);
    }

    const handleOk = async (book) => {
        setConfirmLoading(true);
        // setTimeout(() => {
        //     setOpenModal(false);
        //     setConfirmLoading(false);
        // }, 2000);
        /*
        将 confirmLoading 设置为 true，使得 "OK" 按钮进入加载状态。
        使用 setTimeout 模拟一个异步操作，2秒后关闭 Modal 并将 confirmLoading 设置为 false。
         */
        let res = await deleteOldBook(book);
        handleBaseApiResponse(res, messageApi, () => navigate("/"));
        setOpenModal(false);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpenModal(false);
    }

    const handleChange = (fleid, value) => {
        setEditedBook({
            ...editedBook,
            [fleid]: value
        });
    }

    const handleEditClick = () => {
        setIsEditing(true);
        console.log(editedBook);
        console.log(editedBook.author);
    }

    const handleSaveClick = async () => {
        setIsEditing(false);
        let res = await onUpdateBookInfo(editedBook);
        handleBaseApiResponse(res, messageApi);
    }

    return <Row>
        {contextHolder}
                <Col span={9}>
                    <Image src={book.cover} height={500} />
                </Col>
                <Col span={10}>
                    <Typography>
                        <Title>{book.title}</Title>
                        <Divider orientation="left">基本信息</Divider>
                        {/*onChange={(e) => handleChange(consolg.log(e.target.value))}*/}
                        <Space direction="vertical">
                            <Paragraph>
                                <Space>
                                    作者：{isEditing ? <Input value={editedBook.author} onChange={(e) => {
                                    handleChange("author", e.target.value);
                                    console.log(e.target.value)}} /> : editedBook.author}
                                </Space>
                                {/*
                                由于将条件渲染逻辑直接放在 {isEditing ? ( ... ) : ( ... )} 中时，React 会将这部分代码视为一个块元素（block），导致作者文本与输入框未对齐在同一行。
                                为了让“作者”和输入框或文本在同一行，你可以使用一些 CSS 样式，或采用 <Space> 组件 来确保它们并排显示。
                                /*}

                                {/*
                                为什么在模板字符串中嵌入 JSX 会导致问题？

                                问题示例
                                const isEditing = true;
                                const editedBook = { author: "John Doe" };

                                // 如果使用模板字符串插入 JSX 代码：
                                const element = (
                                  <div>
                                    {`作者：${
                                      isEditing ? <Input value={editedBook.author} /> : editedBook.author
                                    }`}
                                  </div>
                                );

                                // 该输出将是：
                                // <div>作者：[object Object]</div>
                                在上述示例中，当 isEditing 为 true 时，模板字符串中的 <Input /> JSX 将被转化为 Javascript 对象（React 元素），但模板字符串会将其转为字符串形式，即 [object Object]。这就是你看到的问题。

                                正确的做法
                                在 JSX 中直接进行条件渲染，而不是在模板字符串中嵌入 JSX 代码。
                                正确示例
                                const isEditing = true;
                                const editedBook = { author: "John Doe" };

                                const element = (
                                  <div>
                                    作者：{isEditing ? <Input value={editedBook.author} /> : editedBook.author}
                                  </div>
                                );
                                */}
                            </Paragraph>
                            <Paragraph>
                                <Space>
                                    销量：{isEditing ? <InputNumber defaultValue={editedBook.sales} value={editedBook.sales} onChange={(newnumber) => {
                                    handleChange("sales", newnumber)}} /> : editedBook.sales}
                                    {/*
                                    `onChange` 函数的 `value` 参数是由 `InputNumber` 组件生成和传递的。
                                    Ant Design 的 `InputNumber` 组件内部会根据用户的操作（如键盘输入、点击增加/减少按钮等）动态更新数值。
                                    当数值发生变化时，它会调用 `onChange` 属性指定的回调函数，并将新的数值作为参数传递给回调函数。
                                    1. 用户交互：
                                       - 用户在 `InputNumber` 组件中输入数字，或者点击上下按钮改变数值。
                                    2. 组件内部处理：
                                       - `InputNumber` 组件捕获到用户的交互事件，并计算出新的数值。
                                    3. 调用回调函数：
                                       - `InputNumber` 组件然后会调用 `onChange` 属性指定的回调函数，并将新的数值作为 `value` 参数传递给它。

                                    import React, { useState } from 'react';
                                    import { InputNumber } from 'antd';

                                    const App = () => {
                                      const [value, setValue] = useState(1); // 定义 state 变量

                                      // 定义 onChange 函数，当值变化时被调用
                                      const onChange = (value) => {
                                        console.log('changed', value); // 输出新值
                                        setValue(value); // 更新 state
                                      };

                                      return (
                                        <div>
                                          <h1>Ant Design InputNumber</h1>
                                          <InputNumber
                                            min={1}                 // 最小值
                                            max={10}                // 最大值
                                            defaultValue={1}        // 默认值
                                            onChange={onChange}     // 值变化时的回调函数
                                            value={value}           // 当前值
                                          />
                                        </div>
                                      );
                                    };

                                    export default App;

                                    在这个示例中，`onChange` 函数会在 `InputNumber` 的数值发生变化时被调用。具体来说，`value` 参数是以下事件的结果：
                                    - 用户在数字框中手动输入新的数值。
                                    - 用户点击增加或减少按钮（加减号）。
                                    `InputNumber` 组件捕捉到数值的变化并计算出新的数值，随后调用 `onChange` 回调函数并将新的数值作为参数传递给它。

                                    验证和查看 `value` 参数的来源

                                    你可以通过在 `onChange` 回调函数中打印或调试 `value` 参数来查看它的值。这已经在你的代码中做了：
                                    const onChange = (value) => {
                                      console.log('changed', value); // 打印出当前的数值
                                      setValue(value); // 更新应用状态
                                    };

                                    在 Ant Design 中，InputNumber 组件的 onChange 函数默认只接受一个参数，即当前输入的数值。
                                    这个参数是一个数值类型，可以是整数或浮点数，具体取决于 InputNumber 的配置（如 step 属性）。

                                    根据 Ant Design 的官方文档，InputNumber 的 onChange 回调函数的定义如下：
                                    function(value: number | undefined): void
                                    value：当前输入的数值。如果用户删除输入内容，则 value 可能是 undefined。

                                    接受更多参数的情况
                                    尽管 onChange 回调函数默认只接受 value 参数，但在实际应用中，我们可以通过各种方式在 onChange 函数中处理更多的参数。例如，结合事件对象或其他上下文信息，可以实现更复杂的逻辑处理。
                                    示例：处理更多上下文信息
                                    假设你需要在 onChange 函数中处理其他参数，可以通过封装回调函数来实现：

                                    import React, { useState } from 'react';
                                    import { InputNumber } from 'antd';

                                    const App = () => {
                                      const [value, setValue] = useState(1);

                                      const handleChange = (newValue, context) => {
                                        console.log('Input changed:', newValue);
                                        console.log('Additional context:', context);
                                        setValue(newValue);
                                      };

                                      return (
                                        <div>
                                          <h1>Ant Design InputNumber</h1>
                                          <InputNumber
                                            min={1}
                                            max={10}
                                            defaultValue={1}
                                            onChange={(newValue) => handleChange(newValue, { someContext: 'example' })}
                                            value={value}
                                          />
                                        </div>
                                      );
                                    };

                                    export default App;
                                    在这个示例中，handleChange 函数接受两个参数：新的数值和额外的上下文信息。你可以根据需要传递额外的上下文信息来增强回调函数的功能。
                                    */}
                                </Space>
                            </Paragraph>
                            <Paragraph>
                                <Space>
                                    价格：{isEditing ? <InputNumber defaultValue={editedBook.price} value={editedBook.price} onChange={(newnumber) => {handleChange("price", newnumber)}} /> : editedBook.price}元
                                </Space>
                            </Paragraph>
                            <Paragraph>
                                <Space>
                                    库存量：{isEditing ? <InputNumber defaultValue={editedBook.stock} value={editedBook.stock} onChange={(newnumber) => {handleChange("stock",newnumber)}} /> : editedBook.stock}
                                </Space>
                            </Paragraph>
                            <Paragraph>
                                <Space>
                                    ISBN：{isEditing ? <Input value={editedBook.isbn} onChange={(e) => {
                                    handleChange("isbn", e.target.value)}} /> : editedBook.isbn}
                                </Space>
                            </Paragraph>
                        </Space>
                        <Divider orientation="left">作品简介</Divider>
                        <Paragraph>
                            {editedBook.description}
                        </Paragraph>
                        <Space size="large" style={{ width: "100%" }}>
                            {/*。对于嵌套在这一 Space 组件中的所有子组件，如 <div>、<Space>，都将遵循这一垂直排列方式。*/}
                            <Button size="large" onClick={onAddCartItem}>加入购物车</Button>
                            <Button type="primary" size="large">立即购买</Button>
                            {user?.isAdmin && (
                                isEditing ? <Button size="large" type="primary" onClick={() => {handleSaveClick(editedBook)}}>保存</Button> :
                                <Button size="large" type="primary" onClick={handleEditClick}>编辑</Button>
                            )}
                            {/*<Input defaultValue="hahaha" onChange={(e) => {*/}
                            {/*    console.log(e.target.value)}}/>*/}

                            {/* 这一逻辑被放在 JSX 表达式中，而不是作为独立的 JavaScript 逻辑*/}
                            {/*
                            `&&` 作为条件渲染的写法是 JSX 中的常见用法。
                            在 JSX 中，任何花括号 `{}` 内的 JavaScript 表达式都可以被执行并且其结果会被渲染。
                            因此，要进行条件渲染，你需要将 `&&` 逻辑包裹在 `{}` 内。
                            JSX 中的条件渲染示例
                            使用 `&&` 运算符进行条件渲染
                            function MyComponent({ user }) {
                              return (
                                <div>
                                  {user?.isAdmin && <button>编辑</button>}
                                </div>
                              );
                            }
                            使用三元运算符进行条件渲染
                            三元运算符 `condition ? expr1 : expr2` 也可以用于条件渲染，提供更复杂的条件渲染逻辑：
                            function MyComponent({ user }) {
                              return (
                                <div>
                                  {user ? (
                                    user.isAdmin ? (
                                      <button>编辑</button>
                                    ) : (
                                      <span>非管理员用户</span>
                                    )
                                  ) : (
                                    <span>用户未登录</span>
                                  )}
                                </div>
                              );
                            }
JSX 是 JavaScript 语法扩展，因此它允许在模板中无缝地使用 JavaScript 表达式。花括号 `{}` 是用来区分 JavaScript 表达式和常规文本的。任何放在 `{}` 中的内容都会作为普通的 JavaScript 表达式进行执行并渲染结果。
为了条件渲染你需要将表达式放在 `{}` 中，这样 JSX 才会将其识别为 JavaScript 逻辑，并根据结果进行渲染。无论是使用 `&&` 还是三元运算符，花括号 `{}` 是必要的。
                            */}
                            {user?.isAdmin && <Button size="large" type="primary" danger onClick={showModal}>删除此书</Button>}
                            <Modal
                                title="删除确认"
                                open={openModal}
                                confirmLoading={confirmLoading}
                                onOk={()=>handleOk(book)}
                                onCancel={handleCancel}
                                okText="确定"
                                cancelText="取消"
                            >
                                <p>确定要删除此书吗？</p>
                            </Modal>
                            {/*批量删除*/}
                        </Space>
                    </Typography>
                </Col>
            </Row>
}

/*
这两种写法在功能上是等效的，但它们在语法上略有不同。为了便于理解，下面分别解释这两种方式：

### 写法一：使用方括号

const handlePriceChange = (value) => {
    setEditedBook({
        ...editedBook,
        ["price"]: value
    });
};

#### 解释：
- 方括号 `[]` 中的内容是动态属性名称，在 ES6 中称为**计算属性名**。在这个例子中，`"price"` 是一个静态字符串，因此它可以直接放在方括号中。
- 这种写法在需要动态属性名称时非常有用，例如当属性名存储在变量中时。

### 写法二：使用点语法

const handlePriceChange = (value) => {
    setEditedBook({
        ...editedBook,
        price: value
    });
};

#### 解释：
- 点语法是直接使用属性名 `price` 赋值。如果属性名是已知的、静态的，这是更常见且更简洁的写法。

### 哪种更好？

在这种特定情况下，两种方式效果相同。因为 `"price"` 是一个固定的属性名称，所以你可以使用任意一种方式。然而，在代码简洁性和可读性方面，第二种方法通常是首选的。

### 何时使用方括号的计算属性名？

方括号通常用于属性名动态生成的情况。例如，当属性名存储在一个变量中或需要动态计算时：

const key = 'price';
const handlePriceChange = (value) => {
    setEditedBook({
        ...editedBook,
        [key]: value
    });
};


在这个例子中，属性名存储在 `key` 变量中，而不是直接写成字符串。这种情况下，你必须使用方括号。

### 总结

为了简洁和可读性，如果属性名是已知的、固定的，建议使用点语法：
如果属性名是动态的或存储在变量中，请使用方括号语法：
这样，根据需求选择适当的语法会让你的代码更加清晰和易于维护。
 */