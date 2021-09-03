import { IonCard, IonCol, IonGrid, IonRow } from "@ionic/react";
import {
	EllipsisOutlined,
	ExceptionOutlined,
	FormOutlined,
	ProfileOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<IonGrid>
			<IonRow style={{ margin: "0px" }}>
				<IonCol size="6">
					<Link to="/application">
						<IonCard
							style={{
								margin: "0px",
								padding: "20px",
								height: "155px",
								verticalAlign: "middle",
							}}
						>
							<FormOutlined
								style={{ fontSize: "50px", marginBottom: "10px" }}
							/>
							<p>DOST APPLICATION FORM</p>
						</IonCard>
					</Link>
				</IonCol>
				<IonCol size="6">
					<Link to="/complain">
						<IonCard
							style={{
								margin: "0px",
								padding: "20px",
								height: "155px",
								verticalAlign: "middle",
							}}
						>
							<ExceptionOutlined
								style={{ fontSize: "50px", marginBottom: "10px" }}
							/>
							<p>COMPLAINT</p>
						</IonCard>
					</Link>
				</IonCol>
				<IonCol size="6">
					<Link to="/survey">
						<IonCard
							style={{
								margin: "0px",
								padding: "20px",
								height: "155px",
								verticalAlign: "middle",
							}}
						>
							<ProfileOutlined
								style={{ fontSize: "50px", marginBottom: "10px" }}
							/>
							<p>SURVEY</p>
						</IonCard>
					</Link>
				</IonCol>
				<IonCol size="6">
					<Link to="/others">
						<IonCard
							style={{
								margin: "0px",
								padding: "20px",
								height: "155px",
								verticalAlign: "middle",
							}}
						>
							<EllipsisOutlined
								style={{ fontSize: "50px", marginBottom: "10px" }}
							/>
							<p>OTHERS</p>
						</IonCard>
					</Link>
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default Navigation;
