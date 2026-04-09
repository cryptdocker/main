import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
	index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
	icon,
	title,
	description,
	index = 0,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
			whileHover={{ y: -4, transition: { duration: 0.2 } }}
			className="group relative p-6 rounded-2xl glass hover:bg-white/6 transition-all duration-500 overflow-hidden"
		>
			<div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-violet-500/5 to-cyan-500/5" />
			<div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-violet-500/6 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

			<div className="relative z-10">
				<div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500/20 to-cyan-500/20 text-violet-400 flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-violet-500/10 transition-all duration-300">
					{icon}
				</div>
				<h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
				<p className="text-slate-400 leading-relaxed text-[15px]">
					{description}
				</p>
			</div>
		</motion.div>
	);
};
