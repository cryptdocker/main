import { IoEllipseOutline, IoSparkles } from "react-icons/io5";
import { SectionHeading } from "../component/SectionHeading";
import { PricingCard } from "../component/PricingCard";

const plans = [
	{
		name: "Free",
		price: "$0",
		description: "Perfect for getting started with CryptDocker.",
		icon: <IoEllipseOutline className="w-5 h-5" />,
		features: [
			{ text: "Up to 10 apps", included: true },
			{ text: "3 workspaces", included: true },
			{ text: "Basic notifications", included: true },
			{ text: "Session isolation", included: true },
			{ text: "AI ChatBot", included: false },
			{ text: "Risk & News analysis", included: false },
			{ text: "Chrome extensions", included: false },
			{ text: "Per-site proxies", included: false },
		],
		cta: "Download Free",
		highlighted: false,
	},
	{
		name: "Pro",
		price: "$9",
		period: "month",
		description: "Unlock the full power of CryptDocker.",
		icon: <IoSparkles className="w-5 h-5" />,
		features: [
			{ text: "Unlimited apps", included: true },
			{ text: "Unlimited workspaces", included: true },
			{ text: "Smart notifications", included: true },
			{ text: "Session isolation", included: true },
			{ text: "AI ChatBot (GPT-5)", included: true },
			{ text: "Risk & News analysis", included: true },
			{ text: "Chrome extensions", included: true },
			{ text: "Per-site proxies", included: true },
		],
		cta: "Start Pro Trial",
		highlighted: true,
	},
];

export const Pricing: React.FC = () => {
	return (
		<section id="pricing" className="py-24 bg-white">
			<div className="max-w-6xl mx-auto px-6">
				<SectionHeading
					label="Pricing"
					title="Simple, Transparent Pricing"
					description="Start free, upgrade when you're ready. Pay with crypto or card."
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
					{plans.map((plan) => (
						<PricingCard key={plan.name} {...plan} />
					))}
				</div>
				<div className="text-center mt-10">
					<div className="inline-flex items-center gap-4 text-sm text-slate-400">
						<span>Accepted payments:</span>
						<div className="flex items-center gap-2">
							{["USDT", "USDC", "Visa", "Mastercard"].map((method) => (
								<span
									key={method}
									className="px-2.5 py-1 rounded bg-slate-100 text-slate-500 text-xs font-medium"
								>
									{method}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
