import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Storage } from "@capacitor/storage";
import setStorage from "../../../providers/setStorage";
import getStorage from "../../../providers/getStorage";
const Settings = () => {
  const [formRef] = Form.useForm();
  const handleOnFinish = (values: any) => {
    console.log(values, "test");
    setStorage("api_url", values.api_url).then(
      (res) =>
        res &&
        setStorage("api_key", values.api_key).then((res) =>
          message.success("Settings Successfully Saved")
        )
    );
  };
  useEffect(() => {
    getStorage("api_url").then((res) => {
      console.log(res);
      formRef.setFieldsValue({ api_url: res });
    });
    getStorage("api_key").then((res) => {
      console.log(res);
      formRef.setFieldsValue({ api_key: res });
    });
    return () => {};
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonBackButton defaultHref="/others" />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container">
          <Form onFinish={(values) => handleOnFinish(values)} form={formRef}>
            <Form.Item
              label="Api Url"
              name="api_url"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Api Key"
              name="api_key"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
