import { IonModal } from "@ionic/react";
import { Button, Card } from "antd";
import React, { useEffect } from "react";

interface surveyPendingSubmissionsProps {
	setShowSurveySubmissions: any;
	showSurveySubmissions: any;
}
const SurveyModalPendingSumissions: React.FC<surveyPendingSubmissionsProps> = ({
	setShowSurveySubmissions,
	showSurveySubmissions,
}) => {
	useEffect(() => {
		console.log("showSurveySubmissions", showSurveySubmissions);
		return () => {};
	}, [showSurveySubmissions.show]);
	return (
		<IonModal
			isOpen={showSurveySubmissions.show}
			onDidDismiss={(e) =>
				setShowSurveySubmissions({ show: false, data: null })
			}
		>
			<div className="container" style={{ overflowY: "auto" }}>
				<Card
					title={
						showSurveySubmissions.data && showSurveySubmissions.data.form_type
					}
					extra={
						<Button
							onClick={(e) =>
								setShowSurveySubmissions({ show: false, data: null })
							}
						>
							Close
						</Button>
					}
				></Card>
			</div>
		</IonModal>
	);
};

export default SurveyModalPendingSumissions;
