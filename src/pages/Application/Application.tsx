import {
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonCard,
	IonPage,
	IonBackButton,
	IonButtons,
} from "@ionic/react";

import "./Application.css";
import { useState } from "react";
import { Button, Divider, Steps } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import ApplicationTab from "./ApplicationTab";
import ReviewAndSubmitTab from "./ReviewAndSubmitTab";

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
						Confidential Information" shall mean (i) all information relating to
						Disclosing Party’s products, business and operations including, but
						not limited to, financial documents and plans, customers, suppliers,
						manufacturing partners, marketing strategies, vendors, products,
						product development plans, technical product data, product samples,
						costs, sources, strategies, operations procedures, proprietary
						concepts, inventions, sales leads, sales data, customer lists,
						customer profiles, technical advice or knowledge, contractual
						agreements, price lists, supplier lists, sales estimates, product
						specifications, trade secrets, distribution methods, inventories,
						marketing strategies, source code, software, algorithms, data,
						drawings or schematics, blueprints, computer programs and systems
						and know-how or other intellectual property of Disclosing Party and
						its affiliates that may be at any time furnished, communicated or
						delivered by Disclosing Party to Receiving Party, whether in oral,
						tangible, electronic or other form; (ii) the terms of any agreement,
						including this Agreement, and the discussions, negotiations and
						proposals related to any agreement; (iii) information acquired
						during any tours of Disclosing Party’s facilities; and (iv) all
						other non-public information provided by Disclosing Party whosoever.
						All Confidential Information shall remain the property of Disclosing
						Party
						<Divider />
						<Button type="primary" onClick={() => next()}>
							AGREE
						</Button>
					</Text>
				</>
			),
		},
		{
			content: <ApplicationTab next={next} prev={prev} />,
		},
		{
			content: <ReviewAndSubmitTab next={next} prev={prev} />,
		},
	];

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>DOST Application Form</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard style={{ padding: "10px" }}>
					<Steps current={current}>
						{steps.map((item, key) => (
							<Step key={`step_${key}`} />
						))}
					</Steps>

					<div className="steps-content">{steps[current].content}</div>
				</IonCard>
				{/* <IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Application</IonTitle>
					</IonToolbar>
				</IonHeader> */}
				{/* <ExploreContainer name="Tab 1 page" /> */}
				{/* <IonTitle>Application</IonTitle> */}
				{/* <div className="container"> */}
				{/* <div className="steps-action">
						{current == 1 && current < steps.length - 1 && (
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
					</div> */}
				{/* </div> */}
			</IonContent>
		</IonPage>
	);
};

export default Application;
