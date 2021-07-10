import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import "./Application.css";

const Application = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Application</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Application</IonTitle>
					</IonToolbar>
				</IonHeader>
				{/* <ExploreContainer name="Tab 1 page" /> */}
				<div className="container">test</div>
			</IonContent>
		</IonPage>
	);
};

export default Application;
