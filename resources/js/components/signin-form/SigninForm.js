import React from "react";
import {Form, Icon, Input, Button, message} from "antd";

import "./signin-form.scss";
import {useMutation} from "@apollo/react-hooks";
import {useDispatch} from "react-redux";
import {storeUser} from "../../actions/auth-actions/actions";
import {LOGIN_USER} from "../../actions/auth-actions/mutations";

const SigninForm = props => {
  const { getFieldDecorator } = props.form;
  const dispatch = useDispatch();
    const [loginUser, { loading,data }] = useMutation(LOGIN_USER);


    const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
          await loginUser({
              variables:{
                  email:values.email,
                  password:values.password
              }
          });
          if(loading){
              message.loading('logging in...');
          }
          if(data){
              props.form.resetFields();
              dispatch(storeUser(data.login));
          }



      }
    });
  };

  return (
    <Form className="signin-form" onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator("email", {
          rules: [{ required: true, message: "Please input your email!" }]
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button loading={loading} disabled={loading} size={'large'} type="primary" htmlType="submit" className="submit-button">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedSigninForm = Form.create({ name: "normal_login" })(SigninForm);

export default WrappedSigninForm;
