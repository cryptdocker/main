import type { ReactNode } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { Button } from "./Button";

interface PricingFeature {
	text: string;
	included: boolean;
}

interface PricingCardProps {
	name: string;
	price: string;
	period?: string;
	description: string;
	features: PricingFeature[];
	highlighted?: boolean;
	icon: ReactNode;
}

export const PricingCard: React.FC<PricingCardProps> = ({
	name,
	price,
	period,
	description,
	features,
	highlighted = false,
	icon,
}) => {
	return (
		<div
			className={`relative rounded-2xl p-8 transition-all duration-300 ${
				highlighted
					? "bg-white border-2 border-teal-500 shadow-xl"
					: "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg"
			}`}
		>
			{highlighted && (
				<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal-600 text-white text-xs font-semibold rounded-full">
					Most Popular
				</div>
			)}
			<div className="flex items-center gap-3 mb-4">
				<div
					className={`w-10 h-10 rounded-lg flex items-center justify-center ${highlighted ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-600"}`}
				>
					{icon}
				</div>
				<h3 className="text-xl font-bold text-slate-900">{name}</h3>
			</div>
			<p className="text-slate-500 mb-6">{description}</p>
			<div className="flex items-baseline gap-1 mb-8">
				<span className="text-4xl font-bold text-slate-900">{price}</span>
				{period && <span className="text-slate-500">/{period}</span>}
			</div>
			<ul className="space-y-3">
				{features.map((feature, i) => (
					<li key={i} className="flex items-center gap-3">
						{feature.included ? (
							<IoCheckmark className="w-5 h-5 text-teal-500 shrink-0" />
						) : (
							<IoClose className="w-5 h-5 text-slate-300 shrink-0" />
						)}
						<span
							className={
								feature.included ? "text-slate-700" : "text-slate-400"
							}
						>
							{feature.text}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};
