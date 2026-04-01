interface PageHeaderProps {
	label?: string;
	title: string;
	description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
	label,
	title,
	description,
}) => {
	return (
		<section className="bg-linear-to-br from-white via-teal-50/30 to-cyan-50/40 py-20 md:py-28">
			<div className="max-w-3xl mx-auto px-6 text-center">
				{label && (
					<span className="inline-block text-teal-600 text-sm font-semibold tracking-wide uppercase mb-3">
						{label}
					</span>
				)}
				<h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
					{title}
				</h1>
				{description && (
					<p className="text-lg text-slate-500 leading-relaxed">
						{description}
					</p>
				)}
			</div>
		</section>
	);
};
