import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LeftOutlined, RightOutlined, UploadOutlined } from "@ant-design/icons";
import {
	AutoComplete,
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Select,
	Divider,
	Layout,
	message,
	Upload,
	Row,
} from "antd";
import moment from "moment";
import Webcam from "react-webcam";
// import useAxiosQuery from "../../../providers/useAxiosQuery";
import defaultpng from "./default.png";
import thereisnoconnectedcamerapng from "../../../assets/img/there_is_no_connected_camera.png";
// import getUserData from "../../../providers/getUserData";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import getStorage from "../../providers/getStorage";
import setStorage from "../../providers/setStorage";
import { useMutation, useQuery } from "react-query";
import getApiUrl from "../../providers/getApiUrl";
import getApiKey from "../../providers/getApiKey";

const videoConstraints = {
	width: 220,
	height: 200,
	facingMode: "user",
};

function getImgBinary(img: any, callback: any) {
	console.log("img", img.originFileObj);
	const reader = new FileReader();
	reader.readAsBinaryString(img.originFileObj);
	reader.addEventListener("load", () => {
		let res = reader.result as string;
		let logo = btoa(res);
		callback(logo);
	});
}
interface ApplicationProps {
	next: any;
	prev: any;
}
const ApplicationTab: React.FC<ApplicationProps> = ({ next, prev }) => {
	const [applicationData, setApplicationData] = useState<any>();
	useEffect(() => {
		console.log("applicationData", applicationData);
		if (applicationData) {
			let appData = {
				...applicationData,
				date_of_birth: moment(applicationData.date_of_birth),
			};
			setUploadPic({ ...uploadPic, imageUrl: applicationData.picture });
			formMemOtherInfo.setFieldsValue(appData);
		}
		return () => {};
	}, [applicationData]);

	const [barangays, setBarangays] = useState([]);

	const {
		data: dataBarangay,
		isLoading: isLoadingDataBarangay,
		refetch: refetchDataBarangay,
		isFetching: isFetchingDataBarangay,
	} = useQuery(
		"application_barangays",
		() =>
			axios
				.get(`${getApiUrl()}/api/mobile/barangay`, {
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

	const [nationality, setNationality] = useState([]);
	const {
		data: dataNationality,
		isLoading: isLoadingDataNationality,
		refetch: refetchDataNationality,
		isFetching: isFetchingDataNationality,
	} = useQuery(
		"application_nationalities",
		() =>
			axios
				.get(`${getApiUrl()}/api/mobile/barangay`, {
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
					setStorage("application_nationalities", JSON.stringify(res.data));
					setNationality(res.data);
					message.success("success");
				} else {
					message.error("Connected Failed");
				}
			},
			onError: (err) => {
				message.error("Connected Failed");
				getStorage("application_nationalities").then((res: any) => {
					if (res) {
						console.log("failed application_nationalities", JSON.parse(res));
						setNationality(JSON.parse(res));
					}
				});
				// message.error(JSON.stringify(err));
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
		getStorage("applicationData").then((res) => {
			if (res) {
				setApplicationData(JSON.parse(res));
			}
		});
		return () => {};
	}, []);

	useEffect(() => {
		if (apiUrl != "") {
			if (apiKey != "") {
				console.log("apiUrl", apiUrl);
				console.log("apiKey", apiKey);
				refetchDataBarangay();
				// refetchDataNationality();
			}
		}
		return () => {};
	}, [apiUrl, apiKey]);

	let history = useHistory();
	// const userData = getUserData();

	const [formMemOtherInfo] = Form.useForm();
	const [uploadPic, setUploadPic] = useState<any>({
		imageUrl: "",
		file: null,
		loading: false,
	});

	type Variables = {
		barangay_id: any;
		civil_status: any;
		date_of_birth: any;
		ethnicity: any;
		extension: any;
		firstname: any;
		lastname: any;
		middlename: any;
		nationality: any;
		nickname: any;
		picture: any;
	};
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [pendingSuccess, setPendingSuccess] = useState(false);
	const {
		mutate: mutateUpdateMemberOtherInfo,
		isLoading: isLoadingMutateUpdateMemberOtherInfo,
	} = useMutation((data: Variables) => {
		return axios
			.post(`${getApiUrl()}/api/mobile/household_member`, data, {
				headers: {
					Authorization: getApiKey(),
				},
			})
			.then((res) => res.data);
	});

	const handleCreateMember = (values: any) => {
		console.log("values", values);
		let data = {
			...values,
			date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
			picture: uploadPic.imageUrl == "" ? null : uploadPic.imageUrl,
		};
		// console.log('values', values);
		console.log("data", data);

		setStorage("applicationData", JSON.stringify(data)).then((res) => {
			next();
		});

		mutateUpdateMemberOtherInfo(data, {
			onSuccess: (res) => {
				if (res.success) {
					message.success({
						content: "Data submitted successfully!",
						style: {
							marginTop: "20vh",
						},
					});

					// setBtnLoadingProceed(true);

					setTimeout(() => {
						window.location.href =
							window.location.origin + "/profile/applicant/view/" + res.data.id;
					}, 1000);
				} else {
					// setBtnLoadingProceed(false);
				}
			},
			onError: (err) => {
				let _applicationData: any[] = [];
				if (applicationData) {
					_applicationData = [...applicationData];
				}

				_applicationData.push(data);
				console.log("_applicationData", _applicationData);
				setStorage("applicationData", JSON.stringify(_applicationData));
				console.log("err", err);
			},
		});
	};

	function disabledDate(current: any) {
		// Can not select days before today and today
		return current && current.valueOf() > moment().subtract(60, "years");
	}

	const handleChangeUploadPic = {
		beforeUpload: (file: any) => {
			let error;

			const isJPG = file.type === "image/jpeg" || file.type === "image/png";

			if (!isJPG) {
				message.error("You can only upload JPG or PNG file!");
				error = Upload.LIST_IGNORE;
			}

			return error;
		},
		onChange: (info: any) => {
			getImgBinary(info.file, (imageUrl: any) => {
				console.log(imageUrl);
				setUploadPic({
					imageUrl,
					file: info.file,
					loading: false,
				});
			});
		},
	};

	// useEffect(() => {
	// 	navigator.getMedia =
	// 		navigator.getUserMedia || // use the proper vendor prefix
	// 		navigator.webkitGetUserMedia ||
	// 		navigator.mozGetUserMedia ||
	// 		navigator.msGetUserMedia;
	// 	if (navigator.getUserMedia) {
	// 		navigator.getMedia(
	// 			{ video: true },
	// 			function () {
	// 				// webcam is available
	// 				setCheckCameraAvailable(true);
	// 			},
	// 			function () {
	// 				// webcam is not available
	// 				setCheckCameraAvailable(false);
	// 			}
	// 		);
	// 	} else {
	// 		setCheckCameraAvailable(false);
	// 	}
	// }, [checkCameraAvailable]);

	useEffect(() => {
		console.log("uploadPic", uploadPic);
		return () => {};
	}, [uploadPic]);

	return (
		<Layout.Content className="ant-layout-main-content">
			<Card title="Application">
				<Form
					layout="vertical"
					form={formMemOtherInfo}
					onFinish={(values) => handleCreateMember(values)}
					initialValues={{
						date_of_birth: moment().subtract(60, "years"),
					}}
				>
					<Row gutter={12}>
						{/* <Col span={6} offset={6}>
							<Row gutter={12}>
								<Col span={24} className="text-center">
									{checkCameraAvailable === true ? (
										<Webcam
											audio={false}
											height={200}
											ref={webcamRef}
											screenshotFormat="image/jpeg"
											width={220}
											videoConstraints={videoConstraints}
											onUserMedia={onUserMediaWebcam}
										/>
									) : (
										<img
											src={thereisnoconnectedcamerapng}
											className="m-b-xs"
											alt="thereisnoconnectedcamerapng"
											style={{ width: "220px", height: "200px" }}
										/>
									)}
								</Col>
								<Col span={24} className="text-center">
									<Button
										type="primary"
										onClick={(e) => {
											e.preventDefault();
											capture();
										}}
										// loading={btnLoadingProceed}
									>
										Capture
									</Button>
								</Col>
							</Row>
						</Col> */}

						<Col span={24} className="text-center">
							{
								<img
									src={
										uploadPic.imageUrl == ""
											? defaultpng
											: `data:image/jpeg;base64,${uploadPic.imageUrl}`
									}
									style={{ width: "220px", height: "200px" }}
								/>
							}
							<br />
							<Upload
								{...handleChangeUploadPic}
								accept=".jpg,.png"
								maxCount={1}
							>
								<Button icon={<UploadOutlined />}>
									Upload (JPG or PNG only)
								</Button>
							</Upload>
						</Col>

						<Divider />
						<Col xs={24} md={5}>
							<Form.Item
								label="First Name"
								name="firstname"
								rules={[
									{
										required: true,
										message: "This field is required",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} md={5}>
							<Form.Item label="Middle Name" name="middlename">
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} md={5}>
							<Form.Item
								label="Last Name"
								name="lastname"
								rules={[
									{
										required: true,
										message: "This field is required",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} md={5}>
							<Form.Item label="Extension" name="extension">
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} md={4}>
							<Form.Item label="Nickname" name="nickname">
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Divider />
					<Row gutter={12}>
						<Col xs={24} md={6}>
							<Form.Item
								label="Sex"
								name="sex"
								rules={[
									{
										required: true,
										message: "This field is required",
									},
								]}
							>
								<Select placeholder="Select sex" style={{ width: "100%" }}>
									<Select.Option value="Male">Male</Select.Option>
									<Select.Option value="Female">Female</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} md={6}>
							<Form.Item label="Civil Status" name="civil_status">
								<Select
									placeholder="Select civil status"
									style={{ width: "100%" }}
									showSearch
									filterOption={(input, option: any) =>
										option.searchvalue
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
									<Select.Option value="Single" searchvalue="Single">
										Single
									</Select.Option>
									<Select.Option value="Married" searchvalue="Married">
										Married
									</Select.Option>
									<Select.Option value="Widowed" searchvalue="Widowed">
										Widowed
									</Select.Option>
									<Select.Option value="Separated" searchvalue="Separated">
										Separated
									</Select.Option>
								</Select>
							</Form.Item>
						</Col>

						<Col xs={24} md={6}>
							<Form.Item label="Nationality" name="nationality">
								<AutoComplete
									filterOption={(input, option: any) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
									style={{ width: "100%" }}
								>
									{nationality && (
										<>
											{nationality.map((nationality: any, key) => {
												return (
													<AutoComplete.Option
														value="Afghan"
														key={`nationality${key}`}
													>
														{nationality.nationality}
													</AutoComplete.Option>
												);
											})}
										</>
									)}
								</AutoComplete>
							</Form.Item>
						</Col>

						<Col xs={24} md={6}>
							<Form.Item label="Ethnicity" name="ethnicity">
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item
								label="Barangay"
								name="barangay_id"
								// tooltip="This is a required field"
								rules={[
									{
										required: true,
										message: "This is a required field",
									},
								]}
							>
								<Select
									style={{ width: "100%" }}
									placeholder="Select barangay"
									showSearch
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
						<Col xs={24} md={6}>
							<Form.Item
								label="Date of Birth (YYYY-MM-DD)"
								name="date_of_birth"
								rules={[
									{
										required: true,
										message: "This field is required",
									},
								]}
							>
								<DatePicker
									style={{ width: "100%" }}
									disabledDate={disabledDate}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Divider />
					{/* <Row gutter={12}>
                        <Col xs={24} md={12}>
                            <Space direction="horizontal">
                                <Typography.Text strong>Waiver</Typography.Text>
                                <Checkbox indeterminate={waiverIndeterminate} onChange={handleWaiverCheckAllChange} checked={waiverCheckAll}>
                                    Check all
                                </Checkbox>
                                <Form.Item
                                    // label="Waiver"
                                    name="waiver"
                                    className="m-t-md"
                                    valuePropName="checked"
                                >
                                    <Checkbox.Group
                                        options={waiverOptions}
                                        value={waiverCheckedList}
                                        onChange={handleChangeWaiver}
                                    />
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row> */}
					<div className="text-right">
						<Button
							type="primary"
							htmlType="button"
							onClick={(e) => prev()}
							danger
						>
							<LeftOutlined />
							Back
						</Button>
						<Button type="primary" htmlType="submit">
							Proceed <RightOutlined />
						</Button>
					</div>
				</Form>
			</Card>
		</Layout.Content>
	);
};

export default ApplicationTab;
