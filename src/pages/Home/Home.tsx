import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import News from "./News/News";
import Bulletins from "./Bulletins/Bulletins";
import Navigation from "./Navigation/Navigation";

const Home = () => {
	return (
		<IonPage>
			<IonContent style={{ textAlign: "center" }}>
				<Bulletins />
				<Navigation />
				<News />
			</IonContent>
		</IonPage>
	);
};

export default Home;
