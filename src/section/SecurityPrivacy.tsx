import { motion } from "framer-motion";
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
			"Your sessions, workspaces, and app data are stored on your device. We don\u2019t run a cloud vault and we can\u2019t \u201Csee\u201D inside your workspace.",
		icon: <IoCloudOfflineOutline className="w-6 h-6" />,
	},
	{
		title: "AES-256 encryption",
		description:
			"Sensitive local data is encrypted at rest using AES-256, so your setup stays protected even when you\u2019re not at your desk.",
		icon: <IoLockClosedOutline className="w-6 h-6" />,
	},
	{
		title: "No access to private keys or API data",
		description:
			"We never ask for your seed phrase. We don\u2019t collect private keys, and we don\u2019t have access to your exchange API secrets or wallet signing data.",
		icon: <IoShieldCheckmarkOutline className="w-6 h-6" />,
	},
];

export const SecurityPrivacy: React.FC = () => {
	return (
		<section className="relative py-24 overflow-hidden">
			<div className="absolute top-20 left-[10%] w-64 h-64 bg-cyan-500/4 rounded-full blur-3xl" />
			<div className="relative z-10 max-w-6xl mx-auto px-6">
				<SectionHeading
					label="Security & Privacy"
					title="Built for crypto-safety, not hype"
					description="Downloadable software shouldn\u2019t be a leap of faith. CryptDocker is designed so your workflow stays local, private, and protected."
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{points.map((p, i) => (
						<motion.div
							key={p.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5, delay: i * 0.15 }}
							whileHover={{ y: -4, transition: { duration: 0.2 } }}
							className="rounded-2xl glass p-8 hover:bg-white/5 transition-all duration-500"
						>
							<div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-5">
								{p.icon}
							</div>
							<h3 className="text-lg font-bold text-white mb-2">
								{p.title}
							</h3>
							<p className="text-slate-400 leading-relaxed">{p.description}</p>
						</motion.div>
					))}
				</div>

				<div className="mt-10 text-center">
					<p className="text-sm text-slate-500 max-w-3xl mx-auto">
						CryptDocker is not a wallet and does not custody funds. Always verify
						dApps and contracts independently and use hardware wallets when
						possible.
					</p>
				</div>
			</div>
		</section>
	);
};
