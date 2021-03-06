import { useState } from "react";
import { Button, Card, Col, message, Modal, Row, Upload } from "antd";
import {
	ExclamationCircleOutlined,
	InboxOutlined,
	RightOutlined,
} from "@ant-design/icons";

function getBase64(file, callback) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => callback(reader.result);
}

const { confirm } = Modal;

const UploadFileTab = (props) => {
	const [fileList, setFileList] = useState([]);
	const [fileListPreview, setFileListPreview] = useState([]);

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
			// console.log("info", info);
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
		console.log("fileList", fileList);
		if (fileList && fileList.length !== 0) {
			props.setDataPreview({ ...props.dataPreview, fileList });
			props.next();
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
					onClick={() => handleProceed()}
					style={{ marginLeft: "10px" }}
				>
					Proceed <RightOutlined />
				</Button>
			</Col>
		</Row>
	);
};

export default UploadFileTab;
