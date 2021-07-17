import React, { useEffect, useState } from "react";
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
import {
	Button,
	Card,
	Col,
	Collapse,
	Form,
	Input,
	Row,
	Tooltip,
	InputNumber,
	Radio,
	Checkbox,
	Select,
	DatePicker,
	Steps,
	Divider,
	message,
	Alert,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import axios from "axios";
import getStorage from "../../../providers/getStorage";
interface surverProps {
	setShowSurveyModal: any;
	showSurveyModal: any;
}
const SurveyModal: React.FC<surverProps> = ({
	setShowSurveyModal,
	showSurveyModal,
}) => {
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
		console.log("showSurveyModalasda", showSurveyModal);
		return () => {};
	}, [showSurveyModal]);

	const [stepActiveKey, setStepActiveKey] = useState(0);

	const handleOnChangeQuestionCategory = (e: any) => {
		setStepActiveKey(e);
	};

	const [formValues, setFormValues] = useState({});
	const handleSubmitCategory = (values: any) => {
		setFormValues({ ...formValues, ...values });
		setStepActiveKey(stepActiveKey + 1);
	};

	type Variables = { form_type_id: any; answers: any };
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const mutationSurverAnswer = useMutation((data: Variables) => {
		return axios
			.post(`${apiUrl}/api/mobile/form_type_answer`, data, {
				headers: {
					Authorization: apiKey,
				},
			})
			.then((res) => res.data);
	});

	const handleSubmitSurvey = () => {
		let data = {
			form_type_id: showSurveyModal.data.id,
			answers: formValues,
		};
		mutationSurverAnswer.mutate(data, {
			onSuccess: (res) => {
				console.log("formValues", res);
				setSubmitSuccess(true);
			},
		});
	};
	return (
		<IonModal isOpen={showSurveyModal.show}>
			<div className="container" style={{ overflowY: "auto" }}>
				<Card
					title={showSurveyModal.data && showSurveyModal.data.form_type}
					extra={
						<Button onClick={(e) => setShowSurveyModal({ show: false, data: null })}>
							Close
						</Button>
					}
				>
					<Steps
						progressDot
						current={stepActiveKey}
						// onChange={(e) => setStepActiveKey(e)}
					>
						{showSurveyModal &&
							showSurveyModal.data &&
							Object.values(showSurveyModal.data.question_categories).map(
								(questionCategory: any, key: any) => {
									return <Steps.Step title={questionCategory.category} />;
								}
							)}

						<Steps.Step title="Review & Submit" />
					</Steps>
					<Divider />
					{showSurveyModal &&
						showSurveyModal.data &&
						Object.values(showSurveyModal.data.question_categories).map(
							(questionCategory: any, key: any) => {
								return (
									<div className={`${stepActiveKey == key ? "" : "hide"}`}>
										<h1>{questionCategory.category}</h1>
										<Form
											onFinish={(values) => handleSubmitCategory(values)}
											// initialValues={defaultAnswers}
										>
											{questionCategory.questions.map(
												(question: any, question_key: any) => {
													let question_input = generateQuestionOptions(question);

													return (
														<Card
															size="small"
															hoverable
															key={`card_questions_${question.id}`}
														>
															<Row key={`question_row_${question.id}`}>
																<Col xs={24} md={12}>
																	<b>
																		{question_key + 1}:{" "}
																		<span
																			dangerouslySetInnerHTML={{
																				__html: question.question,
																			}}
																		></span>{" "}
																		{question.question_tips && question.question_tips != "" && (
																			<Tooltip title={question.question_tips}>
																				<QuestionCircleOutlined />
																			</Tooltip>
																		)}
																	</b>
																	<br />
																	<small>
																		<span
																			dangerouslySetInnerHTML={{
																				__html: question.description,
																			}}
																		></span>
																	</small>
																</Col>
																<Col xs={24} md={12}>
																	{question_input}
																</Col>
															</Row>
														</Card>
													);
												}
											)}
											<br />
											<div className="text-right">
												{stepActiveKey > 0 && (
													<Button
														htmlType="submit"
														// loading={isLoadingMutateSaveAnswer}
														onClick={(e) => setStepActiveKey(stepActiveKey - 1)}
													>
														Previous
													</Button>
												)}
												<Button
													type="primary"
													htmlType="submit"
													// loading={isLoadingMutateSaveAnswer}
												>
													Valdate and Proceed
												</Button>
											</div>
										</Form>
									</div>
								);
							}
						)}

					{showSurveyModal.data &&
						stepActiveKey ==
							Object.values(showSurveyModal.data.question_categories).length && (
							<>
								<div>
									<h1>Review & Submit</h1>
									{Object.values(showSurveyModal.data.question_categories).map(
										(category: any, category_key: any) => {
											let category_answers = category.questions.map(
												(_question: any, question_key: any) => {
													let answer_key = Object.keys(formValues).indexOf(
														`qid_${_question.id}`
													);
													let answer_value = Object.values(formValues)[answer_key];
													return (
														<div>
															{_question.question}: {answer_value}
														</div>
													);
												}
											);

											return (
												<Card
													style={{ marginBottom: 5 }}
													title={category.category}
													size="small"
												>
													{category_answers}
												</Card>
											);
										}
									)}
									<Divider />
									{submitSuccess ? (
										<>
											<Alert message="Survey Successfully Submitted" type="success" />
										</>
									) : (
										<div className="text-right">
											<Button
												htmlType="submit"
												// loading={isLoadingMutateSaveAnswer}
												onClick={(e) => setStepActiveKey(stepActiveKey - 1)}
											>
												Previous
											</Button>
											<Button
												type="primary"
												// htmlType="submit"
												onClick={(e) => handleSubmitSurvey()}
												// loading={isLoadingMutateSaveAnswer}
											>
												Submit
											</Button>
										</div>
									)}
								</div>
							</>
						)}
				</Card>
			</div>
		</IonModal>
	);
};

export default SurveyModal;

const alphabets = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];
//for upper case use the toUpperCase() function

function generateQuestionOptions(question: any) {
	let question_input;
	switch (question.question_type) {
		case "text":
			question_input = <Input />;
			break;
		case "number":
			question_input = (
				<Input
					type="number"
					// formatter={value =>
					//     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
					// }
					// parser={value => value?.replace(/\$\s?|(,*)/g, "")}
				/>
			);
			break;
		case "radio":
			// question_input = <Input />;
			let radio_options: any = [];
			question.question_options.map((question_option: any, key: any) => {
				radio_options.push(
					<Radio
						key={`question_option_key_${question_option.id}`}
						value={question_option.option}
					>
						{question_option.option}
					</Radio>
				);
			});
			question_input = <Radio.Group>{radio_options}</Radio.Group>;
			break;

		case "checkbox":
			// question_input = <Input />;
			let checkbox_options: any = [];
			question.question_options.map((question_option: any, key: any) => {
				checkbox_options.push({
					label: question_option.option,
					value: question_option.option,
				});
			});
			question_input = <Checkbox.Group options={checkbox_options} />;
			break;
		case "select":
			// question_input = <Input />;
			let select_options: any = [];
			question.question_options.map((question_option: any, key: any) => {
				select_options.push(
					<Select.Option
						key={`question_option_key_${question_option.id}`}
						value={question_option.option}
					>
						{question_option.option}
					</Select.Option>
				);
			});
			question_input = (
				<Select
					showSearch
					filterOption={(input, option) =>
						option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					style={{
						width: "100%",
					}}
				>
					{select_options}
				</Select>
			);
			break;
		case "date":
			question_input = <DatePicker />;

			break;

		default:
			break;
	}

	let form_item = (
		<Form.Item
			rules={[
				{
					required: question.required == 1 ? true : false,
					message: "This field is required",
				},
			]}
			name={`qid_${question.id}`}
		>
			{question_input}
		</Form.Item>
	);

	return form_item;
}
