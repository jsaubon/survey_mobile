import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IonCard, useIonToast } from "@ionic/react";
import { useQuery } from "react-query";
import { Carousel } from "antd";
import axios from "axios";
import getStorage from "../../../providers/getStorage";
import setStorage from "../../../providers/setStorage";
import moment from "moment";

import PCIEERDImage from "../../../assets/img/PCIEERD-PNG.png";
import getApiUrl from "../../../providers/getApiUrl";
import getApiKey from "../../../providers/getApiKey";

const Bulletins = () => {
	const [present, dismiss] = useIonToast();

	let history = useHistory();
	const [mobileBulletins, setMobileBulletins] = useState([]);

	const { data: dataMobileBulletins, refetch: refetchDataMobileBulletins } =
		useQuery(
			"bulletins",
			() =>
				axios
					.get(`${getApiUrl()}/api/mobile/mobile_bulletin`, {
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
						setStorage("bulletins", JSON.stringify(res.data));
						setMobileBulletins(res.data);
					} else {
						present({
							color: "danger",
							position: "middle",
							buttons: [{ text: "hide", handler: () => dismiss() }],
							message: "Connected Failed",
							onDidDismiss: () => console.log("dismissed"),
							onWillDismiss: () => console.log("will dismiss"),
						});
					}
				},
				onError: (err) => {
					present({
						color: "danger",
						position: "middle",
						buttons: [{ text: "hide", handler: () => dismiss() }],
						message: "Connected Failed",
						onDidDismiss: () => console.log("dismissed"),
						onWillDismiss: () => console.log("will dismiss"),
					});

					getStorage("bulletins").then((res: any) => {
						if (res) {
							console.log("failed bulletins", JSON.parse(res));
							setMobileBulletins(JSON.parse(res));
						}
					});
				},
			}
		);

	useEffect(() => {
		refetchDataMobileBulletins();
	}, []);

	useEffect(() => {
		return history.listen((location) => {
			console.log(`You changed the page to: ${location.pathname}`);
			if (location.pathname === "/home") {
				refetchDataMobileBulletins();
			}
		});
	}, [history]);

	const handleRenderContent = () => {
		if (mobileBulletins.length !== 0) {
			return dataMobileBulletins.data
				.filter(
					(p: any) =>
						moment(p.date_start).unix() <= moment().unix() &&
						moment(p.date_end).unix() >= moment().unix()
				)
				.map((bulletin: any, bulletin_key: any) => {
					return (
						<div key={bulletin_key}>
							<img
								alt={bulletin.image_path}
								src={getApiUrl() + "/" + bulletin.image_path}
							/>
						</div>
					);
				});
		} else {
			return (
				<div>
					<img alt="PCIEERD" src={PCIEERDImage} style={{ width: "100%" }} />
				</div>
			);
		}
	};

	return (
		<IonCard style={{ padding: "10px" }}>
			<Carousel>{handleRenderContent()}</Carousel>
		</IonCard>
	);
};

export default Bulletins;
