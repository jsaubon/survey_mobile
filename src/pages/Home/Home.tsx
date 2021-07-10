import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import "./Home.css";

const Home = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Home</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Home</IonTitle>
					</IonToolbar>
				</IonHeader>
				{/* <ExploreContainer name="Tab 1 page" /> */}
				<div className="container">test</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
