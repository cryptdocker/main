import { Link } from "react-router-dom";
import {
	IoDownloadOutline,
	IoCheckmarkCircleOutline,
	IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { PageHeader } from "../layout/PageHeader";
import { Button } from "../component/Button";
import { PATH } from "../const";

const platforms = [
	{
		name: "Windows",
		icon: <FaWindows className="w-8 h-8" />,
		version: "v2.4.1",
		size: "87 MB",
		format: ".exe installer",
		requirement: "Windows 10 or later",
		primary: true,
		downloadUrl: "https://cryptdocker.s3.eu-north-1.amazonaws.com/setup/CryptDocker.exe",
	},
	{
		name: "macOS",
		icon: <FaApple className="w-8 h-8" />,
		version: "v2.4.1",
		size: "92 MB",
		format: ".dmg (Universal)",
		requirement: "macOS 12 Monterey or later",
		primary: false,
	},
	{
		name: "Linux",
		icon: <FaLinux className="w-8 h-8" />,
		version: "v2.4.1",
		size: "84 MB",
		format: ".AppImage / .deb",
		requirement: "Ubuntu 20.04+ / Fedora 36+",
		primary: false,
	},
];

const features = [
	"Free tier included — no credit card required",
	"Auto-updates built in",
	"All platforms share the same feature set",
	"Secure, signed binaries",
];

export const Download: React.FC = () => {
	return (
		<>
			<PageHeader
				label="Download"
				title="Get CryptDocker"
				description="Available for Windows, macOS, and Linux. Free to download, Pro to unlock everything."
			/>

			<section className="py-20 bg-white">
				<div className="max-w-5xl mx-auto px-6">
					<div className="grid md:grid-cols-3 gap-6 mb-16">
						{platforms.map((p) => (
							<div
								key={p.name}
								className={`relative rounded-2xl p-8 text-center transition-all duration-300 ${
									p.primary
										? "bg-white border-2 border-teal-500 shadow-xl"
										: "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg"
								}`}
							>
								{p.primary && (
									<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded-full">
										Recommended
									</div>
								)}
								<div
									className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
										p.primary
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
								<div className="flex items-center justify-center gap-4 text-xs text-slate-500 mb-6">
									<span>{p.version}</span>
									<span className="w-1 h-1 rounded-full bg-slate-300" />
									<span>{p.size}</span>
									<span className="w-1 h-1 rounded-full bg-slate-300" />
									<span>{p.format}</span>
								</div>
								<Button
									variant={p.primary ? "primary" : "outline"}
									size="lg"
									className="w-full"
									onClick={() => {
										if (!("downloadUrl" in p) || !p.downloadUrl) return;
										window.open(p.downloadUrl, "_blank", "noopener,noreferrer");
									}}
								>
									<IoDownloadOutline className="w-5 h-5 mr-2" />
									Download for {p.name}
								</Button>
							</div>
						))}
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
		</>
	);
};
