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
	IonModal,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { useQuery } from "react-query";
import axios from "axios";
import getStorage from "../../../providers/getStorage";
import setStorage from "../../../providers/setStorage";
// import moment from "moment";

// import noDataImage from "../../../assets/img/no-data.png";
import getApiUrl from "../../../providers/getApiUrl";
import getApiKey from "../../../providers/getApiKey";
import { message } from "antd";

const News = () => {
	const [mobileNews, setMobileNews] = useState([]);

	let history = useHistory();
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
				.get(`${getApiUrl()}/api/mobile/news_and_announcement`, {
					headers: {
						Authorization: getApiKey(),
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
					message.error("Connected Failed");
				}
			},
			onError: (err) => {
				message.error("Connected Failed");

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
		refetchDataMobileNewsAndAnnouncements();

		console.log("getApiUrl()", getApiUrl());
		console.log("getApiKey()", getApiKey());
	}, []);

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
			return (
				<IonCard style={{ padding: "10px" }}>
					<IonList>
						{dataMobileNewsAndAnnouncements.data.map((news: any, key: any) => {
							return (
								<IonItem
									key={key}
									onClick={(e) => setShowNewsModal({ show: true, data: news })}
								>
									<IonLabel>{news.title}</IonLabel>
								</IonItem>
							);
						})}
					</IonList>
				</IonCard>
			);
		} else {
			return "";
		}
	};

	return (
		<>
			{handleRenderContent()}

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
