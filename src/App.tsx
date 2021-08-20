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
	homeOutline,
	createOutline,
	helpCircleOutline,
	ellipsisHorizontalCircleOutline,
} from "ionicons/icons";

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
import Others from "./pages/Others/Others";
import Surveys from "./pages/Others/Surveys/Surveys";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { QueryClient, QueryClientProvider } from "react-query";
import Settings from "./pages/Others/Settings/Settings";
const queryClient = new QueryClient();

const App: React.FC = () => (
	<QueryClientProvider client={queryClient}>
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
						<Route exact path="/supports">
							<Support />
						</Route>
						<Route exact path="/others/settings">
							<Settings />
						</Route>
						<Route exact path="/others/surveys">
							<Surveys />
						</Route>
						<Route exact path="/others">
							<Others />
						</Route>
						<Route exact path="/">
							<Redirect to="/home" />
						</Route>
					</IonRouterOutlet>
					<IonTabBar slot="bottom">
						<IonTabButton tab="home" href="/home">
							<IonIcon icon={homeOutline} />
						</IonTabButton>
						<IonTabButton tab="application" href="/application">
							<IonIcon icon={createOutline} />
						</IonTabButton>
						<IonTabButton tab="support" href="/supports">
							<IonIcon icon={helpCircleOutline} />
						</IonTabButton>
						<IonTabButton tab="others" href="/others">
							<IonIcon icon={ellipsisHorizontalCircleOutline} />
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	</QueryClientProvider>
);

export default App;
