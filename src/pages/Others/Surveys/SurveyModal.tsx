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
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
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

	const [collapseActiveKey, setCollapseActiveKey] = useState(1);

	const handleOnChangeQuestionCategory = (e: any) => {
		setCollapseActiveKey(e);
	};

	const [formValues, setFormValues] = useState({});
	const handleSubmitCategory = (values: any) => {
		if (collapseActiveKey == showSurveyModal.data.question_categories.length) {
			let data = { ...formValues, ...values };
			console.log(data);
		} else {
			setFormValues({ ...formValues, ...values });
			setCollapseActiveKey(collapseActiveKey + 1);
		}
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
					<Collapse
						accordion
						activeKey={collapseActiveKey}
						onChange={(e) => handleOnChangeQuestionCategory(e)}
					>
						{showSurveyModal &&
							showSurveyModal.data &&
							Object.values(showSurveyModal.data.question_categories).map(
								(questionCategory: any, key: any) => {
									return (
										<Collapse.Panel
											header={`${alphabets[key].toUpperCase()}. ${
												questionCategory.category
											}`}
											key={key + 1}
											// extra={
											//     activekeyCount >
											//     key + 1 ? (
											//         <CheckCircleOutlined
											//             style={{
											//                 color:
											//                     "green",
											//                 fontSize: 20
											//             }}
											//         />
											//     ) : (
											//         <CloseCircleOutlined
											//             style={{
											//                 color:
											//                     "red",
											//                 fontSize: 20
											//             }}
											//         />
											//     )
											// }
										>
											<Form
												onFinish={(values) => handleSubmitCategory(values)}
												// initialValues={defaultAnswers}
											>
												{questionCategory.questions.map(
													(question: any, question_key: any) => {
														let question_input = generateQuestionOptions(question);

														// console.log(
														//     question.id,
														//     "question.description",
														//     question.description,
														//     question.description.replace(
														//         "___",
														//         member.name
														//     )
														// );

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
													<Button
														type="primary"
														htmlType="submit"
														// loading={isLoadingMutateSaveAnswer}
													>
														{key !=
														Object.values(showSurveyModal.data.question_categories).length -
															1 ? (
															<>Valdate and Proceed</>
														) : (
															<>Submit</>
														)}
													</Button>
												</div>
											</Form>
										</Collapse.Panel>
									);
								}
							)}
					</Collapse>
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
	console.log("questionxx", question);
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
