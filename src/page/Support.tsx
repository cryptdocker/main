import { Link } from "react-router-dom";
import {
	IoBookOutline,
	IoMailOutline,
	IoChevronForward,
} from "react-icons/io5";
import { PageHeader } from "../layout/PageHeader";
import { PATH } from "../const";
import { SEO } from "../component/SEO";

const supportOptions = [
	{
		icon: <IoBookOutline className="w-6 h-6" />,
		title: "Documentation",
		description:
			"Browse guides, tutorials, and API references for everything CryptDocker.",
		linkText: "View Docs",
		href: PATH.DOCUMENTATION,
		internal: true,
	},
	{
		icon: <IoMailOutline className="w-6 h-6" />,
		title: "Email Support",
		description:
			"Send us an email and we'll get back to you within 24 hours.",
		linkText: "contact@cryptdocker.com",
		href: "mailto:contact@cryptdocker.com",
	},
];

const faqs = [
	{
		q: "How do I add a custom app?",
		a: 'Click the "+" button in the sidebar, select "Custom App", enter the URL and name, and it\'ll appear in your workspace.',
	},
	{
		q: "Can I use multiple accounts on the same service?",
		a: "Yes. Each workspace runs in an isolated session, so you can log into the same service with different accounts in different workspaces.",
	},
	{
		q: "How do per-site proxies work?",
		a: "Open the app settings for any site, go to the Proxy tab, and configure an HTTP or SOCKS5 proxy. Each app can have its own proxy.",
	},
	{
		q: "What AI models does the chatbot use?",
		a: "Pro users get access to GPT-4o, GPT-4o-mini, GPT-4.1, and GPT-5 variants, plus web search capabilities.",
	},
	{
		q: "How do I cancel my Pro subscription?",
		a: "Go to Settings → Billing and click 'Cancel Plan'. You'll retain Pro access until the end of your billing period.",
	},
	{
		q: "Is my data encrypted?",
		a: "Yes. All sessions are isolated and encrypted. We never store your credentials or access your app data.",
	},
];

const faqJsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map((faq) => ({
		"@type": "Question",
		name: faq.q,
		acceptedAnswer: { "@type": "Answer", text: faq.a },
	})),
};

export const Support: React.FC = () => {
	return (
		<>
			<SEO
				title="Support & FAQ"
				description="Get help with CryptDocker. Browse FAQs about custom apps, multiple accounts, per-site proxies, AI tools, subscriptions, and data encryption."
				path="/support"
				jsonLd={faqJsonLd}
			/>
			<PageHeader
				label="Support"
				title="How Can We Help?"
				description="Find answers, reach our team, or browse the documentation."
			/>

			<section className="py-20 bg-white">
				<div className="max-w-4xl mx-auto px-6">
					{/* <div className="max-w-xl mx-auto mb-16">
						<div className="relative">
							<IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
							<input
								type="text"
								placeholder="Search for help articles..."
								className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
							/>
						</div>
					</div> */}

					<div className="grid md:grid-cols-2 gap-6 mb-20">
						{supportOptions.map((opt) => {
							const cardClass =
								"group p-6 rounded-2xl border border-slate-100 bg-white hover:border-teal-200 hover:shadow-lg transition-all duration-300 text-center";
							const content = (
								<>
									<div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
										{opt.icon}
									</div>
									<h3 className="font-semibold text-slate-900 mb-1">
										{opt.title}
									</h3>
									<p className="text-sm text-slate-500 mb-3">
										{opt.description}
									</p>
									<span className="text-sm font-medium text-teal-600">
										{opt.linkText}
									</span>
								</>
							);
							return opt.internal ? (
								<Link key={opt.title} to={opt.href} className={cardClass}>
									{content}
								</Link>
							) : (
								<a key={opt.title} href={opt.href} className={cardClass}>
									{content}
								</a>
							);
						})}
					</div>

					<h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
						Frequently Asked Questions
					</h2>
					<div className="max-w-2xl mx-auto space-y-4">
						{faqs.map((faq) => (
							<details
								key={faq.q}
								className="group rounded-xl border border-slate-100 bg-white"
							>
								<summary className="flex items-center justify-between cursor-pointer p-5 text-slate-900 font-medium text-[15px]">
									{faq.q}
									<IoChevronForward className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
								</summary>
								<div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">
									{faq.a}
								</div>
							</details>
						))}
					</div>

					<div className="mt-16 text-center">
						<p className="text-slate-500 mb-4">
							Still need help?
						</p>
						<Link
							to={PATH.CONTACT}
							className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
						>
							Contact Us
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};
