import React, { useEffect } from "react";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonModal,
} from "@ionic/react";
import { Button } from "antd";
interface surverProps {
	setShowSurveyModal: any;
	showSurveyModal: any;
}
const SurveyModal: React.FC<surverProps> = ({
	setShowSurveyModal,
	showSurveyModal,
}) => {
	useEffect(() => {
		console.log("showSurveyModalasda", showSurveyModal);
		return () => {};
	}, [showSurveyModal]);
	return (
		<IonModal isOpen={showSurveyModal.show}>
			<div className="container">
				<Button onClick={(e) => setShowSurveyModal({ show: false, data: null })}>
					Close
				</Button>
			</div>
		</IonModal>
	);
};

export default SurveyModal;
