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
import { WhiteSpace, List, Steps, WingBlank, Card, Button } from "antd-mobile";

const Step = Steps.Step;

const Application = () => {
	const slideOpts = {
		initialSlide: 0,
		speed: 400,
		allowTouchMove: false,
		// autoplay: {
		// 	delay: 10000,
		// },
		// centeredSlides: true,
		// loop: true,
	};
	let slider: any | null;

	const handleUpdateSlider = (direction: any) => {
		if (direction == "next") {
			slider.slideNext();
		} else {
			slider.slidePrev();
		}
	};
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
					<WingBlank size="lg">
						<Steps direction="horizontal" current={0}>
							<Step title="Waiver"></Step>
							<Step title="Form"></Step>
							<Step title="Submit"></Step>
						</Steps>
					</WingBlank>
					<WingBlank size="sm">
						<IonSlides pager={false} options={slideOpts} ref={(e) => (slider = e)}>
							<IonSlide>
								<Card style={{ width: "100%" }}>
									<Card.Body>
										<h1>Waiver</h1>
										Waiver Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
										temporibus possimus illo vero provident perspiciatis laudantium eaque
										ea natus soluta, impedit at error. Error distinctio optio excepturi
										impedit? Doloremque, optio? Waiver Lorem ipsum dolor sit amet
										consectetur adipisicing elit. Eius temporibus possimus illo vero
										provident perspiciatis laudantium eaque ea natus soluta, impedit at
										error. Error distinctio optio excepturi impedit? Doloremque, optio?
										<WhiteSpace />
										<Button
											type="primary"
											size="small"
											inline
											icon="right"
											onClick={(e) => handleUpdateSlider("next")}
										>
											Next
										</Button>
									</Card.Body>
								</Card>
							</IonSlide>
							<IonSlide>
								<Card style={{ width: "100%" }}>
									<Card.Body>
										<h1>Application Form</h1>
										<Button
											type="primary"
											size="small"
											inline
											icon="left"
											onClick={(e) => handleUpdateSlider("prev")}
										>
											Prev
										</Button>
										<Button
											type="primary"
											size="small"
											inline
											icon="right"
											onClick={(e) => handleUpdateSlider("next")}
										>
											Next
										</Button>
									</Card.Body>
								</Card>
							</IonSlide>
							<IonSlide>
								<Card style={{ width: "100%" }}>
									<Card.Body>
										<h1>Review and Submit</h1>
										<Button
											type="primary"
											size="small"
											inline
											icon="left"
											onClick={(e) => handleUpdateSlider("prev")}
										>
											Prev
										</Button>
										<Button
											type="primary"
											size="small"
											inline
											icon="check"
											// onClick={(e) => handleUpdateSlider("prev")}
										>
											Submit
										</Button>
									</Card.Body>
								</Card>
							</IonSlide>
						</IonSlides>
						{slider && slider.getActiveIndex()}
					</WingBlank>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Application;
