import {  Card, Typography, Space, Row, Col, Input, Button  } from "antd";
import Uploadavatar from "./upload_avatar";

const { Title} = Typography;
const { TextArea} = Input;

export default function UserProfile({user}) {
    return (
            <Card className="card-container">
                <Typography>
                    <Title>My Profile</Title>
                    <Space direction="vertical">
                        <Title level={2}>Name</Title>
                        <Row justify="start">
                            <Col>
                                <Input placeholder={"姓"} className="profile-input" value={user.firstName}/>
                            </Col>
                            <Col style={{marginLeft: '20px'}}>
                                <Input placeholder={"名"} className="profile-input" value={user.lastName}/>
                            </Col>
                        </Row>
                        <Title level={2}>Email</Title>
                        <Row>
                            <Input placeholder="邮箱账号@邮箱域名" style={{width: '620px', fontSize:'20px'}} value={user.email}></Input>
                        </Row>
                        <Row justify="start">
                            <Col className="profile-notes">
                                <Row>
                                    <Title level={3}>Avatar</Title>
                                </Row>
                                <Row>
                                    <Uploadavatar></Uploadavatar>
                                </Row>
                            </Col>
                            <Col style={{marginLeft:'20px'}}>
                                <Row>
                                    <Title level={3}>Notes</Title>
                                </Row>
                                <Row>
                                    <TextArea rows={5} placeholder="Notes..." style={{width:'500px'}} value={user.introduction}/>
                                </Row>
                            </Col>
                        </Row>
                        <Space size="large" style={{ width: "100%" }}>
                            <Button size="large">Save</Button>
                            <Button type="primary" size="large">Cancel</Button>
                        </Space>
                    </Space>
                </Typography>
            </Card>
    );
}