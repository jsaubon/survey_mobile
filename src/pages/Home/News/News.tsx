import { useEffect, useState } from "react";
import { useHistory, Route } from "react-router-dom";
import {
	IonButton,
	IonButtons,
	IonCard,
	IonContent,
	IonHeader,
	IonItem,
	IonLabel,
	IonList,
	IonMenuButton,
	IonModal,
	IonTitle,
	IonToolbar,
	useIonToast,
} from "@ionic/react";
import { useQuery } from "react-query";
import axios from "axios";
import getStorage from "../../../providers/getStorage";
import setStorage from "../../../providers/setStorage";
import moment from "moment";

const News = () => {
	const [present, dismiss] = useIonToast();

	const [mobileNews, setMobileNews] = useState([]);

	let history = useHistory();
	const [apiUrl, setApiUrl] = useState("");
	const [apiKey, setApiKey] = useState("");
	const [showNewsModal, setShowNewsModal] = useState<any>({
		show: false,
		data: null,
	});

	const {
		data: dataMobileNewsAndAnnouncements,
		refetch: refetchDataMobileNewsAndAnnouncements,
	} = useQuery(
		"news_and_announcements",
		() =>
			axios
				.get(`${apiUrl}/api/mobile/news_and_announcement`, {
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
					setStorage("news_and_announcements", JSON.stringify(res.data));
					setMobileNews(res.data);
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
				getStorage("news_and_announcements").then((res: any) => {
					if (res) {
						console.log("failed news_and_announcements", JSON.parse(res));
						setMobileNews(JSON.parse(res));
					}
				});
				// message.error(JSON.stringify(err));
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
	}, []);

	useEffect(() => {
		if (apiUrl !== "") {
			if (apiKey !== "") {
				console.log("apiUrl", apiUrl);
				console.log("apiKey", apiKey);
				refetchDataMobileNewsAndAnnouncements();
			}
		}
	}, [apiUrl, apiKey]);

	useEffect(() => {
		return history.listen((location) => {
			console.log(`You changed the page to: ${location.pathname}`);
			if (location.pathname === "/home") {
				refetchDataMobileNewsAndAnnouncements();
			}
		});
	}, [history]);

	const handleRenderContent = () => {
		if (mobileNews.length !== 0) {
			return dataMobileNewsAndAnnouncements.data.map((news: any, key: any) => {
				return (
					<IonItem
						key={key}
						onClick={(e) => setShowNewsModal({ show: true, data: news })}
					>
						<IonLabel>{news.title}</IonLabel>
					</IonItem>
				);
			});
		} else {
			return (
				<IonItem
					onClick={(e) =>
						setShowNewsModal({
							show: true,
							data: { content: "No Announcement Yet" },
						})
					}
				>
					<IonLabel>No Announcement Yet</IonLabel>
				</IonItem>
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
					<IonTitle>News and Announcements</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard style={{ padding: "10px" }}>
					<IonList>{handleRenderContent()}</IonList>
				</IonCard>
			</IonContent>

			<IonModal isOpen={showNewsModal.show}>
				<IonHeader>
					<IonToolbar>
						<IonTitle>News and Announcements</IonTitle>
						<IonButtons
							slot="end"
							onClick={() => setShowNewsModal({ show: false, data: null })}
						>
							Close
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<p>{showNewsModal.data != null ? showNewsModal.data?.content : ""}</p>
				</IonContent>
			</IonModal>
		</>
	);
};

export default News;
