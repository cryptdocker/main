import { Link } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import { PageHeader } from "../layout/PageHeader";
import { PATH } from "../const";

const perks = [
	{ title: "Fully Remote", description: "Work from anywhere in the world." },
	{ title: "Competitive Pay", description: "Salary benchmarked to top markets, paid in fiat or crypto." },
	{ title: "Equity", description: "Share in our success with meaningful stock options." },
	{ title: "Flexible Hours", description: "We care about output, not hours logged." },
	{ title: "Learning Budget", description: "$2,000/year for conferences, courses, and books." },
	{ title: "Latest Hardware", description: "Choose your own setup — laptop, monitor, peripherals." },
];

export const Careers: React.FC = () => {
	return (
		<>
			<PageHeader
				label="Careers"
				title="Build the Future With Us"
				description="Join a remote-first team of passionate builders creating the best crypto workspace in the world."
			/>

			<section className="py-20 bg-white">
				<div className="max-w-4xl mx-auto px-6">
					<h2 className="text-2xl font-bold text-slate-900 mb-3">
						Why CryptDocker?
					</h2>
					<p className="text-slate-500 leading-relaxed mb-10 max-w-2xl">
						We're a small, senior team that ships fast and cares deeply about
						craft. No bureaucracy, no useless meetings — just focused work on
						products people love.
					</p>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{perks.map((perk) => (
							<div
								key={perk.title}
								className="p-5 rounded-xl border border-slate-100 bg-slate-50/50"
							>
								<h3 className="font-semibold text-slate-900 mb-1">
									{perk.title}
								</h3>
								<p className="text-sm text-slate-500">{perk.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 bg-slate-50/70">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<h2 className="text-2xl font-bold text-slate-900 mb-4">
						Open Positions
					</h2>
					<div className="max-w-lg mx-auto rounded-2xl border border-slate-200 bg-white p-10">
						<div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5">
							<IoMailOutline className="w-7 h-7 text-slate-400" />
						</div>
						<h3 className="text-lg font-semibold text-slate-900 mb-2">
							No open positions right now
						</h3>
						<p className="text-slate-500 text-[15px] leading-relaxed mb-6">
							We don't have any openings at the moment, but we're always
							interested in hearing from talented people. Send us your resume
							and we'll reach out when something fits.
						</p>
						<a
							href="mailto:careers@cryptdocker.com"
							className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
						>
							Send Your Resume
						</a>
						<p className="text-xs text-slate-400 mt-4">
							careers@cryptdocker.com
						</p>
					</div>
				</div>
			</section>

			<section className="py-16 bg-white">
				<div className="max-w-3xl mx-auto px-6 text-center">
					<p className="text-slate-500">
						Have questions about working at CryptDocker?{" "}
						<Link
							to={PATH.CONTACT}
							className="text-teal-600 font-medium hover:underline"
						>
							Get in touch
						</Link>
					</p>
				</div>
			</section>
		</>
	);
};
