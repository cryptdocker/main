import { useParams, Link, Navigate } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IoArrowBack } from "react-icons/io5";
import { getBlogPost, blogPosts } from "../content/blog";
import { PATH } from "../const";
import { SEO } from "../component/SEO";

export const BlogPost: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const post = slug ? getBlogPost(slug) : undefined;

	if (!post) {
		return <Navigate to={PATH.BLOG} replace />;
	}

	const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
	const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
	const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

	return (
		<>
			<SEO
				title={post.title}
				description={post.excerpt}
				path={`/blog/${post.slug}`}
				ogType="article"
				jsonLd={{
					"@context": "https://schema.org",
					"@type": "BlogPosting",
					headline: post.title,
					description: post.excerpt,
					datePublished: post.date,
					author: { "@type": "Organization", name: "CryptDocker" },
					publisher: {
						"@type": "Organization",
						name: "CryptDocker",
						logo: { "@type": "ImageObject", url: "https://cryptdocker.com/logo.png" },
					},
					mainEntityOfPage: `https://cryptdocker.com/blog/${post.slug}`,
				}}
			/>
			<section className="bg-linear-to-br from-white via-teal-50/30 to-cyan-50/40 py-20 md:py-28">
				<div className="max-w-3xl mx-auto px-6">
					<Link
						to={PATH.BLOG}
						className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors mb-8"
					>
						<IoArrowBack className="w-4 h-4" />
						Back to Blog
					</Link>

					<div className="flex items-center gap-3 mb-4">
						<span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">
							{post.category}
						</span>
						<span className="text-sm text-slate-400">{post.date}</span>
						<span className="text-sm text-slate-400">· {post.readTime}</span>
					</div>

					<h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
						{post.title}
					</h1>
				</div>
			</section>

			<section className="py-16 bg-white">
				<article className="max-w-3xl mx-auto px-6 prose prose-slate prose-teal prose-lg prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-500 prose-p:leading-relaxed prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-700 prose-code:text-teal-700 prose-code:bg-slate-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-th:text-slate-700 prose-td:text-slate-500 prose-li:text-slate-500 prose-img:rounded-xl">
					<Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
				</article>
			</section>

			<section className="py-12 bg-slate-50/70">
				<div className="max-w-3xl mx-auto px-6">
					<div className="grid grid-cols-2 gap-6">
						{prevPost ? (
							<Link
								to={`${PATH.BLOG}/${prevPost.slug}`}
								className="group p-5 rounded-xl border border-slate-100 bg-white hover:border-teal-200 transition-all"
							>
								<span className="text-xs text-slate-400">Previous</span>
								<p className="text-sm font-semibold text-slate-900 mt-1 group-hover:text-teal-600 transition-colors line-clamp-2">
									{prevPost.title}
								</p>
							</Link>
						) : (
							<div />
						)}
						{nextPost ? (
							<Link
								to={`${PATH.BLOG}/${nextPost.slug}`}
								className="group p-5 rounded-xl border border-slate-100 bg-white hover:border-teal-200 transition-all text-right"
							>
								<span className="text-xs text-slate-400">Next</span>
								<p className="text-sm font-semibold text-slate-900 mt-1 group-hover:text-teal-600 transition-colors line-clamp-2">
									{nextPost.title}
								</p>
							</Link>
						) : (
							<div />
						)}
					</div>
				</div>
			</section>
		</>
	);
};
