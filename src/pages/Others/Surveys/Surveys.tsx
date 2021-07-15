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
import { Button, List, message } from "antd";
import "./Surveys.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import SurveyModal from "./SurveyModal";
import getApiUrl from "../../../providers/getApiUrl";
import getApiKey from "../../../providers/getApiKey";
import getStorage from "../../../providers/getStorage";

const Surveys = () => {
	const {
		data: dataSurveys,
		isLoading: isLoadingSurveys,
		refetch: refetchDataSurveys,
		isFetching: isFetchingDataSurveys,
	} = useQuery(
		"surveys",
		() =>
			axios
				.get(`${apiUrl}/api/mobile/form_type?surveys=1`, {
					headers: {
						Authorization: apiKey,
					},
				})
				.then((res) => res.data),
		{
			enabled: false,
			retry: 1,
			retryDelay: 500,
			refetchOnWindowFocus: false,
			onSuccess: (res) => {
				console.log("res", res);
				message.success("success");
			},
			onError: (err) => {
				console.log(err);
				message.error("Connected Failed");
			},
		}
	);

	const [apiUrl, setApiUrl] = useState("");
	const [apiKey, setApiKey] = useState("");

	useEffect(() => {
		getStorage("api_url").then((res) => {
			setApiUrl(res ? res : "");
		});
		getStorage("api_key").then((res) => {
			setApiKey(res ? res : "");
		});
		return () => {};
	}, []);
	useEffect(() => {
		if (apiUrl != "" && apiKey != "") {
			refetchDataSurveys();
		}
		return () => {};
	}, [apiUrl, apiKey]);

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
					<List bordered loading={isLoadingSurveys}>
						{dataSurveys &&
							dataSurveys.data &&
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
