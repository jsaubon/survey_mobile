import { Redirect, Route } from "react-router-dom";
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
	ellipse,
	square,
	triangle,
	homeOutline,
	folderOutline,
	helpCircleOutline,
} from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/Home/Home";
import Application from "./pages/Application/Application";
import Support from "./pages/Support/Support";

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Route exact path="/home">
						<Home />
					</Route>
					<Route exact path="/application">
						<Application />
					</Route>
					<Route path="/support">
						<Support />
					</Route>
					<Route exact path="/">
						<Redirect to="/home" />
					</Route>
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton tab="home" href="/home">
						<IonIcon icon={homeOutline} />
						<IonLabel>Home</IonLabel>
					</IonTabButton>
					<IonTabButton tab="application" href="/application">
						<IonIcon icon={folderOutline} />
						<IonLabel>Application Form</IonLabel>
					</IonTabButton>
					<IonTabButton tab="support" href="/support">
						<IonIcon icon={helpCircleOutline} />
						<IonLabel>Support</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
