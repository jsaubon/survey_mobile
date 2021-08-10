import {
	IonCard,
	IonCardContent,
	IonContent,
	IonHeader,
	IonIcon,
	IonModal,
	IonPage,
	IonSlide,
	IonSlides,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { newspaperOutline } from "ionicons/icons";
import "./Home.css";
import { Button, Card, Carousel, List, message } from "antd";
import Text from "antd/lib/typography/Text";
import { useQuery } from "react-query";
import axios from "axios";
import getStorage from "../../providers/getStorage";
import setStorage from "../../providers/setStorage";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Paragraph from "antd/lib/typography/Paragraph";
import { Link } from "react-router-dom";

const Home = () => {
	const [mobileBulletins, setMobileBulletins] = useState<any>();
	const [mobileNews, setMobileNews] = useState<any>();
	useEffect(() => {
		console.log("mobileNews", mobileNews);
		return () => {};
	}, [mobileNews]);
	const {
		data: dataMobileBulletins,
		isLoading: isLoadingDataMobileBulletins,
		refetch: refetchDataMobileBulletins,
		isFetching: isFetchinDataMobileBulletins,
	} = useQuery(
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
					message.success("success");
					setStorage("bulletins", JSON.stringify(res.data));
					setMobileBulletins(res.data);
				} else {
					message.error("Connected Failed");
				}
			},
			onError: (err) => {
				message.error("Connected Failed");
				getStorage("bulletins").then((res: any) => {
					if (res) {
						console.log("failed bulletins", JSON.parse(res));
						setMobileBulletins(JSON.parse(res));
					}
				});
				// message.error(JSON.stringify(err));
			},
		}
	);

	const {
		data: dataMobileNewsAndAnnouncements,
		isLoading: isLoadingDataMobileNewsAndAnnouncements,
		refetch: refetchDataMobileNewsAndAnnouncements,
		isFetching: isFetchinDataMobileNewsAndAnnouncements,
	} = useQuery(
		"news_and_announcements",
		() =>
			axios
				.get(`${apiUrl}/api/mobile/mobile_news_and_announcement`, {
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
					message.success("success");
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
		if (apiUrl != "") {
			if (apiKey != "") {
				console.log("apiUrl", apiUrl);
				console.log("apiKey", apiKey);
				refetchDataMobileBulletins();
				refetchDataMobileNewsAndAnnouncements();
			}
		}
		return () => {};
	}, [apiUrl, apiKey]);
	useEffect(() => {
		return history.listen((location) => {
			console.log(`You changed the page to: ${location.pathname}`);
			if (location.pathname == "/home") {
				refetchDataMobileBulletins();
				refetchDataMobileNewsAndAnnouncements();
			}
		});
	}, [history]);

	useEffect(() => {
		console.log("dataMobileBulletins", dataMobileBulletins);
		return () => {};
	}, [dataMobileBulletins]);

	return (
		<IonPage>
			{/* <IonHeader>
				<IonToolbar>
					<IonTitle>Home</IonTitle>
				</IonToolbar>
			</IonHeader> */}
			<IonContent fullscreen>
				{/* <IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Home</IonTitle>
					</IonToolbar>
				</IonHeader> */}
				{/* <ExploreContainer name="Tab 1 page" /> */}
				{/* <div className="container">
                    
                </div> */}
				{/*  */}
				<IonCard>
					<Carousel autoplay autoplaySpeed={10000}>
						{mobileBulletins &&
							mobileBulletins
								.filter(
									(p: any) =>
										moment(p.date_start).unix() <= moment().unix() &&
										moment(p.date_end).unix() >= moment().unix()
								)
								.map((bulletin: any, bulletin_key: any) => {
									return (
										<div key={bulletin_key} style={{ textAlign: "center" }}>
											<img
												src={apiUrl + "/" + bulletin.image_path}
												alt="avatar"
												style={{
													margin: "auto",
												}}
											/>
										</div>
									);
								})}
					</Carousel>
				</IonCard>
				<div style={{ paddingLeft: 15, paddingRight: 15 }}>
					<h1 style={{ marginTop: 0 }}>
						<IonIcon icon={newspaperOutline} className="newsandannouncements_icon" />
						News and Announcements
					</h1>
					<List bordered>
						{mobileNews &&
							mobileNews.map((news: any, key: any) => {
								return (
									<List.Item
										key={key}
										onClick={(e) => setShowNewsModal({ show: true, data: news })}
									>
										<Text>{news.title}</Text>
									</List.Item>
								);
							})}
					</List>
				</div>
			</IonContent>

			<IonModal isOpen={showNewsModal.show}>
				<div className="container" style={{ overflowY: "auto" }}>
					<Card
						title={showNewsModal.data != null ? showNewsModal.data?.title : ""}
						extra={
							<Button
								onClick={(e: any) => setShowNewsModal({ show: false, data: null })}
							>
								Close
							</Button>
						}
					>
						<Paragraph>
							{showNewsModal.data != null ? showNewsModal.data?.content : ""}
						</Paragraph>
					</Card>
				</div>
			</IonModal>
		</IonPage>
	);
};

export default Home;
