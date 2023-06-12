import { ResponseCode } from "@/constants";
import { registryService } from "@/services/user";
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  Row,
  Typography,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export default () => {
  const navigator = useNavigate();

  async function handleSubmit(values: FormData) {
    const { username, password, phone } = values;
    message.loading("正在注册", 0);
    const rsp = await registryService({ username, password, phone });
    message.destroy();
    if (rsp.code === ResponseCode.OK) {
      message.success("注册成功，请登录");
      navigator("/login");
    } else {
      message.error(rsp.msg);
    }
  }

  return (
    <Layout>
      <Layout.Header className="flex justify-center items-center i">
        <Typography.Title className="pt-0 pb-0 !mb-0 !text-white !leading-none">
          p注册
        </Typography.Title>
      </Layout.Header>
      <Layout.Content>
        <Form
          labelCol={{ span: 4 }}
          className="w-8/12 m-auto"
          onFinish={handleSubmit}
        >
          <Card>
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                { required: true, message: "用户名不能为空" },
                {
                  pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                  message: "非法用户名",
                },
              ]}
              extra="用户名长度为4~16个字符(字母，数字，下划线，减号)"
            >
              <Input placeholder="请输入用户名" autoComplete="off" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: "密码不能为空" },
                {
                  pattern:
                    /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
                  message: "密码不符合规则",
                },
              ]}
              extra="最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
            >
              <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => {
                const password = getFieldValue("password");

                return (
                  <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    rules={[
                      {
                        validator(rule, value, callback) {
                          if (value === password) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject("两次密码不一致");
                          }
                        },
                      },
                    ]}
                    extra="最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
                  >
                    <Input type="password" placeholder="请输入密码" />
                  </Form.Item>
                );
              }}
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                {
                  pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                  message: "非法手机号",
                },
              ]}
            >
              <Input placeholder="请输入手机号"></Input>
            </Form.Item>

            <Row justify="center">
              <Button htmlType="submit" type="primary" className="bg-[#1677ff]">
                注册
              </Button>
            </Row>
          </Card>
        </Form>
      </Layout.Content>
    </Layout>
  );
};
