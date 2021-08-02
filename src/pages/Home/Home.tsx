import {
	IonCard,
	IonCardContent,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonSlide,
	IonSlides,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { newspaperOutline } from "ionicons/icons";
import "./Home.css";
import { Carousel, List, message } from "antd";
import Text from "antd/lib/typography/Text";
import { useQuery } from "react-query";
import axios from "axios";
import getStorage from "../../providers/getStorage";
import moment from "moment";
import { useEffect, useState } from "react";

const Home = () => {
	const [apiUrl, setApiUrl] = useState("");
	const [apiKey, setApiKey] = useState("");

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
		if (apiUrl != "" && apiKey != "") {
			refetchDataMobileBuletins();
		}
		return () => {};
	}, [apiUrl, apiKey]);

	const {
		data: dataMobileBulletins,
		isLoading: isLoadingDataMobileBulletins,
		refetch: refetchDataMobileBuletins,
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
			refetchOnWindowFocus: true,
			onSuccess: (res) => {
				console.log("res", res);
				if (res.success) {
					message.success("success");
				} else {
					message.error("Connected Failed");
				}
			},
			onError: (err) => {
				console.log(err);
				message.error("Connected Failed");
			},
		}
	);

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
					<Carousel autoplay>
						{dataMobileBulletins &&
							dataMobileBulletins.data &&
							dataMobileBulletins.data
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
						<List.Item>
							<Text>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure
								explicab
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure
								explicab
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure
								explicab
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure
								explicab
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure
								explicab
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure
								explicab
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure
								explicab
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure
								explicab
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure
								explicab
							</Text>
						</List.Item>
					</List>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
