import { Layout, Space } from 'antd';
import { Content, Footer } from "antd/es/layout/layout";
import React from "react";


export function LoginLayout({ children }) {
    return (
        <Layout className="layout">
            <Content>
                {children}
            </Content>
            <Footer className="footer">
                <Space direction={"vertical"}>
                    <a target="_blank" href="https://github.com/victorzhu30">关于作者 Victor Zhu</a>
                    <div>电子书城 REINS 2024</div>
                </Space>
            </Footer>
        </Layout>
    )
}


