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
	Card,
	Upload,
} from "antd";
import {
	ExclamationCircleOutlined,
	InboxOutlined,
	RightOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import getStorage from "../../providers/getStorage";
import setStorage from "../../providers/setStorage";
import getApiUrl from "../../providers/getApiUrl";
import getApiKey from "../../providers/getApiKey";

const { confirm } = Modal;

function getBase64(file: any, callback: any) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => callback(reader.result);
}

const ComplainForm = () => {
	const [data, setData] = useState<any>([]);
	const [dataFileList, setDataFileList] = useState<any>([]);
	const [dataFileListPreview, setDataFileListPreview] = useState<any>([]);
	const [form] = Form.useForm();
	const [barangays, setBarangays] = useState<any>([]);
	let history = useHistory();

	type Variables = {
		complainant_name: any;
		complain: any;
		contact_no: any;
		email_address: any;
		barangay_id: any;
		countFiles: any;
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

	const onFinish = (values: any) => {
		setData({ ...data, ...values });

		confirm({
			title: "Do you want to submit these data?",
			icon: <ExclamationCircleOutlined />,
			content: "",
			onOk() {
				let formData = {
					...values,
					countFiles: dataFileList.length,
					...dataFileList,
				};

				// formData.push({countFiles: dataFileList.length});

				// if (dataFileList.length !== 0) {
				// 	for (let i = 0; i < dataFileList.length; i++) {
				// 		const el = dataFileList[i];
				// 		formData.append("files_" + i, el.originFileObj, el.name);
				//         formData.push({files_+i: el.originFileObj});
				// 	}
				// }

				if (dataFileList.length !== 0) {
					setStorage("complainData", JSON.stringify(formData));

					mutateCreateComplain(formData, {
						onSuccess: (res) => {
							if (res.success) {
								message.success("Send successfully!");
								setStorage("complainData", null);
								history.push("/");
							}
						},
						onError: (err: any) => {
							message.error(err);
							console.log("err", err);
							setStorage("complainData", JSON.stringify(data));
						},
					});
				} else {
					confirm({
						title: "WARNING",
						icon: <ExclamationCircleOutlined />,
						content: "Please add files. (PNG, JPEG or MP4)",
						cancelButtonProps: { style: { display: "none" } },
						onOk() {
							console.log("Oks");
						},
					});
				}
			},
			onCancel() {
				message.error("Cancel");
				console.log("Cancel");
			},
		});
	};

	const uploadProps = {
		name: "files",
		multiple: true,
		showUploadList: false,
		beforeUpload(file: any) {
			let error;

			const isValid =
				file.type === "image/jpeg" ||
				file.type === "image/png" ||
				file.type === "video/mp4";

			if (!isValid) {
				message.error("You can only upload JPG or PNG or MP4 file!");
				error = Upload.LIST_IGNORE;
			}

			return error;
		},
		onChange(info: any) {
			console.log("info", info.fileList);
			setDataFileList(info.fileList);
			setDataFileListPreview([]);
			info.fileList.map((item: any) => {
				getBase64(item.originFileObj, (res: any) => {
					let newData = { src: res, type: item.type, name: item.name };
					setDataFileListPreview((dataFileListPreview: any) => [
						...dataFileListPreview,
						newData,
					]);
				});
				return "";
			});
		},
	};

	const handleRenderFileList = () => {
		if (dataFileList.length !== 0) {
			return (
				<Col span={24} style={{ marginBottom: "10px" }}>
					<Card>
						<Row gutter={12}>
							{dataFileListPreview.map((item: any, index: any) => {
								// console.log("item, index", item, index);

								if (item.type === "video/mp4") {
									return (
										<Col span={12} key={index}>
											<video style={{ width: "100%" }} controls>
												<source src={item.src} />
											</video>
										</Col>
									);
								} else {
									return (
										<Col span={12} key={index}>
											<img
												alt={item.name}
												src={item.src}
												style={{ width: "100%", height: "100%" }}
											/>
										</Col>
									);
								}
							})}
						</Row>
					</Card>
				</Col>
			);
		} else {
			return "";
		}
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
							filterOption={(input, option: any) =>
								option.searchvalue.toLowerCase().indexOf(input.toLowerCase()) >=
								0
							}
						>
							{barangays &&
								barangays.map((barangay: any, key: any) => {
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

				<Col span={24} style={{ marginBottom: "10px" }}>
					<Upload.Dragger {...uploadProps}>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							Click or drag file to this area to upload
						</p>
						<p className="ant-upload-hint">
							Support for a single or bulk upload. Strictly prohibit from
							uploading company data or other band files
						</p>
					</Upload.Dragger>
				</Col>

				{handleRenderFileList()}

				<Col className="gutter-row text-center" xs={24} sm={24}>
					<Button type="primary" htmlType="submit">
						SUBMIT
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default ComplainForm;
