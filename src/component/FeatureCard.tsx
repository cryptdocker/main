import type { ReactNode } from "react";

interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
	icon,
	title,
	description,
}) => {
	return (
		<div className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-teal-200 hover:shadow-lg transition-all duration-300">
			<div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors duration-300">
				{icon}
			</div>
			<h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
			<p className="text-slate-500 leading-relaxed text-[15px]">
				{description}
			</p>
		</div>
	);
};
