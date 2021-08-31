import { IonCard, IonCol, IonGrid, IonRow } from "@ionic/react";
import {
	EllipsisOutlined,
	ExceptionOutlined,
	FormOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<IonGrid>
			<IonRow style={{ margin: "0px" }}>
				<IonCol size="4">
					<Link to="/application">
						<IonCard
							style={{
								margin: "0px",
								padding: "20px",
								height: "150px",
								verticalAlign: "middle",
							}}
						>
							<FormOutlined style={{ fontSize: "20px" }} />
							<p>DOST APPLICATION FORM</p>
						</IonCard>
					</Link>
				</IonCol>
				<IonCol size="4">
					<Link to="/complain">
						<IonCard
							style={{
								margin: "0px",
								padding: "20px",
								height: "150px",
								verticalAlign: "middle",
							}}
						>
							<ExceptionOutlined style={{ fontSize: "20px" }} />
							<p>COMPLAINT</p>
						</IonCard>
					</Link>
				</IonCol>
				<IonCol size="4">
					<Link to="/others">
						<IonCard
							style={{
								margin: "0px",
								padding: "20px",
								height: "150px",
								verticalAlign: "middle",
							}}
						>
							<EllipsisOutlined style={{ fontSize: "20px" }} />
							<p>OTHERS</p>
						</IonCard>
					</Link>
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default Navigation;
