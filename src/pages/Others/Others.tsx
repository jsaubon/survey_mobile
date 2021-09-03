import { settingsOutline } from "ionicons/icons";
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonCard,
	IonBackButton,
} from "@ionic/react";
import { List } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./Others.css";

const Others = () => {
	let history = useHistory();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>Others</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard style={{ padding: "10px" }}>OTHERS</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Others;
