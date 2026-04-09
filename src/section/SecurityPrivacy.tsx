import {
	IoLockClosedOutline,
	IoShieldCheckmarkOutline,
	IoCloudOfflineOutline,
} from "react-icons/io5";
import { SectionHeading } from "../component/SectionHeading";

const points = [
	{
		title: "Local-only storage",
		description:
			"Your sessions, workspaces, and app data are stored on your device. We don’t run a cloud vault and we can’t “see” inside your workspace.",
		icon: <IoCloudOfflineOutline className="w-6 h-6" />,
	},
	{
		title: "AES-256 encryption",
		description:
			"Sensitive local data is encrypted at rest using AES-256, so your setup stays protected even when you’re not at your desk.",
		icon: <IoLockClosedOutline className="w-6 h-6" />,
	},
	{
		title: "No access to private keys or API data",
		description:
			"We never ask for your seed phrase. We don’t collect private keys, and we don’t have access to your exchange API secrets or wallet signing data.",
		icon: <IoShieldCheckmarkOutline className="w-6 h-6" />,
	},
];

export const SecurityPrivacy: React.FC = () => {
	return (
		<section className="py-24 bg-slate-50/70">
			<div className="max-w-6xl mx-auto px-6">
				<SectionHeading
					label="Security & Privacy"
					title="Built for crypto-safety, not hype"
					description="Downloadable software shouldn’t be a leap of faith. CryptDocker is designed so your workflow stays local, private, and protected."
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{points.map((p) => (
						<div
							key={p.title}
							className="rounded-2xl bg-white border border-slate-100 p-8 hover:shadow-xl transition-all duration-300"
						>
							<div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5">
								{p.icon}
							</div>
							<h3 className="text-lg font-bold text-slate-900 mb-2">
								{p.title}
							</h3>
							<p className="text-slate-500 leading-relaxed">{p.description}</p>
						</div>
					))}
				</div>

				<div className="mt-10 text-center">
					<p className="text-sm text-slate-400 max-w-3xl mx-auto">
						CryptDocker is not a wallet and does not custody funds. Always verify
						dApps and contracts independently and use hardware wallets when
						possible.
					</p>
				</div>
			</div>
		</section>
	);
};

