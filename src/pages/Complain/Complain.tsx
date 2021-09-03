import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

import "./Complain.css";

import {
	IonBackButton,
	IonButtons,
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
import ComplainForm from "./ComplainForm";

const Complain = () => {
	// const [current, setCurrent] = useState(0);
	// const [dataPreview, setDataPreview] = useState([]);

	// const next = () => {
	// 	setCurrent(current + 1);
	// };

	// const prev = () => {
	// 	setCurrent(current - 1);
	// };

	// const steps = [
	// 	{
	// 		content: (
	// 			<UploadFileTab
	// 				dataPreview={dataPreview}
	// 				setDataPreview={setDataPreview}
	// 				next={next}
	// 				prev={prev}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		content: (
	// 			<ComplainTab
	// 				dataPreview={dataPreview}
	// 				setDataPreview={setDataPreview}
	// 				next={next}
	// 				prev={prev}
	// 			/>
	// 		),
	// 	},
	// ];

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>Complain</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard style={{ padding: "10px" }}>
					<ComplainForm />
					{/* <Steps current={current}>
						{steps.map((item, key) => (
							<Steps.Step key={`step_${key}`} />
						))}
					</Steps>

					<div className="steps-content">{steps[current].content}</div> */}
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Complain;
