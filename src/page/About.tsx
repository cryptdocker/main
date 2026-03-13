import { Link } from "react-router-dom";
import {
	IoRocketOutline,
	IoShieldCheckmarkOutline,
	IoPeopleOutline,
	IoSparkles,
} from "react-icons/io5";
import { PageHeader } from "../layout/PageHeader";
import { PATH } from "../const";

const values = [
	{
		icon: <IoShieldCheckmarkOutline className="w-6 h-6" />,
		title: "Security First",
		description:
			"Every decision we make starts with security. Your data, your keys, your privacy — always protected.",
	},
	{
		icon: <IoPeopleOutline className="w-6 h-6" />,
		title: "User-Centric",
		description:
			"We build for real users. Every feature is tested, refined, and shipped based on genuine community feedback.",
	},
	{
		icon: <IoRocketOutline className="w-6 h-6" />,
		title: "Innovation",
		description:
			"We integrate cutting-edge AI and modern tooling to keep you ahead in the fast-moving crypto ecosystem.",
	},
	{
		icon: <IoSparkles className="w-6 h-6" />,
		title: "Simplicity",
		description:
			"Powerful tools don't have to be complicated. We distill complexity into elegant, intuitive interfaces.",
	},
];

const milestones = [
	{ year: "2023", event: "CryptDocker founded with a vision to unify crypto workflows" },
	{ year: "2024", event: "Launched v1.0 with workspace management and Chrome extension support" },
	{ year: "2025", event: "Introduced AI-powered risk analysis, news insights, and GPT-5 chatbot" },
	{ year: "2026", event: "Expanded to 50,000+ users across 80 countries worldwide" },
];

export const About: React.FC = () => {
	return (
		<>
			<PageHeader
				label="About Us"
				title="Building the Future of Crypto Tooling"
				description="CryptDocker was born from a simple idea — managing dozens of crypto apps shouldn't be painful."
			/>

			<section className="py-20 bg-white">
				<div className="max-w-4xl mx-auto px-6">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl font-bold text-slate-900 mb-4">
								Our Mission
							</h2>
							<p className="text-slate-500 leading-relaxed mb-4">
								We believe crypto professionals and enthusiasts deserve a
								workspace as powerful as the technology they use. CryptDocker
								brings every exchange, DeFi protocol, and blockchain tool into
								one secure desktop environment.
							</p>
							<p className="text-slate-500 leading-relaxed">
								With built-in AI analysis, per-site proxy support, isolated
								sessions, and Chrome extensions — we're not just another
								browser. We're your crypto command center.
							</p>
						</div>
						<div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8">
							<div className="grid grid-cols-2 gap-6 text-center">
								<div>
									<div className="text-3xl font-bold text-teal-600">50K+</div>
									<div className="text-sm text-slate-500 mt-1">Active Users</div>
								</div>
								<div>
									<div className="text-3xl font-bold text-teal-600">80+</div>
									<div className="text-sm text-slate-500 mt-1">Countries</div>
								</div>
								<div>
									<div className="text-3xl font-bold text-teal-600">500+</div>
									<div className="text-sm text-slate-500 mt-1">Supported Apps</div>
								</div>
								<div>
									<div className="text-3xl font-bold text-teal-600">99.9%</div>
									<div className="text-sm text-slate-500 mt-1">Uptime</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-slate-50/70">
				<div className="max-w-4xl mx-auto px-6">
					<h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
						Our Values
					</h2>
					<div className="grid sm:grid-cols-2 gap-8">
						{values.map((v) => (
							<div
								key={v.title}
								className="bg-white rounded-2xl border border-slate-100 p-6"
							>
								<div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
									{v.icon}
								</div>
								<h3 className="text-lg font-semibold text-slate-900 mb-2">
									{v.title}
								</h3>
								<p className="text-slate-500 text-[15px] leading-relaxed">
									{v.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 bg-white">
				<div className="max-w-2xl mx-auto px-6">
					<h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
						Our Journey
					</h2>
					<div className="relative">
						<div className="absolute left-4 top-0 bottom-0 w-px bg-teal-200" />
						<div className="space-y-10">
							{milestones.map((m) => (
								<div key={m.year} className="relative pl-12">
									<div className="absolute left-0 w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold border-2 border-white">
										{m.year.slice(2)}
									</div>
									<div>
										<span className="text-sm font-semibold text-teal-600">
											{m.year}
										</span>
										<p className="text-slate-600 mt-1">{m.event}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 bg-slate-50/70">
				<div className="max-w-3xl mx-auto px-6 text-center">
					<h2 className="text-2xl font-bold text-slate-900 mb-3">
						Want to join our team?
					</h2>
					<p className="text-slate-500 mb-6">
						We're always looking for passionate people who love crypto and great
						software.
					</p>
					<Link
						to={PATH.CAREERS}
						className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
					>
						View Open Positions
					</Link>
				</div>
			</section>
		</>
	);
};
