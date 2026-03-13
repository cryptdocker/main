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
		gradient: "from-teal-500 to-emerald-500",
	},
	{
		title: "Risk Analysis",
		description:
			"Evaluate any site's safety with AI-powered risk scores, detailed summaries, and security annotations before you connect.",
		icon: <IoShieldCheckmarkOutline className="w-7 h-7" />,
		gradient: "from-cyan-500 to-blue-500",
	},
	{
		title: "News Analysis",
		description:
			"Stay informed with AI-curated news for each site. Get sentiment analysis, key takeaways, and custom keyword alerts.",
		icon: <IoNewspaperOutline className="w-7 h-7" />,
		gradient: "from-violet-500 to-purple-500",
	},
];

export const AITools: React.FC = () => {
	return (
		<section id="ai" className="py-24 bg-slate-50/70">
			<div className="max-w-6xl mx-auto px-6">
				<SectionHeading
					label="AI-Powered"
					title="Intelligence Built In"
					description="Make smarter decisions with AI tools integrated directly into your workflow."
				/>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{tools.map((tool) => (
						<div
							key={tool.title}
							className="relative group rounded-2xl bg-white border border-slate-100 p-8 hover:shadow-xl transition-all duration-300 overflow-hidden"
						>
							<div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 from-teal-500 to-cyan-500" />
							<div
								className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} text-white flex items-center justify-center mb-6`}
							>
								{tool.icon}
							</div>
							<h3 className="text-xl font-bold text-slate-900 mb-3">
								{tool.title}
							</h3>
							<p className="text-slate-500 leading-relaxed">
								{tool.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
