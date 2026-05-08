import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Button } from "../component/Button";
import { PATH } from "../const";
import { authService } from "../services";

type LocationState = { email?: string } | null;

export const VerifyPasswordReset: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const state = (location.state as LocationState) ?? null;

	const [email, setEmail] = useState(state?.email ?? "");
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [resendLoading, setResendLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const codeDigits = useMemo(() => code.replace(/\D/g, "").slice(0, 6), [code]);

	const handleVerify = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		const trimmedEmail = email.trim();
		if (!trimmedEmail) {
			setError("Please enter your email.");
			return;
		}
		if (codeDigits.length !== 6) {
			setError("Please enter the 6-digit code from your email.");
			return;
		}

		setLoading(true);
		try {
			const { resetToken } = await authService.verifyPasswordResetCode({
				email: trimmedEmail,
				code: codeDigits,
			});
			navigate(PATH.RESET_PASSWORD, {
				state: { ...(location.state ?? {}), resetToken, email: trimmedEmail },
				replace: true,
			});
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Invalid or expired code. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleResend = async () => {
		setError(null);
		setSuccess(null);

		const trimmedEmail = email.trim();
		if (!trimmedEmail) {
			setError("Please enter your email.");
			return;
		}

		setResendLoading(true);
		try {
			await authService.forgotPassword({ email: trimmedEmail });
			setSuccess("A new code has been sent.");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to resend code.");
		} finally {
			setResendLoading(false);
		}
	};

	const busy = loading || resendLoading;

	return (
		<div className="max-w-xl w-full mx-auto px-6 py-20">
			<div className="glass-strong rounded-2xl p-8">
				<h1 className="text-2xl font-bold text-white">Verify reset code</h1>
				<p className="text-slate-400 mt-2">
					Enter the 6-digit code we sent to your email.
				</p>
				<p className="text-slate-400 mt-2">
					Need to start over?{" "}
					<Link
						className="text-teal-300 hover:text-teal-200 underline"
						to={PATH.FORGOT_PASSWORD}
					>
						Send a new code
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

				<form onSubmit={handleVerify} className="mt-6 space-y-4">
					<div className="space-y-1.5">
						<label className="text-sm text-slate-300" htmlFor="reset-email">
							Email
						</label>
						<input
							id="reset-email"
							type="email"
							autoComplete="email"
							className="w-full rounded-xl bg-dark-card/60 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-teal-500/60 focus:ring-0"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={busy}
							placeholder="you@example.com"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-sm text-slate-300" htmlFor="reset-code">
							6-digit code
						</label>
						<input
							id="reset-code"
							inputMode="numeric"
							autoComplete="one-time-code"
							className="w-full rounded-xl bg-dark-card/60 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-teal-500/60 focus:ring-0 tracking-widest"
							value={codeDigits}
							onChange={(e) => setCode(e.target.value)}
							disabled={busy}
							placeholder="123456"
						/>
					</div>

					<Button type="submit" className="w-full" disabled={busy}>
						{loading ? "Verifying..." : "Verify code"}
					</Button>
				</form>

				<div className="mt-4">
					<button
						type="button"
						onClick={() => void handleResend()}
						disabled={busy}
						className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-50"
					>
						{resendLoading ? "Resending..." : "Resend code"}
					</button>
				</div>
			</div>
		</div>
	);
};

