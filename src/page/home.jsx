import {searchBooks} from "../service/book";
import {Button, Card, Col, Space} from "antd";
import BookList from "../components/book_card_list";
import { Input } from 'antd';
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom"

const { Search } = Input;

export default function HomePage() {
    // const [books, setBooks] = useState([]);
    // console.log(books);
    const [books, setBooks] = useState([]);
    console.log(books);

    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    /*
    searchParams.get("keyword")尝试从URL的查询参数中获取名为keyword的值。如果这个查询参数存在，它的值将被赋给keyword变量。
    如果不存在（即get("keyword")返回null或undefined），则利用逻辑OR运算符||，将keyword的值设为一个空字符串""
     */

    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 8;

    const getBooks = async () => {
        console.log(keyword, pageIndex, pageSize);
        let pagedBooks = await searchBooks(keyword,pageIndex, pageSize);
        let books = pagedBooks.items;
        let totalPage = pagedBooks.total;
        setBooks(books);
        setTotalPage(totalPage);

        // const start = (currentPage - 1) * pageSize;
        // const end = start + pageSize;
        // setBooks(books);
        // setCurrentBooks(books.slice(start, end));
    }

    useEffect(() => {
        getBooks();
    }, [keyword, pageIndex]);

    const handleSearch = (value) => {
        setSearchParams({
            keyword: value,
        });
        setPageIndex(0);
    }
    /*
    更新URL的查询参数的：
    传入一个对象到 setSearchParams 函数，该对象定义了要设置或更新的查询参数及其值。在
    这个例子中，对象只有一个属性 { keyword: value }，意味着要设置或更新名为 keyword 的查询参数，其值为 value。
    当这个函数被调用时，React将会修改当前页面URL的查询字符串，添加或更新 keyword 参数为提供的 value。
    例如，如果 value 是 "example", 页面的URL可能会从 http://example.com/search 变为 http://example.com/search?keyword=example。
    这个过程是平滑的，不会导致页面刷新，使得用户在应用内的导航体验更加连贯。
     */

    const handlePageChange = (pageIndex) => {
        setPageIndex(pageIndex - 1);
    }

    // `onChange` 是 Ant Design 的 `Pagination` 组件的一个属性，它被用于设置一个手柄或函数，当页码改变时这个函数会被调用。
    // 这个函数默认接收两个参数：`page` 和 `pageSize`。`page` 代表新选中（或者说，用户切换到）的页码，`pageSize` 代表每页的项目数量。
    // 在大多数情况下，我们只需要用到 `page` 参数，因为 `pageSize` 通常在我们设置分页组件时就已经定义好了。

    // 因此在 `handlePageChange` 函数中，你可以接收一个参数，它代表用户切换到的新页码：
    // 然后主动设置当前页码 `currentPage` 为用户选择的新页码。接着， `useEffect` 就会根据新的 `currentPage` 更新 `currentBooks` ，以显示对应页码的书籍。

    return (
        <Card className="card-container">
            <Col>
                <Space
                    direction="vertical"
                    size="large"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItemstems: 'center',
                    }}>
                    <Search placeholder="输入关键字"  onSearch={handleSearch} enterButton size="large" />
                    <BookList books={books} pageSize={pageSize} current={pageIndex+1} total={totalPage} onPageChange={handlePageChange}/>
                </Space>
            </Col>
        </Card>
    );
}