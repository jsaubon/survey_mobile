import { useEffect, useState } from "react";
import { useHistory, Route } from "react-router-dom";
import {
	IonApp,
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonMenu,
	IonMenuButton,
	IonPage,
	IonRouterLink,
	IonRouterOutlet,
	IonTitle,
	IonToolbar,
	useIonToast,
} from "@ionic/react";
import { useQuery } from "react-query";
import axios from "axios";
import getStorage from "../../providers/getStorage";
import setStorage from "../../providers/setStorage";
import moment from "moment";
import { listCircleOutline, newspaperOutline } from "ionicons/icons";
import "./Home.css";
import News from "./News/News";
import Bulletins from "./Bulletins/Bulletins";

const Home = () => {
	const [activeRoute, setActiveRoute] = useState("/home");

	const handleRenderContent = () => {
		if (activeRoute === "/home") {
			return <News />;
		} else if (activeRoute === "/bulletins") {
			return <Bulletins />;
		}
	};

	return (
		<IonPage>
			<IonMenu side="end" contentId="main-content">
				<IonHeader>
					<IonToolbar>
						<IonTitle>Menu</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonList className="ionlist-custom">
						<IonItem>
							<IonIcon icon={newspaperOutline} slot="start" />
							<IonLabel
								onClick={() => setActiveRoute("/home")}
								className={`ionlabel-as-button ${
									activeRoute === "/home" ? "active" : ""
								}`}
							>
								News and Announcement
							</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon icon={listCircleOutline} slot="start" />
							<IonLabel
								onClick={() => setActiveRoute("/bulletins")}
								className={`ionlabel-as-button ${
									activeRoute === "/bulletins" ? "active" : ""
								}`}
							>
								Bulletins
							</IonLabel>
						</IonItem>
					</IonList>
				</IonContent>
			</IonMenu>

			<IonApp id="main-content">{handleRenderContent()}</IonApp>
		</IonPage>
	);
};

export default Home;
