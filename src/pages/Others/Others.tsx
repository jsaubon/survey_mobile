import { settingsOutline } from "ionicons/icons";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { List } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./Others.css";

const Others = () => {
  let history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={(e) => history.push("/others/settings")}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
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
            <Link to="/others/surveys">
              <List.Item>Surveys</List.Item>
            </Link>
          </List>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Others;
