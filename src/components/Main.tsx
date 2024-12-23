import { useEffect, useState } from "react";
import Header from "./Header";

const Main: React.FC = () => {
	// for starting timer
	const [isTiming, setIsTiming] = useState<boolean>(false);
	// for displaying time left
	const [timeLeft, setTimeLeft] = useState<number>(120);

	// play sound
	function playAlert() {
		const sound = new Audio("../public/audio/chime.wav");
		sound.play();
	}

	// run when isTiming updates
	useEffect(() => {
		let timer: number | null = null;
		let countdown: number | null = null;

		if (isTiming) {
			// set countdown value on start
			setTimeLeft(120);

			// play sound on start
			playAlert();
			// then play sound every 2 minutes
			timer = window.setInterval(playAlert, 120000);

			// update countdown value
			countdown = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev > 1) {
						// decrease by 1 each second
						return prev - 1;
					} else {
						// reset timer at zero
						return 120;
					}
				});
			}, 1000);
		}

		return () => {
			//  cleanup on unmount
			if (timer) clearInterval(timer);
			if (countdown) clearInterval(countdown);
		};
	}, [isTiming]);

	//  event listener for keydown
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			//  hitting enter starts timer
			if (event.key == "Enter") setIsTiming(true);
			//  hitting escape cancels timer
			if (event.key == "Escape") setIsTiming(false);
		};
		window.addEventListener("keydown", handleKeyPress);

		return () => window.removeEventListener("keydown", handleKeyPress);
	}, []);

	// format seconds
	let seconds: number | string;
	if (timeLeft % 60 == 0) {
		seconds = "00";
	} else if (timeLeft % 60 < 10) {
		seconds = `0${timeLeft % 60}`;
	} else {
		seconds = timeLeft % 60;
	}

	return (
		<main className="bg-slate-100 h-full">
			<Header />
			<div className="container mx-auto flex flex-col">
				<button
					onClick={() => setIsTiming(!isTiming)}
					className="my-4 w-48 mx-auto bg-slate-500 hover:bg-orange-600 duration-150 hover:scale-110 rounded px-3 py-1 text-white"
				>
					{!isTiming ? "Start working..." : "Stop"}
				</button>
				{isTiming && (
					<div className="mx-auto flex gap-2">
						<span className="text-slate-600">
							{/* format time left MM:SS */}
							Time left:
						</span>
						<span className="text-orange-600">
							{Math.trunc(timeLeft / 60)}:{seconds}
						</span>
					</div>
				)}
			</div>
		</main>
	);
};

export default Main;
