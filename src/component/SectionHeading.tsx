interface SectionHeadingProps {
	label?: string;
	title: string;
	description?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
	label,
	title,
	description,
}) => {
	return (
		<div className="text-center max-w-2xl mx-auto mb-16">
			{label && (
				<span className="inline-block text-teal-600 text-sm font-semibold tracking-wide uppercase mb-3">
					{label}
				</span>
			)}
			<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
				{title}
			</h2>
			{description && (
				<p className="text-lg text-slate-500 leading-relaxed">
					{description}
				</p>
			)}
		</div>
	);
};
