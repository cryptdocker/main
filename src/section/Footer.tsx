import { Link } from "react-router-dom";
import { FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { IMG } from "../assets/image";
import { PATH } from "../const";

const footerLinks = [
	{
		title: "Product",
		links: [
			{ label: "Features", to: `${PATH.HOME}#features` },
			{ label: "Pricing", to: `${PATH.HOME}#pricing` },
			{ label: "Download", to: PATH.DOWNLOAD },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About", to: PATH.ABOUT },
			{ label: "Blog", to: PATH.BLOG },
			{ label: "Careers", to: PATH.CAREERS },
			{ label: "Contact", to: PATH.CONTACT },
		],
	},
	{
		title: "Resources",
		links: [
			{ label: "Documentation", to: PATH.DOCUMENTATION },
			{ label: "Support", to: PATH.SUPPORT },
			{ label: "Privacy Policy", to: PATH.PRIVACY },
			{ label: "Terms of Service", to: PATH.TERMS },
		],
	},
];

export const Footer: React.FC = () => {
	const isHash = (to: string) => to.includes("#");

	return (
		<footer className="bg-white border-t border-slate-100">
			<div className="max-w-6xl mx-auto px-6 py-16">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div className="col-span-2 md:col-span-1">
						<Link to={PATH.HOME} className="flex items-center gap-2.5 mb-4">
							<div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
								<img src={IMG.Logo} className="w-6" />
							</div>
							<span className="text-lg font-bold text-slate-900">
								CryptDocker
							</span>
						</Link>
						<p className="text-sm text-slate-500 leading-relaxed">
							Your all-in-one crypto app hub.
							<br />
							Secure, intelligent, and unified.
						</p>
					</div>

					{footerLinks.map((group) => (
						<div key={group.title}>
							<h4 className="text-sm font-semibold text-slate-900 mb-4">
								{group.title}
							</h4>
							<ul className="space-y-3">
								{group.links.map((link) => (
									<li key={link.label}>
										{isHash(link.to) ? (
											<a
												href={link.to}
												className="text-sm text-slate-500 hover:text-teal-600 transition-colors"
											>
												{link.label}
											</a>
										) : (
											<Link
												to={link.to}
												className="text-sm text-slate-500 hover:text-teal-600 transition-colors"
											>
												{link.label}
											</Link>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-sm text-slate-400">
						&copy; {new Date().getFullYear()} CryptDocker. All rights reserved.
					</p>
					<div className="flex items-center gap-6">
					<a
						href="https://linkedin.com/company/cryptdocker"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
						className="text-slate-400 hover:text-teal-600 transition-colors"
					>
						<FaLinkedin className="w-5 h-5" />
					</a>
					<a
						href="https://medium.com/@cryptdocker"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Medium"
						className="text-slate-400 hover:text-teal-600 transition-colors"
					>
						<FaMedium className="w-5 h-5" />
					</a>
					<a
						href="https://t.me/cryptdocker"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Telegram"
						className="text-slate-400 hover:text-teal-600 transition-colors"
					>
						<FaTelegram className="w-5 h-5" />
					</a>
				</div>
				</div>
			</div>
		</footer>
	);
};
