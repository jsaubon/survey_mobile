import { useState } from "react";
import ImgCrop from "antd-img-crop";
import { Button, Col, message, Row, Upload } from "antd";
import {
	LeftOutlined,
	PlusCircleOutlined,
	PlusOutlined,
	RightOutlined,
} from "@ant-design/icons";

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}

const UploadFileTab = (props) => {
	const [fileList, setFileList] = useState([]);
	const [videoList, setVideoList] = useState([]);

	const beforeUpload = (file) => {
		let error = false;

		const isValid = file.type === "image/jpeg" || file.type === "image/png";

		if (!isValid) {
			message.error("You can only upload JPG or PNG file!");
			error = Upload.LIST_IGNORE;
		}

		return error;
	};

	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
		props.setDataPreview({ ...props.dataPreview, fileList: newFileList });
	};

	const onPreview = async (file) => {
		let src = file.url;

		if (!src && !file.type === "video/mp4") {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});

			const image = new Image();
			image.src = src;
			const imgWindow = window.open(src);
			imgWindow.document.write(image.outerHTML);
		}
	};

	const beforeUploadVideo = (file) => {
		let error = false;

		const isJpgOrPng = file.type === "video/mp4";

		if (!isJpgOrPng) {
			message.error("You can only upload MP4 file!");
			error = Upload.LIST_IGNORE;
		}

		const isLt32M = file.size / 1024 / 1024 <= 32;

		if (!isLt32M) {
			message.error("Video size must smaller than or equal to 32MB!");
			error = Upload.LIST_IGNORE;
		}

		let duration = 0;
		let vid = document.createElement("video");
		let fileURL = URL.createObjectURL(file);
		vid.src = fileURL;

		vid.ondurationchange = function () {
			duration = this.duration;
		};

		let isDuration = duration <= 60;

		if (!isDuration) {
			message.error("Video duration must smaller than or equal to 60s!");
			error = Upload.LIST_IGNORE;
		}

		return error;
	};

	const onChangeVideo = ({ fileList: newFileList }) => {
		setVideoList(newFileList);
		props.setDataPreview({ ...props.dataPreview, fileList: newFileList });
	};

	const handleProceed = () => {
		console.log("====================================");
		console.log("props.dataPreview", props.dataPreview);
		console.log("====================================");
	};

	return (
		<Row>
			<Col span={24}>
				<ImgCrop rotate>
					<Upload
						listType="picture-card"
						fileList={fileList}
						beforeUpload={beforeUpload}
						onChange={onChange}
						onPreview={onPreview}
					>
						{"+ Upload"}
					</Upload>
				</ImgCrop>
			</Col>
			<Col span={24}>
				<Upload
					listType="picture-card"
					fileList={videoList}
					className="avatar-uploader"
					showUploadList={false}
					beforeUpload={beforeUploadVideo}
					onChange={onChangeVideo}
				>
					{"+ Upload"}
				</Upload>
			</Col>
			<Col span={24}>
				<Button type="primary" onClick={(e) => props.prev()} danger>
					<LeftOutlined />
					Back
				</Button>
				<Button type="primary" onClick={() => handleProceed()}>
					Proceed <RightOutlined />
				</Button>
			</Col>
		</Row>
	);
};

export default UploadFileTab;
