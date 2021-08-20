import {
	IonCard,
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
			<IonContent>
				<IonCard style={{ padding: "10px" }}>
					<p> Support test</p>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Support;
