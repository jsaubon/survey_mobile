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
					<IonSlides pager={true} options={slideOpts}>
						<IonSlide>
							<h1>Slide 1</h1>
						</IonSlide>
						<IonSlide>
							<h1>Slide 2</h1>
						</IonSlide>
						<IonSlide>
							<h1>Slide 3</h1>
						</IonSlide>
					</IonSlides>
				</IonCard>
				<div style={{ paddingLeft: 15, paddingRight: 15 }}>
					<h1 style={{ marginTop: 0 }}>
						<IonIcon icon={newspaperOutline} className="newsandannouncements_icon"/>
						News and Announcements
					</h1>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
