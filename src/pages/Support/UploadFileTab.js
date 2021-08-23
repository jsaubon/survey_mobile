import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { Button, Card, Col, message, Modal, Row, Upload } from "antd";
import {
	ExclamationCircleOutlined,
	InboxOutlined,
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";

import axios from "axios";
import getStorage from "../../providers/getStorage";
import setStorage from "../../providers/setStorage";

function getBase64(file, callback) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => callback(reader.result);
}

const { confirm } = Modal;

const UploadFileTab = (props) => {
	const [fileList, setFileList] = useState([]);
	const [fileListPreview, setFileListPreview] = useState([]);
	const [apiUrl, setApiUrl] = useState("");
	const [apiKey, setApiKey] = useState("");
	let history = useHistory();

	type Variables = {
		complainant_name: any,
		complain: any,
		contact_no: any,
		email_address: any,
		barangay_id: any,
		files: any,
	};
	const {
		mutate: mutateCreateComplain,
		isLoading: isLoadingCreateComplain,
		isError: isErrorCreateComplain,
		isSuccess: isSuccessCreateComplain,
	} = useMutation((data: Variables) => {
		return axios
			.post(`${apiUrl}/api/mobile/complain`, data, {
				headers: {
					Authorization: apiKey,
				},
			})
			.then((res) => res.data);
	});

	const uploadProps = {
		name: "files",
		multiple: true,
		showUploadList: false,
		beforeUpload(file) {
			let error = false;

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
		onChange(info) {
			console.log("info", info);
			setFileList(info.fileList);
			setFileListPreview([]);
			info.fileList.map((item) => {
				getBase64(item.originFileObj, (res) => {
					let newData = { src: res, type: item.type, name: item.name };
					setFileListPreview((fileListPreview) => [
						...fileListPreview,
						newData,
					]);
				});
				return "";
			});
		},
		onDrop(e) {
			// console.log("Dropped files", e.dataTransfer.files);
		},
	};

	const handleProceed = () => {
		if (fileList && fileList.length !== 0) {
			confirm({
				title: "Do you want to submit these data?",
				icon: <ExclamationCircleOutlined />,
				content: "",
				onOk() {
					props.setDataPreview({ ...props.dataPreview, fileList });

					const data = new FormData();
					if (props.dataPreview && props.dataPreview.complainant_name) {
						data.append("complainant_name", props.dataPreview.complainant_name);
					}
					if (props.dataPreview && props.dataPreview.complain) {
						data.append("complain", props.dataPreview.complain);
					}
					if (props.dataPreview && props.dataPreview.contact_no) {
						data.append("contact_no", props.dataPreview.contact_no);
					}
					if (props.dataPreview && props.dataPreview.email_address) {
						data.append("email_address", props.dataPreview.email_address);
					}
					if (props.dataPreview && props.dataPreview.barangay_id) {
						data.append("barangay_id", props.dataPreview.barangay_id);
					}

					data.append("countFiles", fileList.length);

					if (fileList.length !== 0) {
						for (let i = 0; i < fileList.length; i++) {
							const el = fileList[i];
							data.append("files_" + i, el.originFileObj, el.name);
						}
					}

					mutateCreateComplain(data, {
						onSuccess: (res) => {
							if (res.success) {
								setStorage("complainData", null);
								history.push("/");
							}
						},
						onError: (err) => {
							console.log("err", err);
						},
					});
				},
				onCancel() {
					console.log("Cancel");
				},
			});
		}

		console.log("====================================");
		console.log("props.dataPreview", props.dataPreview);
		console.log("====================================");
		console.log("====================================");
		console.log("fileList", fileList);
		console.log("====================================");
	};

	const handleRenderFileList = () => {
		if (fileList.length !== 0) {
			return (
				<Col span={24} style={{ marginBottom: "10px" }}>
					<Card>
						<Row gutter={12}>
							{fileListPreview.map((item, index) => {
								console.log("item, index", item, index);

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
		getStorage("api_url").then((res) => {
			setApiUrl(res ? res : "");
		});
		getStorage("api_key").then((res) => {
			setApiKey(res ? res : "");
		});
		getStorage("complainData").then((res) => {
			if (res) {
				props.setDataPreview(JSON.parse(res));
			}
		});
		return () => {};
	}, []);

	return (
		<Row>
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

			<Col span={24}>
				<Button
					type="primary"
					onClick={(e) => props.prev()}
					danger
					loading={isLoadingCreateComplain}
				>
					<LeftOutlined />
					Back
				</Button>
				<Button
					type="primary"
					onClick={() => handleProceed()}
					style={{ marginLeft: "10px" }}
					loading={isLoadingCreateComplain}
				>
					Submit <RightOutlined />
				</Button>
			</Col>
		</Row>
	);
};

export default UploadFileTab;
