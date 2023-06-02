import { Form, Input, Button, Card, Row, Layout, Typography } from "antd";

export default () => {
  return (
    <Layout>
      <Layout.Header className="flex justify-center items-center i">
        <Typography.Title className="pt-0 pb-0 !mb-0 !text-white !leading-none">
          ChatGPT
        </Typography.Title>
      </Layout.Header>
      <Layout.Content>
        <Form labelCol={{ span: 4 }}>
          <Card>
            <Form.Item label="用户名">
              <Input />
            </Form.Item>
            <Form.Item label="密码">
              <Input type="password" />
            </Form.Item>
            <Row justify="center">
              <Button type="primary" className="bg-[#1677ff]">
                提交
              </Button>
            </Row>
          </Card>
        </Form>
      </Layout.Content>
    </Layout>
  );
};
