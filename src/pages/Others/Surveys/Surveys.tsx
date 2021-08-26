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
	IonCard,
	IonLabel,
} from "@ionic/react";
import { Button, List, message } from "antd";
import "./Surveys.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import SurveyModal from "./SurveyModal";
import getStorage from "../../../providers/getStorage";
import setStorage from "../../../providers/setStorage";
import { UploadOutlined } from "@ant-design/icons";
import SurveyModalPendingSumissions from "./SurveyModalPendingSumissions";
import getApiUrl from "../../../providers/getApiUrl";
import getApiKey from "../../../providers/getApiKey";

const Surveys = () => {
	const [mobileSurveys, setMobileSurveys] = useState([]);
	const [pendingSubmissions, setPendingSubmissions] = useState<any>();
	const {
		data: dataSurveys,
		isLoading: isLoadingSurveys,
		refetch: refetchDataSurveys,
		isFetching: isFetchingDataSurveys,
	} = useQuery(
		"surveys",
		() =>
			axios
				.get(`${getApiUrl()}/api/mobile/form_type?surveys=1`, {
					headers: {
						Authorization: getApiKey(),
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
				if (res.success) {
					setStorage("surveys", JSON.stringify(res.data));
					setMobileSurveys(res.data);
					message.success("success");
				}
			},
			onError: (err) => {
				console.log(err);
				message.error("Connected Failed");
				getStorage("surveys").then((res: any) => {
					if (res) {
						console.log("failed surveys", JSON.parse(res));
						setMobileSurveys(JSON.parse(res));
					}
				});
			},
		}
	);

	useEffect(() => {
		getPendingSubmissions();
		return () => {};
	}, []);

	const getPendingSubmissions = () => {
		getStorage("pending_submissions").then((res) => {
			if (res) {
				setPendingSubmissions(JSON.parse(res));
			}
		});
	};
	useEffect(() => {
		console.log("pendingSubmissions", pendingSubmissions);
		return () => {};
	}, [pendingSubmissions]);

	useEffect(() => {
		refetchDataSurveys();
	}, []);

	const [showSurveyModal, setShowSurveyModal] = useState({
		show: false,
		data: null,
	});

	useEffect(() => {
		console.log("showSurveyModal", showSurveyModal);
		if (showSurveyModal.show == false) {
			getPendingSubmissions();
		}
		return () => {};
	}, [showSurveyModal]);

	// const [showSurveySubmissions, setShowSurveySubmissions] = useState<any>({
	// 	show: false,
	// 	data: null,
	// });

	type Variables = { form_type_id: any; answers: any };
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const mutationSurverAnswer = useMutation((data: Variables) => {
		return axios
			.post(`${getApiUrl()}/api/mobile/form_type_answer`, data, {
				headers: {
					Authorization: getApiKey(),
				},
			})
			.then((res) => res.data);
	});

	const handleUploadSurveySubmissions = (form_type_id: any) => {
		let answers = pendingSubmissions.filter(
			(p: any) => p.form_type_id == form_type_id
		);

		console.log("answers", answers);

		let data = {
			form_type_id: form_type_id,
			answers: answers,
			bulk: 1,
		};
		mutationSurverAnswer.mutate(data, {
			onSuccess: (res) => {
				console.log("formValues", res);
				let _pendingSubmissions: any[] = [];
				if (pendingSubmissions) {
					_pendingSubmissions = [...pendingSubmissions];
				}

				_pendingSubmissions = _pendingSubmissions.filter(
					(p) => p.form_type_id != form_type_id
				);
				console.log("_pendingSubmissions", _pendingSubmissions);
				setStorage(
					"pending_submissions",
					JSON.stringify(_pendingSubmissions)
				).then((res) => {
					getPendingSubmissions();
				});
			},
			onError: (err) => {
				message.error("Connection Failed");
				console.log("err", err);
			},
		});
	};

	const handleRenderContent = () => {
		if (mobileSurveys.length !== 0) {
			return mobileSurveys.map((survey: any, key: any) => {
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
						{pendingSubmissions &&
							pendingSubmissions.filter((p: any) => p.form_type_id == survey.id)
								.length > 0 && (
								<Button
									style={{ float: "right" }}
									size="small"
									type="primary"
									danger
									onClick={(e) => {
										// setShowSurveySubmissions({
										// 	show: true,
										// 	data: pendingSubmissions.filter(
										// 		(p: any) => p.form_type_id == survey.id
										// 	),
										// });
										handleUploadSurveySubmissions(survey.id);
									}}
									icon={<UploadOutlined />}
								>
									Pending Submissions (
									{
										pendingSubmissions.filter(
											(p: any) => p.form_type_id == survey.id
										).length
									}
									)
								</Button>
							)}
					</List.Item>
				);
			});
		} else {
			return (
				<List.Item>
					<IonLabel>No data</IonLabel>
				</List.Item>
			);
		}
	};

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
			<IonContent>
				{/* <ExploreContainer name="Tab 1 page" /> */}
				<IonCard style={{ padding: "10px" }}>
					<List bordered loading={isLoadingSurveys}>
						{handleRenderContent()}
					</List>
				</IonCard>

				<SurveyModal
					setShowSurveyModal={setShowSurveyModal}
					showSurveyModal={showSurveyModal}
				/>
				{/* <SurveyModalPendingSumissions
					setShowSurveySubmissions={setShowSurveySubmissions}
					showSurveySubmissions={showSurveySubmissions}
				/> */}
			</IonContent>
		</IonPage>
	);
};

export default Surveys;
