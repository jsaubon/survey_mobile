import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import "./Support.css";

const Support = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Support</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Support</IonTitle>
					</IonToolbar>
				</IonHeader>
				{/* <ExploreContainer name="Tab 1 page" /> */}
				<div className="container">test</div>
			</IonContent>
		</IonPage>
	);
};

export default Support;
