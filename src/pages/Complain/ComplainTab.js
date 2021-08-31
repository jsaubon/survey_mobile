import { useEffect, useState } from "react";

import {
	Col,
	Form,
	Input,
	Row,
	Select,
	message,
	InputNumber,
	Button,
	Modal,
} from "antd";
import { ExclamationCircleOutlined, RightOutlined } from "@ant-design/icons";

import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import getStorage from "../../providers/getStorage";
import setStorage from "../../providers/setStorage";
import getApiUrl from "../../providers/getApiUrl";
import getApiKey from "../../providers/getApiKey";

const { confirm } = Modal;

const ComplainTab = (props) => {
	const [form] = Form.useForm();
	const [barangays, setBarangays] = useState([]);
	let history = useHistory();

	type Variables = {
		complainant_name: any,
		complain: any,
		contact_no: any,
		email_address: any,
		barangay_id: any,
		countFiles: any,
	};
	const {
		mutate: mutateCreateComplain,
		isLoading: isLoadingCreateComplain,
		isError: isErrorCreateComplain,
		isSuccess: isSuccessCreateComplain,
	} = useMutation((data: Variables) => {
		return axios
			.post(`${getApiUrl()}/api/mobile/complain`, data, {
				headers: {
					Authorization: getApiKey(),
				},
			})
			.then((res) => res.data);
	});

	const {
		data: dataBarangay,
		isLoading: isLoadingDataBarangay,
		refetch: refetchDataBarangay,
		isFetching: isFetchingDataBarangay,
	} = useQuery(
		"complain_barangays",
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
					setStorage("complain_barangays", JSON.stringify(res.data.barangays));
					setBarangays(res.data.barangays);
					// message.success("success");
				} else {
					message.error("Connected Failed");
				}
			},
			onError: (err) => {
				message.error("Connected Failed");
				getStorage("complain_barangays").then((res) => {
					if (res) {
						console.log("failed complain_barangays", JSON.parse(res));
						setBarangays(JSON.parse(res));
					}
				});
				// message.error(JSON.stringify(err));
			},
		}
	);

	const onFinish = (values) => {
		props.setDataPreview({ ...props.dataPreview, ...values });

		confirm({
			title: "Do you want to submit these data?",
			icon: <ExclamationCircleOutlined />,
			content: "",
			onOk() {
				const data = new FormData();
				if (values && values.complainant_name) {
					data.append("complainant_name", values.complainant_name);
				}
				if (values && values.complain) {
					data.append("complain", values.complain);
				}
				if (values && values.contact_no) {
					data.append("contact_no", values.contact_no);
				}
				if (values && values.email_address) {
					data.append("email_address", values.email_address);
				}
				if (values && values.barangay_id) {
					data.append("barangay_id", values.barangay_id);
				}

				data.append("countFiles", props.dataPreview.fileList.length);

				if (props.dataPreview.fileList.length !== 0) {
					for (let i = 0; i < props.dataPreview.fileList.length; i++) {
						const el = props.dataPreview.fileList[i];
						data.append("files_" + i, el.originFileObj, el.name);
					}
				}

				setStorage("complainData", JSON.stringify(data));

				mutateCreateComplain(data, {
					onSuccess: (res) => {
						if (res.success) {
							message.success("Send successfully!");
							setStorage("complainData", null);
							history.push("/");
						}
					},
					onError: (err) => {
						message.error(err);
						console.log("err", err);
						setStorage("complainData", JSON.stringify(data));
					},
				});
			},
			onCancel() {
				message.error("Cancel");
				console.log("Cancel");
			},
		});
	};

	useEffect(() => {
		refetchDataBarangay();

		// getStorage("complainData").then((res) => {
		// 	if (res) {
		// 		props.setDataPreview(JSON.parse(res));
		// 	}
		// });
	}, []);

	return (
		<Form layout="vertical" form={form} onFinish={onFinish}>
			<Row gutter={24}>
				<Col className="gutter-row" xs={24} sm={12}>
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
						<Input type="text" placeholder="Input" />
					</Form.Item>
				</Col>
				<Col className="gutter-row" xs={24} sm={12}>
					<Form.Item
						name="complain"
						label="Complain"
						rules={[
							{
								required: true,
								message: "Complain is Invalid",
							},
						]}
					>
						<Input.TextArea placeholder="Input" />
					</Form.Item>
				</Col>

				<Col className="gutter-row" xs={24} sm={12}>
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
						<InputNumber placeholder="Input" style={{ width: "100%" }} />
					</Form.Item>
				</Col>

				<Col className="gutter-row" xs={24} sm={12}>
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
						<Input type="email" placeholder="Input" />
					</Form.Item>
				</Col>

				<Col className="gutter-row" xs={24} sm={12}>
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
							placeholder="Select barangay"
							showSearch
							filterOption={(input, option) =>
								option.searchvalue.toLowerCase().indexOf(input.toLowerCase()) >=
								0
							}
						>
							{barangays &&
								barangays.map((barangay, key) => {
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

				<Col className="gutter-row" xs={24} sm={12}>
					<Form.Item name="description" label="Description">
						{/* <Input name="description" type="text" /> */}
						<Input.TextArea rows={5} placeholder="Input" />
					</Form.Item>
				</Col>

				<Col className="gutter-row" xs={24} sm={24}>
					<Button type="primary" htmlType="submit">
						Proceed <RightOutlined />
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default ComplainTab;
