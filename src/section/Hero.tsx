import { IoDownloadOutline, IoHomeOutline } from "react-icons/io5";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

const HERO_LABELS = ["Now available for Windows, macOS & Linux"];

const FADE_MS = 300;
const INTERVAL_MS = 5000;

export const Hero: React.FC = () => {
	const [labelIndex, setLabelIndex] = useState(0);
	const [visible, setVisible] = useState(true);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

	const clientOS = useMemo(() => detectOS(), []);
	const isWindows = clientOS === "Windows";
	const isMacOS = clientOS === "macOS";
	const isLinux = clientOS === "Linux";
	const canDownload = isWindows || isMacOS || isLinux;

	const cycle = useCallback(() => {
		setVisible(false);
		timeoutRef.current = setTimeout(() => {
			setLabelIndex((prev) => (prev + 1) % HERO_LABELS.length);
			setVisible(true);
		}, FADE_MS);
	}, []);

	useEffect(() => {
		const id = window.setInterval(cycle, INTERVAL_MS);
		return () => {
			window.clearInterval(id);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [cycle]);

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 mesh-gradient" />

			<div className="absolute top-20 right-[10%] w-80 h-80 bg-violet-500/8 rounded-full blur-3xl animate-float" />
			<div className="absolute bottom-32 left-[5%] w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl animate-float-slow" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/3 rounded-full blur-3xl" />
			<div className="absolute top-40 left-[20%] w-48 h-48 bg-amber-500/5 rounded-full blur-3xl animate-float" />

			<div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 pb-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 glass"
				>
					<span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
					<span
						aria-live="polite"
						className="transition-opacity duration-300 text-slate-300"
						style={{ opacity: visible ? 1 : 0 }}
					>
						{HERO_LABELS[labelIndex]}
					</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight"
				>
					A Dedicated, Secure
					<br />
					<span className="text-gradient animate-shimmer">
						Desktop Environment
					</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
				>
					An installed desktop app that gives you a dedicated, secure environment
					for your crypto workflow — run exchanges, DeFi, and tools side-by-side
					with built-in AI tools, Chrome extensions, and per-site proxies.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.55 }}
					className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
				>
					<div className="flex flex-col items-center gap-1">
						<Button
							size="lg"
							disabled={!canDownload}
							onClick={() => {
								if (isWindows)
									window.open(DOWNLOAD_URL_WINDOWS, "_blank", "noopener,noreferrer");
								else if (isMacOS)
									window.open(DOWNLOAD_URL_MACOS, "_blank", "noopener,noreferrer");
								else if (isLinux)
									window.open(DOWNLOAD_URL_LINUX, "_blank", "noopener,noreferrer");
							}}
						>
							<IoDownloadOutline className="w-5 h-5 mr-2" />
							Download for {clientOS}
						</Button>
						{!canDownload && (
							<span className="text-xs text-slate-500">Coming soon for Linux</span>
						)}
					</div>
					<Link to={PATH.DOCUMENTATION}>
						<Button variant="outline" size="lg">
							Learn More
						</Button>
					</Link>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 40, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
					className="relative max-w-4xl mx-auto"
				>
					<div className="rounded-2xl glass-strong overflow-hidden glow-violet">
						<div className="flex items-center justify-between gap-2 px-4 py-3 bg-linear-to-r from-violet-600/80 to-violet-500/80 border-b border-white/10">
							<div className="flex items-center gap-2">
								<img src={IMG.Logo} className="w-6" />
								<div className="text-xs text-white/90 font-medium">
									CryptDocker
								</div>
							</div>
							<div className="flex gap-1.5">
								<div className="w-3 h-3 rounded-full bg-red-400/80" />
								<div className="w-3 h-3 rounded-full bg-yellow-400/80" />
								<div className="w-3 h-3 rounded-full bg-green-400/80" />
							</div>
						</div>

						<div className="flex h-64 sm:h-80">
							<div className="w-14 sm:w-16 bg-white/2 border-r border-white/6 flex flex-col items-center py-4 gap-3">
								<div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center bg-linear-to-br from-violet-600 to-violet-500 shadow-lg shadow-violet-500/20">
									<img src={IMG.Logo} className="w-6" />
								</div>
								<hr className="border border-white/6 w-9 sm:w-10" />
								<img src={IMG.CMC} className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg" />
								<img src={IMG.CGK} className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg" />
								<img src={IMG.ESC} className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg" />
								<div className="w-9 sm:w-10 h-9 sm:h-10 rounded-md bg-white/6 grid grid-cols-2 items-center justify-center">
									<div className="w-full h-full flex items-center justify-center">
										<img src={IMG.ESC} className="w-3.5 h-3.5" />
									</div>
									<div className="w-full h-full flex items-center justify-center">
										<img src={IMG.BSC} className="w-3.5 h-3.5" />
									</div>
									<div className="w-full h-full flex items-center justify-center">
										<img src={IMG.PSC} className="w-3.5 h-3.5" />
									</div>
									<div className="w-full h-full flex items-center justify-center">
										<img src={IMG.ASC} className="w-3.5 h-3.5" />
									</div>
								</div>
							</div>

							<div className="flex-1 bg-transparent">
								<div className="w-full h-6 px-2 bg-white/2 flex items-center justify-between border-b border-white/4">
									<IoHomeOutline size={12} className="text-slate-500" />
								</div>
							</div>
						</div>
					</div>

					<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-violet-500/10 blur-3xl rounded-full" />
				</motion.div>
			</div>
		</section>
	);
};
