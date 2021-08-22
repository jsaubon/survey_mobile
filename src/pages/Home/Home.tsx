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
	return (
		<IonPage>
			<IonContent style={{ textAlign: "center" }}>
				<Bulletins />
				<News />
			</IonContent>
		</IonPage>
	);
};

export default Home;
