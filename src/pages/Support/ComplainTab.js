import { useEffect, useState } from "react";
import getStorage from "../../providers/getStorage";
import setStorage from "../../providers/setStorage";
import {
	Col,
	Form,
	Input,
	Row,
	Steps,
	Button,
	Select,
	message,
	InputNumber,
} from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const ComplainTab = (props) => {
	const [form] = Form.useForm();
	const [barangays, setBarangays] = useState([]);
	const [apiUrl, setApiUrl] = useState("");
	const [apiKey, setApiKey] = useState("");

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

	const onFinish = (values) => {
		console.log("values", values);
	};

	useEffect(() => {
		getStorage("api_url").then((res) => {
			setApiUrl(res ? res : "");
		});
		getStorage("api_key").then((res) => {
			setApiKey(res ? res : "");
		});

		if (apiUrl !== "") {
			if (apiKey !== "") {
				console.log("apiUrl", apiUrl);
				console.log("apiKey", apiKey);
				refetchDataBarangay();
				// refetchDataNationality();
			}
		}
	}, [apiUrl, apiKey]);

	return (
		<Form layout="vertical" form={form} onFinish={onFinish}>
			<Row gutter={24}>
				<Col className="gutter-row" span={24}>
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
				<Col className="gutter-row" span={24}>
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

				<Col className="gutter-row" span={24}>
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

				<Col className="gutter-row" span={24}>
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

				<Col className="gutter-row" span={24}>
					<Form.Item name="description" label="Description">
						{/* <Input name="description" type="text" /> */}
						<Input.TextArea rows={5} placeholder="Input" />
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default ComplainTab;
