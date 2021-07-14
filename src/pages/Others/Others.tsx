import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { List } from "antd";
import { Link } from "react-router-dom";
import "./Others.css";

const Others = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Others</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Others</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* <ExploreContainer name="Tab 1 page" /> */}
                <div className="container">
                    <List bordered>
                        <Link to="/others/surveys"><List.Item>Surveys</List.Item></Link>
                    </List>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Others;
