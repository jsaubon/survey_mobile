import { useState } from "react";
import ImgCrop from "antd-img-crop";
import { message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UploadFileTab = () => {
	const [fileList, setFileList] = useState([]);

	const beforeUpload = (file) => {
		let error;

		const isJPG = file.type === "image/jpeg" || file.type === "image/png";

		if (!isJPG) {
			message.error("You can only upload JPG or PNG file!");
			error = Upload.LIST_IGNORE;
		}

		return error;
	};

	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
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

	return (
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
	);
};

export default UploadFileTab;
