import {
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonList,
	IonListHeader,
	IonPage,
	IonSelectOption,
	IonSelect,
	IonTitle,
	IonToolbar,
	IonSlides,
	IonSlide,
} from "@ionic/react";
import "./Application.css";
import { useEffect, useRef, useState } from "react";
import { Steps, Carousel, Card, Button, message } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
const Step = Steps.Step;
const Application = () => {
	const [current, setCurrent] = useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const steps = [
		{
			content: (
				<>
					<Title level={3}>Waiver</Title>
					<Text>
						asdas Waiver Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
						temporibus possimus illo vero provident perspiciatis laudantium eaque ea
						natus soluta, impedit at error. Error distinctio optio excepturi impedit?
						Doloremque, optio? Waiver Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Eius temporibus possimus illo vero provident
						perspiciatis laudantium eaque ea natus soluta, impedit at error. Error
						distinctio optio excepturi impedit? Doloremque, optio?
					</Text>
				</>
			),
		},
		{
			content: (
				<>
					<Title level={3}>Application Form</Title>
				</>
			),
		},
		{
			content: (
				<>
					<Title level={3}>Review & Submit</Title>
				</>
			),
		},
	];

	return (
		<IonPage>
			<IonHeader>
				{/* <IonToolbar> */}
				{/* <IonTitle>Application Form</IonTitle> */}
				{/* </IonToolbar> */}
			</IonHeader>
			<IonContent fullscreen>
				{/* <IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Application</IonTitle>
					</IonToolbar>
				</IonHeader> */}
				{/* <ExploreContainer name="Tab 1 page" /> */}
				{/* <IonTitle>Application</IonTitle> */}
				<div className="container">
					<Steps current={current}>
						{steps.map((item, key) => (
							<Step key={`step_${key}`} />
						))}
					</Steps>
					<div className="steps-content">{steps[current].content}</div>
					<div className="steps-action">
						{current < steps.length - 1 && (
							<Button type="primary" onClick={() => next()}>
								Next
							</Button>
						)}
						{current === steps.length - 1 && (
							<Button
								type="primary"
								onClick={() => message.success("Processing complete!")}
							>
								Done
							</Button>
						)}
						{current > 0 && (
							<Button style={{ margin: "0 8px" }} onClick={() => prev()}>
								Previous
							</Button>
						)}
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Application;
