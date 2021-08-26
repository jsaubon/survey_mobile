import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import News from "./News/News";
import Bulletins from "./Bulletins/Bulletins";

const Home = () => {
	return (
		<IonPage>
			<IonContent style={{ textAlign: "center" }}>
				<Bulletins />
				<News />
			</IonContent>
		</IonPage>
	);
};

export default Home;
