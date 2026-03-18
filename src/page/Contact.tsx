import { IoMailOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { PageHeader } from "../layout/PageHeader";
import { Button } from "../component/Button";

export const Contact: React.FC = () => {
	return (
		<>
			<PageHeader
				label="Contact"
				title="Get in Touch"
				description="Have a question, partnership idea, or just want to say hi? We'd love to hear from you."
			/>

			<section className="py-20 bg-white">
				<div className="max-w-5xl mx-auto px-6">
					<div className="max-w-sm mx-auto mb-16">
						<div className="p-6 rounded-2xl border border-slate-100 bg-white text-center">
							<div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
								<IoMailOutline className="w-6 h-6" />
							</div>
							<h3 className="font-semibold text-slate-900 mb-1">
								Email
							</h3>
							<p className="text-sm text-slate-500 mb-2">
								For general inquiries and partnerships.
							</p>
							<a
								href="mailto:contact@cryptdocker.com"
								className="text-sm font-medium text-teal-600 hover:underline"
							>
								contact@cryptdocker.com
							</a>
						</div>
					</div>

					<div className="max-w-2xl mx-auto">
						<h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
							Send Us a Message
						</h2>
						<form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
							<div className="grid sm:grid-cols-2 gap-5">
								<div>
									<label className="block text-sm font-medium text-slate-700 mb-1.5">
										Name
									</label>
									<input
										type="text"
										placeholder="Your name"
										className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-700 mb-1.5">
										Email
									</label>
									<input
										type="email"
										placeholder="you@example.com"
										className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1.5">
									Subject
								</label>
								<input
									type="text"
									placeholder="What's this about?"
									className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1.5">
									Message
								</label>
								<textarea
									rows={5}
									placeholder="Tell us more..."
									className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition resize-none"
								/>
							</div>
							<Button size="lg" className="w-full">
								Send Message
							</Button>
						</form>
					</div>

					<div className="mt-16 text-center">
						<p className="text-sm text-slate-400 mb-4">
							You can also find us on
						</p>
						<div className="flex items-center justify-center gap-5">
							<a
								href="#"
								className="text-slate-400 hover:text-teal-600 transition-colors"
							>
								<SiX className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-slate-400 hover:text-teal-600 transition-colors"
							>
								<FaGithub className="w-5 h-5" />
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
