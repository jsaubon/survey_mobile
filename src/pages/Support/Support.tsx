import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

import "./Support.css";

import {
	IonCard,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { Button, Steps } from "antd";
import ComplainTab from "./ComplainTab";
import UploadFileTab from "./UploadFileTab";
import { PlusOutlined } from "@ant-design/icons";

const Support = () => {
	const [current, setCurrent] = useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	function handleFinish(value: any) {
		// console.log(value)
		if (value === true) {
			// history.push("/complain");
		} else {
			// form.resetFields();
			// setComplain();
			// setCurrent(current - 1);
		}
	}

	const steps = [
		{
			content: <ComplainTab next={next} prev={prev} />,
		},
		{
			content: <UploadFileTab next={next} prev={prev} />,
		},
	];

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Support</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard style={{ padding: "10px" }}>
					<Steps current={current}>
						{steps.map((item, key) => (
							<Steps.Step key={`step_${key}`} />
						))}
					</Steps>

					<div className="steps-content">{steps[current].content}</div>

					<div className="steps-action">
						{current < steps.length - 1 && (
							<Button type="primary" htmlType="submit">
								Proceed
							</Button>
						)}

						{current > 0 && (
							<Button style={{ margin: "0 8px" }} onClick={() => prev()}>
								Previous
							</Button>
						)}
						{current === steps.length - 1 && (
							<>
								<Button
									type="primary"
									htmlType="button"
									// icon={<PlusOutlined />}
									style={{
										marginRight: "8px",
									}}
									onClick={() => handleFinish(true)}
								>
									Finish
								</Button>

								<Button
									type="ghost"
									htmlType="button"
									icon={<PlusOutlined />}
									onClick={() => handleFinish(false)}
								>
									Create & Add Another
								</Button>
							</>
						)}
					</div>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Support;
