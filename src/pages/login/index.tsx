import { StorageKey } from "@/constants";
import useInitialState from "@/hooks/useInitialState";
import { getUserInfoService, loginService } from "@/services/user";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Layout,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import store from "storejs";

type FormData = {
  username: string;
  password: string;
};

export default () => {
  const navigate = useNavigate();
  const { setInitialState } = useInitialState();

  async function handleSubmit(values: FormData) {
    const { username, password } = values;
    message.loading("正在登录", 0);
    const rsp = await loginService({ username, password });
    message.destroy();
    if (rsp.success) {
      store.set(StorageKey.AccessToken, rsp.data.accessToken);
      await fetchUserInfo();
      navigate("/home");
    }
  }

  async function fetchUserInfo() {
    const rsp = await getUserInfoService();
    if (rsp.success) {
      setInitialState({ userInfo: rsp.data, login: true });
    } else {
      message.error(rsp.msg);
      throw Error(rsp.msg);
    }
  }

  return (
    <Layout>
      <Layout.Header className="flex justify-center items-center i">
        <Typography.Title className="pt-0 pb-0 !mb-0 !text-white !leading-none">
          p登录
        </Typography.Title>
      </Layout.Header>
      <Layout.Content className="flex items-center h-[calc(100vh-64px)]">
        <Form
          labelCol={{ span: 4 }}
          className="w-8/12 m-auto"
          onFinish={handleSubmit}
        >
          <Card>
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Row justify="center">
              <Button type="primary" className="bg-[#1677ff]" htmlType="submit">
                提交
              </Button>
              <Link to="/registry">
                <Button type="link">去注册</Button>
              </Link>
            </Row>
          </Card>
        </Form>
      </Layout.Content>
    </Layout>
  );
};
