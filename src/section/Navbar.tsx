import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { Button } from "../component/Button";
import { IMG } from "../assets/image";
import { PATH } from "../const";

const navLinks = [
	{ label: "Features", to: `${PATH.HOME}#features` },
	{ label: "AI Tools", to: `${PATH.HOME}#ai` },
	{ label: "Pricing", to: `${PATH.HOME}#pricing` },
	{ label: "About", to: PATH.ABOUT },
	{ label: "Blog", to: PATH.BLOG },
	{ label: "Support / FAQ", to: PATH.SUPPORT },
];

export const Navbar: React.FC = () => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		setMobileOpen(false);
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const isHash = (to: string) => to.includes("#");

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? "bg-white/95 backdrop-blur-md shadow-sm"
					: "bg-transparent"
			}`}
		>
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				<Link to={PATH.HOME} className="flex items-center gap-2.5">
					<div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
						<img src={IMG.Logo} className="w-6" />
					</div>
					<span className="text-xl font-bold text-slate-900">
						CryptDocker
					</span>
				</Link>

				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((link) =>
						isHash(link.to) ? (
							<a
								key={link.to}
								href={link.to}
								className="text-sm text-slate-600 hover:text-teal-600 transition-colors"
							>
								{link.label}
							</a>
						) : (
							<Link
								key={link.to}
								to={link.to}
								className={`text-sm transition-colors ${
									location.pathname === link.to
										? "text-teal-600 font-medium"
										: "text-slate-600 hover:text-teal-600"
								}`}
							>
								{link.label}
							</Link>
						),
					)}
				</div>

				<div className="hidden md:flex items-center gap-3">
					<Button variant="outline" size="sm">
						Sign In
					</Button>
					<Link to={PATH.DOWNLOAD}>
						<Button size="sm">Download</Button>
					</Link>
				</div>

				<button
					className="md:hidden p-2 text-slate-600 cursor-pointer"
					onClick={() => setMobileOpen(!mobileOpen)}
				>
					{mobileOpen ? (
						<IoClose className="w-6 h-6" />
					) : (
						<IoMenu className="w-6 h-6" />
					)}
				</button>
			</div>

			{mobileOpen && (
				<div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
					{navLinks.map((link) =>
						isHash(link.to) ? (
							<a
								key={link.to}
								href={link.to}
								className="block text-sm text-slate-600 hover:text-teal-600 py-2"
								onClick={() => setMobileOpen(false)}
							>
								{link.label}
							</a>
						) : (
							<Link
								key={link.to}
								to={link.to}
								className="block text-sm text-slate-600 hover:text-teal-600 py-2"
							>
								{link.label}
							</Link>
						),
					)}
					<div className="flex gap-3 pt-2">
						<Button variant="outline" size="sm" className="flex-1">
							Sign In
						</Button>
						<Link to={PATH.DOWNLOAD} className="flex-1">
							<Button size="sm" className="w-full">
								Download
							</Button>
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};
