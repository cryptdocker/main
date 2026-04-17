import { useEffect, useState } from "react";
import { RiRobot2Line } from "react-icons/ri";

export const TradeGPTBadge: React.FC = () => {
	const [position, setPosition] = useState("-left-41");

	useEffect(() => {
		setTimeout(() => {
			setPosition("left-6");
		}, 1500);
	}, []);

	return (
		<button
			type="button"
			onClick={() =>
				window.open(
					"https://trade.cryptdocker.com",
					"_blank",
					"noopener,noreferrer",
				)
			}
			className={`fixed ${position} top-[calc(50vh-31px)] z-50 transition-all duration-300`}
			aria-label="Open TradeGPT">
			<span className="group relative inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-dark-surface/90 backdrop-blur-xl p-3 shadow-xl shadow-black/40">
				<span
					aria-hidden="true"
					className="pointer-events-none absolute -inset-2 rounded-3xl bg-violet-500/25 blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-95"
				/>
				<span
					aria-hidden="true"
					className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-violet-400/20 transition-colors duration-300 group-hover:ring-violet-300/40"
				/>
				<span className="flex flex-col items-start leading-tight">
					<span className="text-sm font-semibold text-white">TradeGPT</span>
					<span className="text-xs text-slate-400">
						Dedicated GPT for traders
					</span>
				</span>
				<span className="relative w-9 h-9 rounded-xl bg-linear-to-br from-violet-600 to-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/30 ring-1 ring-white/10 transition-shadow duration-300 group-hover:shadow-violet-400/60">
					<span
						aria-hidden="true"
						className="pointer-events-none absolute -inset-2 rounded-2xl bg-violet-400/30 blur-xl opacity-70 transition-opacity duration-300 group-hover:opacity-100"
					/>
					<RiRobot2Line className="w-5 h-5 text-white" />
				</span>
			</span>
		</button>
	);
};
