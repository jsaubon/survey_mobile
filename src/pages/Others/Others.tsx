import { settingsOutline } from "ionicons/icons";
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonIcon,
	IonCard,
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
					<IonButtons slot="end">
						<IonButton onClick={(e) => history.push("/others/settings")}>
							<IonIcon icon={settingsOutline} />
						</IonButton>
					</IonButtons>
					<IonTitle>Others</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard style={{ padding: "10px" }}>
					<List bordered>
						<Link to="/others/surveys">
							<List.Item>Surveys</List.Item>
						</Link>
					</List>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Others;
