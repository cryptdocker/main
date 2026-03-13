import { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import { PageHeader } from "../layout/PageHeader";
import { blogPosts } from "../content/blog";
import { PATH } from "../const";

const categories = ["All", ...new Set(blogPosts.map((p) => p.category))];

export const Blog: React.FC = () => {
	const [active, setActive] = useState("All");
	const filtered =
		active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

	return (
		<>
			<PageHeader
				label="Blog"
				title="News & Insights"
				description="Product updates, tutorials, and thoughts on the future of crypto tooling."
			/>

			<section className="py-20 bg-white">
				<div className="max-w-5xl mx-auto px-6">
					<div className="flex flex-wrap gap-2 mb-12">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setActive(cat)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
									cat === active
										? "bg-teal-600 text-white"
										: "bg-slate-100 text-slate-600 hover:bg-slate-200"
								}`}
							>
								{cat}
							</button>
						))}
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{filtered.map((post) => (
							<Link
								key={post.slug}
								to={`${PATH.BLOG}/${post.slug}`}
								className="group block rounded-2xl border border-slate-100 bg-white p-6 hover:border-teal-200 hover:shadow-lg transition-all duration-300"
							>
								<div className="flex items-center gap-3 mb-4">
									<span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">
										{post.category}
									</span>
									<span className="text-xs text-slate-400">{post.date}</span>
									<span className="text-xs text-slate-400">
										· {post.readTime}
									</span>
								</div>
								<h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
									{post.title}
								</h3>
								<p className="text-slate-500 text-[15px] leading-relaxed mb-4">
									{post.excerpt}
								</p>
								<span className="inline-flex items-center text-sm font-medium text-teal-600 gap-1 group-hover:gap-2 transition-all">
									Read More
									<IoArrowForward className="w-4 h-4" />
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
};
