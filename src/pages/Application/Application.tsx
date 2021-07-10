import {
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonList,
	IonListHeader,
	IonPage,
	IonSelectOption,
	IonSelect,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import "./Application.css";
import { InputItem, List } from "antd-mobile";

const Application = () => {
	return (
		<IonPage>
			<IonHeader>
				{/* <IonToolbar> */}
				{/* <IonTitle>Application Form</IonTitle> */}
				{/* </IonToolbar> */}
			</IonHeader>
			<IonContent fullscreen>
				{/* <IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Application</IonTitle>
					</IonToolbar>
				</IonHeader> */}
				{/* <ExploreContainer name="Tab 1 page" /> */}
				{/* <IonTitle>Application</IonTitle> */}
				<div className="container">
					<h1>Application Form</h1>
					<List>
						<InputItem type="number" clear >
							test
						</InputItem>
					</List>
					<IonList>
						<h4>Basic Info</h4>
						<IonItem>
							<IonLabel position="floating">First Name</IonLabel>
							<IonInput value=""></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Middle Name</IonLabel>
							<IonInput value=""></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Last Name</IonLabel>
							<IonInput value=""></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Extension</IonLabel>
							<IonInput value=""></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Nickname</IonLabel>
							<IonInput value=""></IonInput>
						</IonItem>
						<br />
						<h4>Other Info</h4>
						<IonItem>
							<IonLabel position="floating">Sex</IonLabel>
							<IonSelect
								// value={gender}
								placeholder="Select Sex"
								interface="popover"
								// onIonChange={(e) => setGender(e.detail.value)}
							>
								<IonSelectOption value="Female">Female</IonSelectOption>
								<IonSelectOption value="Male">Male</IonSelectOption>
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Civil Status</IonLabel>
							<IonSelect
								// value={gender}
								placeholder="Select Civil Status"
								interface="popover"
								// onIonChange={(e) => setGender(e.detail.value)}
							>
								<IonSelectOption value="Single">Single</IonSelectOption>
								<IonSelectOption value="Married">Married</IonSelectOption>
								<IonSelectOption value="Widowed">Widowed</IonSelectOption>
								<IonSelectOption value="Separated">Separated</IonSelectOption>
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Nationality</IonLabel>
							<IonInput value=""></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Ethnicity</IonLabel>
							<IonInput value=""></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Barangay</IonLabel>
							<IonInput value=""></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Date of Birth</IonLabel>
							<IonInput value=""></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Place of Birth</IonLabel>
							<IonInput value=""></IonInput>
						</IonItem>
					</IonList>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Application;
