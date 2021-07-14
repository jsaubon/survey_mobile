import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
} from "@ionic/react";
import { List } from "antd";
import "./Surveys.css";

const Surveys = () => {



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonBackButton defaultHref="/others" />
                    </IonButtons>
                    <IonTitle>Surveys</IonTitle>
                </IonToolbar>

            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Surveys</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* <ExploreContainer name="Tab 1 page" /> */}
                <div className="container">
                    <List bordered>
                        <List.Item>asdas</List.Item>
                    </List>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Surveys;
