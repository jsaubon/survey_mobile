import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonModal,
	IonButton,
} from "@ionic/react";
import { Button, List } from "antd";
import "./Surveys.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import SurveyModal from "./SurveyModal";

const Surveys = () => {
	let apiUrl = "http://dost.test/api/mobile";
	let api_key = "ZhtLwWWHGdxzt0JDlX2H6CepXQnZjRGEShf64Q8iQ8UKc2uJDL1qwLj9vcsZ";
	const { data: dataSurveys, isLoading: isLoadingSurveys } = useQuery(
		"surveys",
		() =>
			axios
				.get(`${apiUrl}/form_type?surveys=1`, {
					headers: {
						Authorization: api_key,
					},
				})
				.then((res) => res.data),
		{
			retry: 1,
			retryDelay: 500,
			refetchOnWindowFocus: false,
			onSuccess: (res) => {
				console.log(res);
			},
		}
	);

	const [showSurveyModal, setShowSurveyModal] = useState({
		show: false,
		data: null,
	});

	useEffect(() => {
		console.log("showSurveyModal", showSurveyModal);
		return () => {};
	}, [showSurveyModal]);
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
						{dataSurveys &&
							dataSurveys.data.map((survey: any, key: any) => {
								return (
									<List.Item key={key}>
										{survey.form_type}
										<Button
											style={{ float: "right" }}
											size="small"
											type="primary"
											onClick={(e) => {
												setShowSurveyModal({ show: true, data: survey });
											}}
										>
											Take Survey
										</Button>
									</List.Item>
								);
							})}
					</List>
				</div>
				<SurveyModal
					setShowSurveyModal={setShowSurveyModal}
					showSurveyModal={showSurveyModal}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Surveys;
