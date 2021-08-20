import { useEffect, useState } from "react";
import { useHistory, Route } from "react-router-dom";
import {
	IonButtons,
	IonCard,
	IonContent,
	IonHeader,
	IonItem,
	IonLabel,
	IonList,
	IonMenuButton,
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

	const {
		data: dataMobileNewsAndAnnouncements,
		isLoading: isLoadingDataMobileNewsAndAnnouncements,
		refetch: refetchDataMobileNewsAndAnnouncements,
		isFetching: isFetchinDataMobileNewsAndAnnouncements,
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

	let history = useHistory();
	const [apiUrl, setApiUrl] = useState("");
	const [apiKey, setApiKey] = useState("");
	const [showNewsModal, setShowNewsModal] = useState<any>({
		show: false,
		data: null,
	});

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
				refetchDataMobileNewsAndAnnouncements();
			}
		}
		return () => {};
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
			return mobileNews.map((news: any, key: any) => {
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
				<IonItem>
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
				<IonCard>
					<IonList>{handleRenderContent()}</IonList>
				</IonCard>
			</IonContent>
		</>
	);
};

export default News;
