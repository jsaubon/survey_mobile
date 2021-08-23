import { useState } from "react";
import ImgCrop from "antd-img-crop";
import { Button, Col, message, Row, Upload } from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";

const UploadFileTab = (props) => {
	const [fileList, setFileList] = useState([]);

	const beforeUpload = (file) => {
		let error = false;

		const isValid =
			file.type === "image/jpeg" ||
			file.type === "image/png" ||
			file.type === "video/mp4";

		if (!isValid) {
			message.error("You can only upload JPG, PNG or mp4 file!");
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
						{fileList.length < 5 && "+ Upload"}
					</Upload>
				</ImgCrop>
			</Col>
			<Col span={24}>
				<Button type="primary" onClick={(e) => props.prev()} danger>
					<LeftOutlined />
					Back
				</Button>
				<Button type="primary" onClick={() => handleProceed()}>
					Proceed
				</Button>
			</Col>
		</Row>
	);
};

export default UploadFileTab;
