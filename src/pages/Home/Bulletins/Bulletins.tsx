import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
	IonButtons,
	IonCard,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonMenuButton,
	IonRow,
	IonTitle,
	IonToolbar,
	useIonToast,
} from "@ionic/react";
import { useQuery } from "react-query";
import axios from "axios";
import getStorage from "../../../providers/getStorage";
import setStorage from "../../../providers/setStorage";
import moment from "moment";

import noDataImage from "../../../assets/img/no-data.png";

const Bulletins = () => {
	const [present, dismiss] = useIonToast();

	let history = useHistory();
	const [apiUrl, setApiUrl] = useState("");
	const [apiKey, setApiKey] = useState("");
	const [mobileBulletins, setMobileBulletins] = useState([]);

	const { data: dataMobileBulletins, refetch: refetchDataMobileBulletins } =
		useQuery(
			"bulletins",
			() =>
				axios
					.get(`${apiUrl}/api/mobile/mobile_bulletin`, {
						headers: {
							Authorization: apiKey,
						},
					})
					.then((res) => res.data),
			{
				enabled: false,
				retry: 1,
				retryDelay: 500,
				refetchOnWindowFocus: false,
				onSuccess: (res) => {
					console.log("res", res);
					if (res.success) {
						setStorage("bulletins", JSON.stringify(res.data));
						setMobileBulletins(res.data);
					} else {
						present({
							color: "danger",
							position: "middle",
							buttons: [{ text: "hide", handler: () => dismiss() }],
							message: "Connected Failed",
							onDidDismiss: () => console.log("dismissed"),
							onWillDismiss: () => console.log("will dismiss"),
						});
					}
				},
				onError: (err) => {
					present({
						color: "danger",
						position: "middle",
						buttons: [{ text: "hide", handler: () => dismiss() }],
						message: "Connected Failed",
						onDidDismiss: () => console.log("dismissed"),
						onWillDismiss: () => console.log("will dismiss"),
					});

					getStorage("bulletins").then((res: any) => {
						if (res) {
							console.log("failed bulletins", JSON.parse(res));
							setMobileBulletins(JSON.parse(res));
						}
					});
				},
			}
		);

	useEffect(() => {
		getStorage("api_url").then((res) => {
			setApiUrl(res ? res : "");
		});
		getStorage("api_key").then((res) => {
			setApiKey(res ? res : "");
		});
		return () => {};
	}, []);

	useEffect(() => {
		if (apiUrl !== "") {
			if (apiKey !== "") {
				console.log("apiUrl", apiUrl);
				console.log("apiKey", apiKey);
				refetchDataMobileBulletins();
			}
		}
	}, [apiUrl, apiKey]);

	useEffect(() => {
		return history.listen((location) => {
			console.log(`You changed the page to: ${location.pathname}`);
			if (location.pathname === "/home") {
				refetchDataMobileBulletins();
			}
		});
	}, [history]);

	const handleRenderContent = () => {
		if (mobileBulletins.length !== 0) {
			return dataMobileBulletins.data
				.filter(
					(p: any) =>
						moment(p.date_start).unix() <= moment().unix() &&
						moment(p.date_end).unix() >= moment().unix()
				)
				.map((bulletin: any, bulletin_key: any) => {
					return (
						<IonCol>
							<IonCard key={bulletin_key}>
								<img
									alt={bulletin.image_path}
									src={apiUrl + "/" + bulletin.image_path}
								/>
							</IonCard>
						</IonCol>
					);
				});
		} else {
			return (
				<IonCol>
					<IonCard>
						<img alt="no data" src={noDataImage} />
					</IonCard>
				</IonCol>
			);
		}
	};

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Bulletins</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard style={{ padding: "10px" }}>
					<IonGrid>
						<IonRow>{handleRenderContent()}</IonRow>
					</IonGrid>
				</IonCard>
			</IonContent>
		</>
	);
};

export default Bulletins;
