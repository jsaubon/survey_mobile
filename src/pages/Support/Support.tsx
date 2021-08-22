import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

import "./Support.css";

import {
	IonCard,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import {
	Col,
	Form,
	Input,
	Row,
	Steps,
	Button,
	Select,
	message,
	Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import getStorage from "../../providers/getStorage";
import setStorage from "../../providers/setStorage";

const Support = () => {
	let history = useHistory();
	const [form] = Form.useForm();
	const [apiUrl, setApiUrl] = useState("");
	const [apiKey, setApiKey] = useState("");
	const [complain, setComplain] = useState<any>();
	const [current, setCurrent] = useState(0);
	const [barangays, setBarangays] = useState([]);

	const [fileList, setFileList] = useState([]);

	const {
		data: dataBarangay,
		isLoading: isLoadingDataBarangay,
		refetch: refetchDataBarangay,
		isFetching: isFetchingDataBarangay,
	} = useQuery(
		"application_barangays",
		() =>
			axios
				.get(`${apiUrl}/api/mobile/barangay`, {
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
				if (res.success) {
					setStorage(
						"application_barangays",
						JSON.stringify(res.data.barangays)
					);
					setBarangays(res.data.barangays);
					message.success("success");
				} else {
					message.error("Connected Failed");
				}
			},
			onError: (err) => {
				message.error("Connected Failed");
				getStorage("application_barangays").then((res: any) => {
					if (res) {
						console.log("failed application_barangays", JSON.parse(res));
						setBarangays(JSON.parse(res));
					}
				});
				// message.error(JSON.stringify(err));
			},
		}
	);

	const steps = [
		{
			title: "Complain Information",
			content: "complain-iformation",
		},
		{
			title: "Attachments",
			content: "attachments",
		},
	];

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	// type Variables = {
	// 	barangay_id: any;
	// 	civil_status: any;
	// 	date_of_birth: any;
	// 	ethnicity: any;
	// 	extension: any;
	// 	firstname: any;
	// 	lastname: any;
	// 	middlename: any;
	// 	nationality: any;
	// 	nickname: any;
	// 	picture: any;
	// };
	// const {
	// 	mutate: mutateUpdateMemberOtherInfo,
	// 	isLoading: isLoadingMutateUpdateMemberOtherInfo,
	// } = useMutation((data: Variables) => {
	// 	return axios
	// 		.post(`${apiUrl}/api/mobile/household_member`, data, {
	// 			headers: {
	// 				Authorization: apiKey,
	// 			},
	// 		})
	// 		.then((res) => res.data);
	// });

	const proceed = (values: any) => {
		let data = {
			...values,
			picture: uploadPic.imageUrl == "" ? null : uploadPic.imageUrl,
		};

		setStorage("applicationData", JSON.stringify(data)).then((res) => {
			next();
		});
	};

	const handleFinish = (value: any) => {
		// console.log(value)
		if (value === true) {
			history.push("/complain");
		} else {
			form.resetFields();
			setComplain([]);
			setCurrent(current - 1);
		}
	};

	const beforeUpload = (file: any) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		let error;

		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
			error = Upload.LIST_IGNORE;
		}

		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Image must smaller than 2MB!");
			error = Upload.LIST_IGNORE;
		}

		return error;
	};

	const handleChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const onPreview = async (file: any) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	};

	useEffect(() => {
		getStorage("api_url").then((res) => {
			setApiUrl(res ? res : "");
		});
		getStorage("api_key").then((res) => {
			setApiKey(res ? res : "");
		});

		if (apiUrl != "") {
			if (apiKey != "") {
				console.log("apiUrl", apiUrl);
				console.log("apiKey", apiKey);
				refetchDataBarangay();
				// refetchDataNationality();
			}
		}
	}, [apiUrl, apiKey]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Support</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard style={{ padding: "10px" }}>
					<Form
						layout="vertical"
						form={form}
						onFinish={proceed}
						initialValues={{ sample: false }}
					>
						<Steps current={current}>
							{steps.map((item) => (
								<Steps.Step key={item.title} title={item.title} />
							))}
						</Steps>

						<div className="steps-content">
							{steps[current].title == "Complain Information" && (
								<>
									<Row gutter={24}>
										<Col className="gutter-row" span={12}>
											<Form.Item
												name="complainant_name"
												label="Complainant Name"
												rules={[
													{
														required: true,
														message: "Complainant Name is Invalid",
													},
												]}
											>
												<Input name="complainant_name" type="text" />
											</Form.Item>
										</Col>
										<Col className="gutter-row" span={12}>
											<Form.Item
												name="complaine"
												label="Complain"
												rules={[
													{
														required: true,
														message: "Complain is Invalid",
													},
												]}
											>
												<Input name="complaine" type="text" />
											</Form.Item>
										</Col>
									</Row>

									<Row gutter={24}>
										<Col className="gutter-row" span={12}>
											<Form.Item
												name="contact_no"
												label="Contact No."
												rules={[
													{
														required: true,
														message: "Contact No. is Invalid",
													},
												]}
											>
												<Input name="contact_no" type="text" />
											</Form.Item>
										</Col>
										<Col className="gutter-row" span={12}>
											<Form.Item
												name="email_address"
												label="Email Address"
												rules={[
													{
														required: true,
														message: "Email Address is Invalid",
													},
												]}
											>
												<Input name="email_address" type="text" />
											</Form.Item>
										</Col>
									</Row>

									<Row gutter={24}>
										<Col className="gutter-row" span={24}>
											<Form.Item
												label="Barangay"
												name="barangay_id"
												rules={[
													{
														required: true,
														message: "Please select item!",
													},
												]}
											>
												<Select
													style={{ width: "100%" }}
													showSearch
													placeholder="Select Barangay"
													filterOption={(input, option: any) =>
														option.searchvalue
															.toLowerCase()
															.indexOf(input.toLowerCase()) >= 0
													}
												>
													{barangays &&
														barangays.map((barangay: any, key) => {
															let option = `${barangay.barangay}, ${barangay.city.city}, ${barangay.province.province}`;
															return (
																<Select.Option
																	key={`barangay_option_${key}`}
																	value={barangay.id}
																	searchvalue={option}
																>
																	{option}
																</Select.Option>
															);
														})}
												</Select>
											</Form.Item>
										</Col>
									</Row>

									<Row gutter={24}>
										<Col className="gutter-row" span={24}>
											<Form.Item name="description" label="Description">
												{/* <Input name="description" type="text" /> */}
												<Input.TextArea rows={5} />
											</Form.Item>
										</Col>
									</Row>
								</>
							)}

							{steps[current].title === "Attachments" && (
								<>
									{complain && (
										<>
											<ImgCrop rotate>
												<Upload
													listType="picture-card"
													fileList={fileList}
													onChange={handleChange}
													onPreview={onPreview}
												>
													{fileList.length < 5 && "+ Upload"}
												</Upload>
											</ImgCrop>
										</>
									)}
								</>
							)}
						</div>
						<div className="steps-action">
							{current < steps.length - 1 && (
								<Button type="primary" htmlType="submit">
									Proceed
								</Button>
							)}

							{current > 0 && (
								<Button style={{ margin: "0 8px" }} onClick={() => prev()}>
									Previous
								</Button>
							)}
							{current === steps.length - 1 && (
								<>
									<Button
										type="primary"
										htmlType="button"
										// icon={<PlusOutlined />}
										style={{
											marginRight: "8px",
										}}
										onClick={() => handleFinish(true)}
									>
										Finish
									</Button>

									<Button
										type="ghost"
										htmlType="button"
										icon={<PlusOutlined />}
										onClick={() => handleFinish(false)}
									>
										Create & Add Another
									</Button>
								</>
							)}
						</div>
					</Form>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Support;
