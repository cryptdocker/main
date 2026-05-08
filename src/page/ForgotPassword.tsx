import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../component/Button";
import { PATH } from "../const";
import { authService } from "../services";

export const ForgotPassword: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		const trimmed = email.trim();
		if (!trimmed) {
			setError("Please enter your email.");
			return;
		}

		setLoading(true);
		try {
			await authService.forgotPassword({ email: trimmed });
			setSuccess("We sent a 6-digit code to your email.");
			navigate(PATH.VERIFY_PASSWORD_RESET, {
				state: { ...(location.state ?? {}), email: trimmed },
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to send reset code.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-xl w-full mx-auto px-6 py-20">
			<div className="glass-strong rounded-2xl p-8">
				<h1 className="text-2xl font-bold text-white">Forgot password</h1>
				<p className="text-slate-400 mt-2">
					Enter your email and we’ll send a 6-digit reset code.
				</p>
				<p className="text-slate-400 mt-2">
					Remembered it?{" "}
					<Link className="text-teal-300 hover:text-teal-200 underline" to={PATH.SIGN_IN}>
						Sign in
					</Link>
				</p>

				{error && (
					<div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
						{error}
					</div>
				)}
				{success && (
					<div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
						{success}
					</div>
				)}

				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<div className="space-y-1.5">
						<label className="text-sm text-slate-300" htmlFor="forgot-email">
							Email
						</label>
						<input
							id="forgot-email"
							type="email"
							autoComplete="email"
							className="w-full rounded-xl bg-dark-card/60 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-teal-500/60 focus:ring-0"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
							placeholder="you@example.com"
						/>
					</div>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Sending..." : "Send reset code"}
					</Button>
				</form>
			</div>
		</div>
	);
};

