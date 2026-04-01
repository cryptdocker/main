import { useState, useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { IoMailOutline } from "react-icons/io5";
import { FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../layout/PageHeader";
import { Button } from "../component/Button";

const FORMSPREE_ID = "xvzvqady";

interface FormErrors {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
}

function validate(fields: {
	name: string;
	email: string;
	subject: string;
	message: string;
}): FormErrors {
	const errors: FormErrors = {};
	if (!fields.name.trim()) errors.name = "Name is required.";
	if (!fields.email.trim()) {
		errors.email = "Email is required.";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
		errors.email = "Please enter a valid email address.";
	}
	if (!fields.subject.trim()) errors.subject = "Subject is required.";
	if (!fields.message.trim()) {
		errors.message = "Message is required.";
	} else if (fields.message.trim().length < 10) {
		errors.message = "Message must be at least 10 characters.";
	}
	return errors;
}

export const Contact: React.FC = () => {
	const [searchParams] = useSearchParams();
	const prefillSubject = searchParams.get("subject") ?? "";
	const prefillMessage = searchParams.get("message") ?? "";

	const [formState, handleFormspree] = useForm(FORMSPREE_ID);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState(prefillSubject);
	const [message, setMessage] = useState(prefillMessage);
	const [errors, setErrors] = useState<FormErrors>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [showConfirmation, setShowConfirmation] = useState(false);
	const prevSucceeded = useRef(false);

	useEffect(() => {
		if (formState.succeeded && !prevSucceeded.current) {
			setShowConfirmation(true);
			const timer = setTimeout(() => {
				setShowConfirmation(false);
				setName("");
				setEmail("");
				setSubject("");
				setMessage("");
				setErrors({});
				setTouched({});
			}, 5000);
			return () => clearTimeout(timer);
		}
		prevSucceeded.current = formState.succeeded;
	}, [formState.succeeded]);

	const handleBlur = (field: string) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
		setErrors(validate({ name, email, subject, message }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const validationErrors = validate({ name, email, subject, message });
		setErrors(validationErrors);
		setTouched({ name: true, email: true, subject: true, message: true });

		if (Object.keys(validationErrors).length > 0) return;
		handleFormspree(e);
	};

	const inputClass = (field: keyof FormErrors) =>
		`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 transition ${
			touched[field] && errors[field]
				? "border-red-400 focus:border-red-500 focus:ring-red-500"
				: "border-slate-200 focus:border-teal-500 focus:ring-teal-500"
		}`;

	return (
		<>
			<PageHeader
				label="Contact"
				title="Get in Touch"
				description="Questions or ideas? Get in touch."
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

						{showConfirmation ? (
							<div className="text-center py-12 px-6 rounded-2xl border border-teal-100 bg-teal-50">
								<div className="w-14 h-14 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
									<IoMailOutline className="w-7 h-7" />
								</div>
								<h3 className="text-xl font-semibold text-slate-900 mb-2">
									Message Sent!
								</h3>
								<p className="text-sm text-slate-600">
									Thanks for reaching out. We'll get back to
									you as soon as possible.
								</p>
							</div>
						) : (
							<form
								className="space-y-5"
								onSubmit={handleSubmit}
							>
								<div className="grid sm:grid-cols-2 gap-5">
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1.5">
											Name
										</label>
										<input
											type="text"
											name="name"
											placeholder="Your name"
											value={name}
											onChange={(e) =>
												setName(e.target.value)
											}
											onBlur={() => handleBlur("name")}
											className={inputClass("name")}
										/>
										{touched.name && errors.name && (
											<p className="mt-1 text-xs text-red-500">
												{errors.name}
											</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1.5">
											Email
										</label>
										<input
											type="email"
											name="email"
											placeholder="you@example.com"
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											onBlur={() => handleBlur("email")}
											className={inputClass("email")}
										/>
										{touched.email && errors.email && (
											<p className="mt-1 text-xs text-red-500">
												{errors.email}
											</p>
										)}
										<ValidationError
											prefix="Email"
											field="email"
											errors={formState.errors}
											className="mt-1 text-xs text-red-500"
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-700 mb-1.5">
										Subject
									</label>
									<input
										type="text"
										name="subject"
										placeholder="What's this about?"
										value={subject}
										onChange={(e) =>
											setSubject(e.target.value)
										}
										onBlur={() => handleBlur("subject")}
										className={inputClass("subject")}
									/>
									{touched.subject && errors.subject && (
										<p className="mt-1 text-xs text-red-500">
											{errors.subject}
										</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-700 mb-1.5">
										Message
									</label>
									<textarea
										name="message"
										rows={5}
										placeholder="Tell us more..."
										value={message}
										onChange={(e) =>
											setMessage(e.target.value)
										}
										onBlur={() => handleBlur("message")}
										className={`${inputClass("message")} resize-none`}
									/>
									{touched.message && errors.message && (
										<p className="mt-1 text-xs text-red-500">
											{errors.message}
										</p>
									)}
								</div>
								<Button
									size="lg"
									className="w-full"
									disabled={formState.submitting}
								>
									{formState.submitting
										? "Sending..."
										: "Send Message"}
								</Button>
							</form>
						)}
					</div>

					<div className="mt-16 text-center">
						<p className="text-sm text-slate-400 mb-4">
							You can also find us on
						</p>
						<div className="flex items-center justify-center gap-5">
							<a
								href="https://linkedin.com/company/cryptdocker"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
								className="text-slate-400 hover:text-teal-600 transition-colors"
							>
								<FaLinkedin className="w-5 h-5" />
							</a>
							<a
								href="https://medium.com/@cryptdocker"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Medium"
								className="text-slate-400 hover:text-teal-600 transition-colors"
							>
								<FaMedium className="w-5 h-5" />
							</a>
							<a
								href="https://t.me/cryptdocker"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Telegram"
								className="text-slate-400 hover:text-teal-600 transition-colors"
							>
								<FaTelegram className="w-5 h-5" />
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
