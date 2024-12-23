import { useEffect, useState } from "react";
import Header from "./Header";

// TODO:
// - visual countdown
// - connect db, send time to db
// - calendar tracker

const Main: React.FC = () => {
	const [isTiming, setIsTiming] = useState<boolean>(false);

  // play sound
	function playAlert() {
		const sound = new Audio('../public/audio/ding.mp3');
		sound.play();
	}

	useEffect(() => {
		let timer: number | null = null;

		if (isTiming) {
      // play sound on start
      playAlert();
      // then play sound every 2 minutes
			timer = window.setInterval(playAlert, 120000);
		}

		return () => {
			if (timer) {
				clearInterval(timer);
			}
		};
	}, [isTiming]);

	return (
		<main>
			<Header />
			<div className="container">
				<button onClick={() => setIsTiming(!isTiming)}>
					{!isTiming ? "Start working..." : "Stop"}
				</button>
			</div>
		</main>
	);
};

export default Main;
