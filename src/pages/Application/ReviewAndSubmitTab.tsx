import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	LeftOutlined,
	Loading3QuartersOutlined,
	LoadingOutlined,
	PlusCircleOutlined,
	PlusOutlined,
	QuestionCircleOutlined,
	RightOutlined,
	SaveOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import {
	AutoComplete,
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	notification,
	Select,
	Divider,
	Collapse,
	Tooltip,
	Checkbox,
	Space,
	Typography,
	Layout,
	message,
	Upload,
	Row,
	Tag,
	Alert,
} from "antd";
import moment from "moment";
import Webcam from "react-webcam";
// import useAxiosQuery from "../../../providers/useAxiosQuery";
import defaultpng from "./default.png";
// import getUserData from "../../../providers/getUserData";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import getStorage from "../../providers/getStorage";
import setStorage from "../../providers/setStorage";
import { useMutation, useQuery } from "react-query";

const videoConstraints = {
	width: 220,
	height: 200,
	facingMode: "user",
};

function getBase64(img: any, callback: any) {
	console.log("img", img.originFileObj);
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img.originFileObj);
}
interface ApplicationProps {
	next: any;
	prev: any;
}
const ReviewAndSubmitTab: React.FC<ApplicationProps> = ({ next, prev }) => {
	const [applicationData, setApplicationData] = useState<any>();
	useEffect(() => {
		if (applicationData) {
			console.log("applicationData", applicationData);
			let appData = {
				...applicationData,
				date_of_birth: moment(applicationData.date_of_birth),
			};
			setUploadPic({ ...uploadPic, imageUrl: applicationData.picture });
			formMemOtherInfo.setFieldsValue(appData);
		}
		return () => {};
	}, [applicationData]);
	const [barangays, setBarangays] = useState<any>([]);
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
					setStorage("application_barangays", JSON.stringify(res.data.barangays));
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
			}
		}
		return () => {};
	}, [apiUrl, apiKey]);
	let history = useHistory();

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
	const {
		mutate: mutateUpdateMemberOtherInfo,
		isLoading: isLoadingMutateUpdateMemberOtherInfo,
		isError: isErrorMutateUpdateMemberOtherInfo,
		isSuccess: isSuccessMutateUpdateMemberOtherInfo,
	} = useMutation((data: Variables) => {
		return axios
			.post(`${apiUrl}/api/mobile/household_member`, data, {
				headers: {
					Authorization: apiKey,
				},
			})
			.then((res) => res.data);
	});

	const handleSubmit = () => {
		mutateUpdateMemberOtherInfo(applicationData, {
			onSuccess: (res) => {
				if (res.success) {
					setStorage("applicationData", null);
				} else {
				}
			},
			onError: (err) => {
				console.log("err", err);
			},
		});
	};

	return (
		<Layout.Content className="ant-layout-main-content">
			<Card title="Review & Submit" style={{ textAlign: "left" }}>
				{applicationData && (
					<>
						<Row gutter={12}>
							<Col span={24} style={{ textAlign: "center" }}>
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
								<Divider />
							</Col>

							<Col xs={8}>
								First Name: <br />
								<Tag>
									{applicationData.firstname ? applicationData.firstname : "N/A"}
								</Tag>
							</Col>

							<Col xs={8}>
								Middle Name: <br />
								<Tag>
									{applicationData.middlename ? applicationData.middlename : "N/A"}
								</Tag>
							</Col>

							<Col xs={8}>
								Last Name: <br />
								<Tag>{applicationData.lastname ? applicationData.lastname : "N/A"}</Tag>
							</Col>

							<Col xs={8}>
								Extionsion: <br />
								<Tag>
									{applicationData.extension ? applicationData.extension : "N/A"}
								</Tag>
							</Col>
							<Col xs={8}>
								Nickname: <br />
								<Tag>{applicationData.nickname ? applicationData.nickname : "N/A"}</Tag>
							</Col>
							<Col xs={8}>
								Nickname: <br />
								<Tag>{applicationData.nickname ? applicationData.nickname : "N/A"}</Tag>
							</Col>
							<Col xs={8}>
								Sex: <br />
								<Tag>{applicationData.sex ? applicationData.sex : "N/A"}</Tag>
							</Col>
							<Col xs={8}>
								Civil Status: <br />
								<Tag>
									{applicationData.civil_status ? applicationData.civil_status : "N/A"}
								</Tag>
							</Col>
							<Col xs={8}>
								Nationality: <br />
								<Tag>
									{applicationData.nationality ? applicationData.nationality : "N/A"}
								</Tag>
							</Col>
							<Col xs={8}>
								Ethnicity: <br />
								<Tag>
									{applicationData.ethnicity ? applicationData.ethnicity : "N/A"}
								</Tag>
							</Col>
							<Col xs={8}>
								Barangay: <br />
								<Tag>
									{barangays.length > 0 && applicationData.barangay_id
										? barangays.find((p: any) => p.id == applicationData.barangay_id)
												.barangay
										: "N/A"}
								</Tag>
							</Col>
							<Col xs={8}>
								Date of Birth: <br />
								<Tag>
									{applicationData.date_of_birth ? applicationData.date_of_birth : "N/A"}
								</Tag>
							</Col>
						</Row>
						<Divider />
						{isSuccessMutateUpdateMemberOtherInfo && (
							<Alert
								type="success"
								message="Application Successfully Submitted"
								style={{ textAlign: "center" }}
							/>
						)}
						{isErrorMutateUpdateMemberOtherInfo && (
							<Alert
								type="error"
								message="Application Submission Failed, please try again"
								style={{ textAlign: "center" }}
							/>
						)}
						<div style={{ textAlign: "center", marginTop: 20 }}>
							<Button type="primary" htmlType="button" onClick={(e) => prev()} danger>
								<LeftOutlined />
								Back
							</Button>
							<Button
								type="primary"
								htmlType="button"
								onClick={(e) => handleSubmit()}
								loading={isLoadingMutateUpdateMemberOtherInfo}
							>
								Submit <UploadOutlined />
							</Button>
						</div>
					</>
				)}
			</Card>
		</Layout.Content>
	);
};

export default ReviewAndSubmitTab;
