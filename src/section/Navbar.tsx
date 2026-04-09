import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu, IoClose, IoChevronDown } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../component/Button";
import { IMG } from "../assets/image";
import { PATH } from "../const";
import { detectOS } from "../utils/detectOS";

const DOWNLOAD_URL_WINDOWS =
	"https://cryptdocker.s3.eu-north-1.amazonaws.com/setup/CryptDocker.exe";
const DOWNLOAD_URL_MACOS =
	"https://cryptdocker.s3.eu-north-1.amazonaws.com/setup/CryptDocker.dmg";
const DOWNLOAD_URL_LINUX =
	"https://cryptdocker.s3.eu-north-1.amazonaws.com/setup/CryptDocker-1.0.0.AppImage";

const navLinks = [
	{ label: "Features", to: `${PATH.HOME}#features` },
	{ label: "AI Tools", to: `${PATH.HOME}#ai` },
	{ label: "Pricing", to: `${PATH.HOME}#pricing` },
];

const resourceLinks = [
	{ label: "About", to: PATH.ABOUT },
	{ label: "Blog", to: PATH.BLOG },
	{ label: "Support / FAQ", to: PATH.SUPPORT },
	{ label: "Docs", to: PATH.DOCUMENTATION },
];

export const Navbar: React.FC = () => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [resourcesOpen, setResourcesOpen] = useState(false);
	const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
	const location = useLocation();
	const clientOS = useMemo(() => detectOS(), []);
	const isWindows = clientOS === "Windows";
	const isMacOS = clientOS === "macOS";
	const isLinux = clientOS === "Linux";
	const canDownload = isWindows || isMacOS || isLinux;
	const resourcesRef = useRef<HTMLDivElement | null>(null);

	const downloadNow = () => {
		if (isWindows) {
			window.open(DOWNLOAD_URL_WINDOWS, "_blank", "noopener,noreferrer");
		} else if (isMacOS) {
			window.open(DOWNLOAD_URL_MACOS, "_blank", "noopener,noreferrer");
		} else if (isLinux) {
			window.open(DOWNLOAD_URL_LINUX, "_blank", "noopener,noreferrer");
		}
	};

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const isHash = (to: string) => to.includes("#");

	useEffect(() => {
		setResourcesOpen(false);
		setMobileOpen(false);
		setMobileResourcesOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		if (!resourcesOpen) return;
		const onPointerDown = (e: MouseEvent | TouchEvent) => {
			if (!resourcesRef.current) return;
			if (!resourcesRef.current.contains(e.target as Node))
				setResourcesOpen(false);
		};
		document.addEventListener("mousedown", onPointerDown);
		document.addEventListener("touchstart", onPointerDown);
		return () => {
			document.removeEventListener("mousedown", onPointerDown);
			document.removeEventListener("touchstart", onPointerDown);
		};
	}, [resourcesOpen]);

	return (
		<motion.nav
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				scrolled
					? "bg-dark-base/80 backdrop-blur-xl border-b border-white/6 shadow-2xl shadow-black/20"
					: "bg-transparent"
			}`}
		>
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				<Link to={PATH.HOME} className="flex items-center gap-2.5 group">
					<div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-600 to-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow duration-300">
						<img src={IMG.Logo} className="w-6" />
					</div>
					<span className="text-xl font-bold text-white">CryptDocker</span>
				</Link>

				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((link) =>
						isHash(link.to) ? (
							<a
								key={link.to}
								href={link.to}
								className="text-sm text-slate-400 hover:text-violet-400 transition-colors duration-200"
							>
								{link.label}
							</a>
						) : (
							<Link
								key={link.to}
								to={link.to}
								className={`text-sm transition-colors duration-200 ${
									location.pathname === link.to
										? "text-violet-400 font-medium"
										: "text-slate-400 hover:text-violet-400"
								}`}
							>
								{link.label}
							</Link>
						),
					)}

					<div className="relative" ref={resourcesRef}>
						<button
							type="button"
							className={`inline-flex items-center gap-1 text-sm transition-colors duration-200 cursor-pointer ${
								resourcesOpen
									? "text-violet-400 font-medium"
									: "text-slate-400 hover:text-violet-400"
							}`}
							aria-haspopup="menu"
							aria-expanded={resourcesOpen}
							onClick={() => setResourcesOpen((v) => !v)}
						>
							Resources
							<IoChevronDown
								className={`w-4 h-4 transition-transform duration-200 ${
									resourcesOpen ? "rotate-180" : ""
								}`}
							/>
						</button>

						<AnimatePresence>
							{resourcesOpen && (
								<motion.div
									initial={{ opacity: 0, y: 8, scale: 0.96 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: 8, scale: 0.96 }}
									transition={{ duration: 0.15 }}
									role="menu"
									aria-label="Resources"
									className="absolute top-full mt-3 right-0 w-52 rounded-xl glass-strong overflow-hidden"
								>
									<div className="py-2">
										{resourceLinks.map((link) => (
											<Link
												key={link.to}
												to={link.to}
												role="menuitem"
												className={`block px-4 py-2.5 text-sm transition-colors duration-200 ${
													location.pathname === link.to
														? "text-violet-400 bg-violet-500/10 font-medium"
														: "text-slate-300 hover:bg-white/5 hover:text-violet-400"
												}`}
												onClick={() => setResourcesOpen(false)}
											>
												{link.label}
											</Link>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>

				<div className="hidden md:flex items-center gap-3">
					<Link
						to={PATH.DOWNLOAD}
						onClick={(e) => {
							if (canDownload) {
								e.preventDefault();
								downloadNow();
							}
						}}
					>
						<Button
							size="sm"
							disabled={!canDownload}
							title={!canDownload ? "Coming soon for your OS" : undefined}
						>
							Download
						</Button>
					</Link>
				</div>

				<button
					className="md:hidden p-2 text-slate-400 cursor-pointer"
					onClick={() => setMobileOpen(!mobileOpen)}
				>
					{mobileOpen ? (
						<IoClose className="w-6 h-6" />
					) : (
						<IoMenu className="w-6 h-6" />
					)}
				</button>
			</div>

			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="md:hidden bg-dark-surface/95 backdrop-blur-xl border-t border-white/6 px-6 py-4 space-y-3 overflow-hidden"
					>
						{navLinks.map((link) =>
							isHash(link.to) ? (
								<a
									key={link.to}
									href={link.to}
									className="block text-sm text-slate-400 hover:text-violet-400 py-2"
									onClick={() => setMobileOpen(false)}
								>
									{link.label}
								</a>
							) : (
								<Link
									key={link.to}
									to={link.to}
									className="block text-sm text-slate-400 hover:text-violet-400 py-2"
								>
									{link.label}
								</Link>
							),
						)}

						<div className="pt-1">
							<button
								type="button"
								className="w-full flex items-center justify-between text-sm text-slate-400 hover:text-violet-400 py-2 cursor-pointer"
								aria-expanded={mobileResourcesOpen}
								onClick={() => setMobileResourcesOpen((v) => !v)}
							>
								<span>Resources</span>
								<IoChevronDown
									className={`w-4 h-4 transition-transform ${
										mobileResourcesOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{mobileResourcesOpen && (
								<div className="mt-1 pl-3 border-l border-white/8 space-y-1">
									{resourceLinks.map((link) => (
										<Link
											key={link.to}
											to={link.to}
											className="block text-sm text-slate-400 hover:text-violet-400 py-2"
											onClick={() => setMobileOpen(false)}
										>
											{link.label}
										</Link>
									))}
								</div>
							)}
						</div>

						<div className="flex gap-3 pt-2">
							<Link
								to={PATH.DOWNLOAD}
								className="w-full"
								onClick={(e) => {
									if (canDownload) {
										e.preventDefault();
										downloadNow();
									}
									setMobileOpen(false);
								}}
							>
								<Button
									size="sm"
									className="w-full"
									disabled={!canDownload}
									title={!canDownload ? "Coming soon for your OS" : undefined}
								>
									Download
								</Button>
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
};
