import { motion } from "framer-motion";
import {
	IoChatbubbleOutline,
	IoShieldCheckmarkOutline,
	IoNewspaperOutline,
} from "react-icons/io5";
import { SectionHeading } from "../component/SectionHeading";

const tools = [
	{
		title: "AI ChatBot",
		description:
			"Get instant answers powered by GPT-5 and web search. Ask about any crypto topic directly from your workspace.",
		icon: <IoChatbubbleOutline className="w-7 h-7" />,
		gradient: "from-violet-500 to-fuchsia-500",
		glow: "shadow-violet-500/20",
	},
	{
		title: "Real-Time Contract Auditing",
		description:
			"Audit token and dApp contracts in real time with defensive AI checks, risk scoring, and clear annotations before you connect your wallet.",
		icon: <IoShieldCheckmarkOutline className="w-7 h-7" />,
		gradient: "from-cyan-500 to-blue-500",
		glow: "shadow-cyan-500/20",
	},
	{
		title: "Market Sentiment Engine",
		description:
			"Convert headlines into signals with sentiment, key takeaways, and keyword alerts — so you can protect capital and move faster.",
		icon: <IoNewspaperOutline className="w-7 h-7" />,
		gradient: "from-amber-500 to-orange-500",
		glow: "shadow-amber-500/20",
	},
];

export const AITools: React.FC = () => {
	return (
		<section id="ai" className="relative py-24 overflow-hidden">
			<div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/4 rounded-full blur-3xl" />
			<div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl" />

			<div className="relative z-10 max-w-6xl mx-auto px-6">
				<SectionHeading
					label="AI-Powered"
					title="Defensive Intelligence"
					description="Protect your capital with AI tools built into your desktop environment — audit risk, track sentiment, and act with confidence."
				/>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{tools.map((tool, i) => (
						<motion.div
							key={tool.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5, delay: i * 0.15 }}
							whileHover={{ y: -6, transition: { duration: 0.2 } }}
							className="relative group rounded-2xl glass p-8 hover:bg-white/6 transition-all duration-500 overflow-hidden"
						>
							<div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 from-violet-500 to-cyan-500" />
							<div
								className={`w-14 h-14 rounded-2xl bg-linear-to-br ${tool.gradient} text-white flex items-center justify-center mb-6 shadow-lg ${tool.glow} group-hover:scale-105 transition-transform duration-300`}
							>
								{tool.icon}
							</div>
							<h3 className="text-xl font-bold text-white mb-3">
								{tool.title}
							</h3>
							<p className="text-slate-400 leading-relaxed">
								{tool.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};
