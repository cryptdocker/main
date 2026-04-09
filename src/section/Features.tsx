import {
	IoGridOutline,
	IoFolderOutline,
	IoGlobeOutline,
	IoFlashOutline,
	IoExtensionPuzzleOutline,
	IoLockClosedOutline,
} from "react-icons/io5";
import { SectionHeading } from "../component/SectionHeading";
import { FeatureCard } from "../component/FeatureCard";

const features = [
	{
		icon: <IoGridOutline className="w-6 h-6" />,
		title: "App Management",
		description:
			"Add apps from our curated catalog or any custom URL. Organize, search, and launch everything from one unified dashboard.",
	},
	{
		icon: <IoFolderOutline className="w-6 h-6" />,
		title: "Workspaces",
		description:
			"Organize apps into color-coded workspaces. Drag and drop between folders, expand and collapse — keep everything tidy.",
	},
	{
		icon: <IoGlobeOutline className="w-6 h-6" />,
		title: "Per-Site Proxies",
		description:
			"Configure HTTP or SOCKS proxies on a per-app basis. Route each site through different connections for maximum privacy.",
	},
	{
		icon: <IoFlashOutline className="w-6 h-6" />,
		title: "Smart Hibernation",
		description:
			"Automatically hibernate idle tabs to free up memory and CPU. Wake them instantly when you need them.",
	},
	{
		icon: <IoExtensionPuzzleOutline className="w-6 h-6" />,
		title: "Chrome Extensions",
		description:
			"Install and manage Chrome extensions directly inside CryptDocker. Pin your favorites and use them across workspaces.",
	},
	{
		icon: <IoLockClosedOutline className="w-6 h-6" />,
		title: "Session Isolation",
		description:
			"Each workspace runs in its own isolated session. Log into multiple accounts on the same service simultaneously.",
	},
];

export const Features: React.FC = () => {
	return (
		<section id="features" className="py-24 bg-white">
			<div className="max-w-6xl mx-auto px-6">
				<SectionHeading
					label="Features"
					title="Advanced Crypto Hub Features"
					description="CryptDocker brings all your crypto tools together in one secure, organized desktop experience."
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{features.map((feature) => (
						<FeatureCard key={feature.title} {...feature} />
					))}
				</div>
			</div>
		</section>
	);
};
