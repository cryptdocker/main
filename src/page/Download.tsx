import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
	IoDownloadOutline,
	IoCheckmarkCircleOutline,
	IoShieldCheckmarkOutline,
	IoCloseOutline,
	IoNotificationsOutline,
} from "react-icons/io5";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { PageHeader } from "../layout/PageHeader";
import { Button } from "../component/Button";
import { PATH } from "../const";
import { SEO } from "../component/SEO";

type Platform = "Windows" | "macOS" | "Linux";

const platforms = [
	{
		name: "Windows" as Platform,
		icon: <FaWindows className="w-8 h-8" />,
		version: "v1.0.0",
		size: "111 MB",
		format: ".exe installer",
		requirement: "Windows 10 or later",
		downloadUrl: "https://cryptdocker.s3.eu-north-1.amazonaws.com/setup/CryptDocker.exe",
	},
	{
		name: "macOS" as Platform,
		icon: <FaApple className="w-8 h-8" />,
		format: ".dmg (Universal)",
		version: "v1.0.0",
		size: "172 MB",
		requirement: "macOS 12 Monterey or later",
		downloadUrl: "https://cryptdocker.s3.eu-north-1.amazonaws.com/setup/CryptDocker.dmg",
	},
	{
		name: "Linux" as Platform,
		icon: <FaLinux className="w-8 h-8" />,
		format: ".AppImage",
		requirement: "Ubuntu 20.04+ / Fedora 36+",
		version: "v1.0.0",
		size: "152 MB",
		downloadUrl: "https://cryptdocker.s3.eu-north-1.amazonaws.com/setup/CryptDocker-1.0.0.AppImage",
	},
];

function detectOS(): Platform {
	const ua = navigator.userAgent;
	if (/Mac/i.test(ua)) return "macOS";
	if (/Linux/i.test(ua)) return "Linux";
	return "Windows";
}

const features = [
	"Free tier included — no credit card required",
	"Auto-updates built in",
	"All platforms share the same feature set",
	"Secure, signed binaries",
];

export const Download: React.FC = () => {
	const [comingSoonPlatform, setComingSoonPlatform] = useState<string | null>(null);
	const clientOS = useMemo(() => detectOS(), []);

	return (
		<>
			<SEO
				title="Download CryptDocker"
				description="Download CryptDocker for Windows, macOS, or Linux. Free tier included with auto-updates and signed binaries. Manage all your crypto apps in one workspace."
				path="/download"
			/>
			<PageHeader
				label="Download"
				title="Get CryptDocker"
				description="Available for Windows, macOS, and Linux. Free to download, Pro to unlock everything."
			/>

			<section className="py-20 bg-white">
				<div className="max-w-5xl mx-auto px-6">
					<div className="grid md:grid-cols-3 gap-6 mb-16">
						{platforms.map((p) => {
							const highlighted = p.name === clientOS;
							return (
							<div
								key={p.name}
								className={`relative rounded-2xl p-8 text-center transition-all duration-300 ${
									highlighted
										? "bg-white border-2 border-teal-500 shadow-xl"
										: "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg"
								}`}
							>
								{highlighted && (
									<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded-full">
										Current OS
									</div>
								)}
								<div
									className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
										highlighted
											? "bg-teal-50 text-teal-600"
											: "bg-slate-100 text-slate-600"
									}`}
								>
									{p.icon}
								</div>
								<h3 className="text-xl font-bold text-slate-900 mb-1">
									{p.name}
								</h3>
							<p className="text-sm text-slate-400 mb-5">{p.requirement}</p>
							{"version" in p ? (
								<div className="flex items-center justify-center gap-4 text-xs text-slate-500 mb-6">
									<span>{p.version}</span>
									<span className="w-1 h-1 rounded-full bg-slate-300" />
									<span>{p.size}</span>
									<span className="w-1 h-1 rounded-full bg-slate-300" />
									<span>{p.format}</span>
								</div>
							) : (
								<div className="flex items-center justify-center mb-6">
									<span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium">
										Coming Soon
									</span>
								</div>
							)}
							<Button
								variant={highlighted ? "primary" : "outline"}
								size="lg"
								className="w-full"
								onClick={() => {
									if ("downloadUrl" in p && p.downloadUrl) {
										window.open(p.downloadUrl, "_blank", "noopener,noreferrer");
									} else {
										setComingSoonPlatform(p.name);
									}
								}}
							>
								<IoDownloadOutline className="w-5 h-5 mr-2" />
								Download
							</Button>
							</div>
							);
						})}
					</div>

					<div className="max-w-xl mx-auto">
						<div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8">
							<div className="flex items-center gap-3 mb-5">
								<IoShieldCheckmarkOutline className="w-6 h-6 text-teal-600" />
								<h3 className="text-lg font-semibold text-slate-900">
									What's Included
								</h3>
							</div>
							<ul className="space-y-3">
								{features.map((f) => (
									<li key={f} className="flex items-center gap-3">
										<IoCheckmarkCircleOutline className="w-5 h-5 text-teal-500 shrink-0" />
										<span className="text-slate-600 text-[15px]">{f}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="mt-16 text-center">
						<p className="text-slate-500 mb-2">
							Looking to unlock unlimited apps, AI tools, and more?
						</p>
						<Link
							to={`${PATH.HOME}#pricing`}
							className="text-teal-600 font-medium hover:underline"
						>
							Compare Free vs Pro plans
						</Link>
					</div>
				</div>
			</section>

			{comingSoonPlatform && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
					onClick={() => setComingSoonPlatform(null)}
				>
					<div
						className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-8 text-center"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setComingSoonPlatform(null)}
							className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
						>
							<IoCloseOutline className="w-5 h-5" />
						</button>
						<div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-5">
							<IoNotificationsOutline className="w-7 h-7" />
						</div>
						<h3 className="text-xl font-bold text-slate-900 mb-2">
							Coming Soon
						</h3>
						<p className="text-slate-500 text-[15px] leading-relaxed mb-6">
							CryptDocker for <span className="font-semibold text-slate-700">{comingSoonPlatform}</span> is
							currently under development. We'll announce it as soon as it's
							ready!
						</p>
						<Button
							variant="primary"
							size="md"
							className="w-full"
							onClick={() => setComingSoonPlatform(null)}
						>
							Got it
						</Button>
					</div>
				</div>
			)}
		</>
	);
};
