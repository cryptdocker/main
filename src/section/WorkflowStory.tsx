import {
	IoSpeedometerOutline,
	IoBrowsersOutline,
	IoTimeOutline,
	IoGlobeOutline,
	IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { SectionHeading } from "../component/SectionHeading";

const stats = [
	{
		label: "Tabs unified",
		value: "50+",
		icon: <IoBrowsersOutline className="w-5 h-5" />,
	},
	{
		label: "Time saved",
		value: "10+ hrs/week",
		icon: <IoTimeOutline className="w-5 h-5" />,
	},
	{
		label: "Faster workflow",
		value: "High-performance",
		icon: <IoSpeedometerOutline className="w-5 h-5" />,
	},
];

const callouts = [
	{
		title: "For the Airdrop Hunter",
		subtitle: "Operate across identities without the mess",
		icon: <IoGlobeOutline className="w-6 h-6" />,
		points: [
			"Per-site proxies to separate traffic and reduce cross-account leakage",
			"Multi-workspace setup for wallets, quests, and research — kept isolated",
		],
	},
	{
		title: "For the Day Trader",
		subtitle: "Defensive signal flow, built in",
		icon: <IoShieldCheckmarkOutline className="w-6 h-6" />,
		points: [
			"Market Sentiment Engine to turn headlines into actionable signals",
			"Real-Time Contract Auditing to evaluate risk before you connect",
		],
	},
];

export const WorkflowStory: React.FC = () => {
	return (
		<section className="py-24 bg-white">
			<div className="max-w-6xl mx-auto px-6">
				<SectionHeading
					label="Workflow"
					title="End the browser tab chaos"
					description="CryptDocker unifies your daily crypto stack into one high-performance desktop environment — so you spend less time context-switching and more time executing."
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					{stats.map((s) => (
						<div
							key={s.label}
							className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-slate-500">
									<span className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-teal-700">
										{s.icon}
									</span>
									<span className="text-sm font-medium">{s.label}</span>
								</div>
								<div className="text-xl font-extrabold text-slate-900">
									{s.value}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{callouts.map((c) => (
						<div
							key={c.title}
							className="rounded-3xl border border-slate-100 bg-white p-8 hover:shadow-xl transition-all duration-300"
						>
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
									{c.icon}
								</div>
								<div className="flex-1">
									<h3 className="text-xl font-bold text-slate-900">
										{c.title}
									</h3>
									<p className="text-slate-500 mt-1">{c.subtitle}</p>
								</div>
							</div>

							<ul className="mt-6 space-y-3 text-slate-600">
								{c.points.map((p) => (
									<li key={p} className="flex gap-3">
										<span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
										<span className="text-[15px] leading-relaxed">{p}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

