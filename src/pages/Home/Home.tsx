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
import { Carousel, List } from "antd";
import Text from "antd/lib/typography/Text";

const Home = () => {
	const slideOpts = {
		initialSlide: 1,
		speed: 400,
		autoplay: {
			delay: 10000,
		},
		centeredSlides: true,
		loop: true,
	};
	const contentStyle = {
		height: "160px",
		color: "#fff",
		lineHeight: "160px",
		textAlign: "center",
		background: "#364d79",
	};

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
				<IonCard>
					<Carousel speed={200} afterChange={(e) => console.log(e)}>
						<div>
							<h3
								style={{
									height: "160px",
									color: "#fff",
									lineHeight: "160px",
									textAlign: "center",
									background: "#364d79",
									marginBottom: 0,
								}}
							>
								1
							</h3>
						</div>
						<div>
							<h3
								style={{
									height: "160px",
									color: "#fff",
									lineHeight: "160px",
									textAlign: "center",
									background: "#364d79",
									marginBottom: 0,
								}}
							>
								2
							</h3>
						</div>
						<div>
							<h3
								style={{
									height: "160px",
									color: "#fff",
									lineHeight: "160px",
									textAlign: "center",
									background: "#364d79",
									marginBottom: 0,
								}}
							>
								3
							</h3>
						</div>
						<div>
							<h3
								style={{
									height: "160px",
									color: "#fff",
									lineHeight: "160px",
									textAlign: "center",
									background: "#364d79",
									marginBottom: 0,
								}}
							>
								4
							</h3>
						</div>
					</Carousel>
				</IonCard>
				<div style={{ paddingLeft: 15, paddingRight: 15 }}>
					<h1 style={{ marginTop: 0 }}>
						<IonIcon icon={newspaperOutline} className="newsandannouncements_icon" />
						News and Announcements
					</h1>
					<List
						bordered
					>
						<List.Item>
							<Text >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure explicab</Text>
						</List.Item>
						<List.Item>
							<Text >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure explicab</Text>
						</List.Item>
						<List.Item>
							<Text >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure explicab</Text>
						</List.Item>
						<List.Item>
							<Text >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure explicab</Text>
						</List.Item>
						<List.Item>
							<Text >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure explicab</Text>
						</List.Item>
						<List.Item>
							<Text >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure explicab</Text>
						</List.Item>
						<List.Item>
							<Text >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure explicab</Text>
						</List.Item>
						<List.Item>
							<Text >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure explicab</Text>
						</List.Item>
						<List.Item>
							<Text >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit iure explicab</Text>
						</List.Item>
					</List>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
