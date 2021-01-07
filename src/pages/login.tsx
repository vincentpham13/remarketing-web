import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Form, Input, Button, Checkbox,
} from 'antd';
import BaseAppLayout from '@/layouts/BaseAppLayout';

import { authUserAsyncThunk, authSelector } from '@/redux/features/auth';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector(authSelector);

  const onFinish = (values: any) => {
    dispatch(
      authUserAsyncThunk({
        username: values.username,
        password: values.password,
      }),
    );
  };

  const onFinishFailed = () => {};

  useEffect(() => {
    if (auth.status === 'succeeded' && auth.isAuthenticated && auth.token) {
      router.push('/');
    }
  }, [auth]);
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          loading={auth.status === 'loading'}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

Login.getLayout = (page) => <BaseAppLayout>{page}</BaseAppLayout>;

export default Login;
