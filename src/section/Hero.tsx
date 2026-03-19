import { IoDownloadOutline, IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "../component/Button";
import { IMG } from "../assets/image";
import { PATH } from "../const";

const DOWNLOAD_URL = "https://cryptdocker.s3.eu-north-1.amazonaws.com/setup/CryptDocker.exe";

export const Hero: React.FC = () => {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-white via-teal-50/30 to-cyan-50/40">
			<div className="absolute top-20 right-[10%] w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
			<div className="absolute bottom-20 left-[5%] w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl" />

			<div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 pb-16">
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-8">
					<span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
					Now available for Windows, macOS & Linux
				</div>

				<h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
					Your All-in-One
					<br />
					<span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-cyan-500">
						Crypto App Hub
					</span>
				</h1>

				<p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
					Manage all your crypto apps, exchanges, and DeFi platforms in one
					secure desktop workspace. Built-in AI tools, Chrome extensions, and
					per-site proxies — everything you need, unified.
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
					<Button
						size="lg"
						onClick={() => {
							window.open(DOWNLOAD_URL, "_blank", "noopener,noreferrer");
						}}
					>
						<IoDownloadOutline className="w-5 h-5 mr-2" />
						Download Free
					</Button>
					<Link to={PATH.DOCUMENTATION}>
						<Button variant="outline" size="lg">
							Learn More
						</Button>
					</Link>
				</div>

				<div className="relative max-w-4xl mx-auto">
					<div className="rounded-xl border border-slate-200/80 bg-white shadow-2xl overflow-hidden">
						<div className="flex items-center justify-between gap-2 px-4 py-3 bg-teal-500 border-b border-slate-100">
							<div className="flex items-center gap-2">
								<img src={IMG.Logo} className="w-6" />
								<div className="bg-transparent rounded-md text-xs text-white">
									CryptDocker
								</div>
							</div>
							<div className="flex gap-1.5">
								<div className="w-3 h-3 rounded-full bg-red-400" />
								<div className="w-3 h-3 rounded-full bg-yellow-400" />
								<div className="w-3 h-3 rounded-full bg-green-400" />
							</div>
						</div>

						<div className="flex h-64 sm:h-80">
							<div className="w-14 sm:w-16 bg-slate-50 border-r border-slate-100 flex flex-col items-center py-4 gap-3">
								<div
									className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center bg-teal-500`}>
									<img src={IMG.Logo} className="w-6" />
								</div>
								<hr className="border border-gray-200 w-9 sm:w-10" />
								<img src={IMG.CMC} className={`w-9 sm:w-10 h-9 sm:h-10`} />
								<img src={IMG.CGK} className={`w-9 sm:w-10 h-9 sm:h-10`} />
								<img src={IMG.ESC} className={`w-9 sm:w-10 h-9 sm:h-10`} />
								<div
									className={`w-9 sm:w-10 h-9 sm:h-10 rounded-md bg-slate-300 grid grid-cols-2 items-center justify-center`}>
									<div className="w-full h-full flex items-center justify-center">
										<img src={IMG.ESC} className={`w-3.5 h-3.5`} />
									</div>
									<div className="w-full h-full flex items-center justify-center">
										<img src={IMG.BSC} className={`w-3.5 h-3.5`} />
									</div>
									<div className="w-full h-full flex items-center justify-center">
										<img src={IMG.PSC} className={`w-3.5 h-3.5`} />
									</div>
									<div className="w-full h-full flex items-center justify-center">
										<img src={IMG.ASC} className={`w-3.5 h-3.5`} />
									</div>
								</div>
							</div>

							<div className="flex-1 bg-white">
								<div className="w-full h-6 px-2 bg-slate-50 flex items-center justify-between">
									<IoHomeOutline size={12} />
								</div>
							</div>
						</div>
					</div>

					<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-teal-500/10 blur-2xl rounded-full" />
				</div>
			</div>
		</section>
	);
};
