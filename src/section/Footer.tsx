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
		<footer className="border-t border-white/6">
			<div className="max-w-6xl mx-auto px-6 py-16">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div className="col-span-2 md:col-span-1">
						<Link to={PATH.HOME} className="flex items-center gap-2.5 mb-4 group">
							<div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-600 to-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow duration-300">
								<img src={IMG.Logo} className="w-6" />
							</div>
							<span className="text-lg font-bold text-white">
								CryptDocker
							</span>
						</Link>
						<p className="text-sm text-slate-500 leading-relaxed">
							A dedicated, secure desktop environment for your crypto workflow.
						</p>
					</div>

					{footerLinks.map((group) => (
						<div key={group.title}>
							<h4 className="text-sm font-semibold text-white mb-4">
								{group.title}
							</h4>
							<ul className="space-y-3">
								{group.links.map((link) => (
									<li key={link.label}>
										{isHash(link.to) ? (
											<a
												href={link.to}
												className="text-sm text-slate-500 hover:text-violet-400 transition-colors duration-200"
											>
												{link.label}
											</a>
										) : (
											<Link
												to={link.to}
												className="text-sm text-slate-500 hover:text-violet-400 transition-colors duration-200"
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

				<div className="mt-12 pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-sm text-slate-500">
						&copy; {new Date().getFullYear()} CryptDocker. All rights reserved.
					</p>
					<div className="flex items-center gap-6">
						<a
							href="https://linkedin.com/company/cryptdocker"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							className="text-slate-500 hover:text-violet-400 transition-colors duration-200"
						>
							<FaLinkedin className="w-5 h-5" />
						</a>
						<a
							href="https://medium.com/@cryptdocker"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Medium"
							className="text-slate-500 hover:text-violet-400 transition-colors duration-200"
						>
							<FaMedium className="w-5 h-5" />
						</a>
						<a
							href="https://t.me/cryptdocker"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Telegram"
							className="text-slate-500 hover:text-violet-400 transition-colors duration-200"
						>
							<FaTelegram className="w-5 h-5" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
