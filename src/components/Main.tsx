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
		// for interval id
		let timer: number | null = null;

		if (isTiming) {
			// play sound on start
			playAlert();
			// reset time
			setTimeLeft(120);

			// define time when timer ends
			let endTime = Date.now() + timeLeft * 1000;

			//  start timer
			timer = window.setInterval(() => {
				// check time remaining
				// find difference between end time and present
				// divide by 1000 to get seconds remaining
				// if less than zero, return zero
				const timeRemaining = Math.max(
					Math.ceil((endTime - Date.now()) / 1000),
					0
				);

				if (timeRemaining == 0) {
					// if zero play sound, reset time to 120s and recalc endtime
					playAlert();
					setTimeLeft(120);
					endTime = Date.now() + timeLeft * 1000;
				} else {
					// else decrease time left by 1 second
					setTimeLeft((prev) => prev - 1);
				}
			}, 1000);
		}

		return () => {
			//  cleanup on unmount
			if (timer) clearInterval(timer);
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

	//  format time left to display mm:ss
	const minutes = Math.floor(timeLeft / 60);
	const seconds = String(timeLeft % 60).padStart(2, "0");

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
							{/* format time left mm:ss */}
							Time left:
						</span>
						<span className="text-orange-600">
							{minutes}:{seconds}
						</span>
					</div>
				)}
			</div>
		</main>
	);
};

export default Main;
