import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Button } from "../component/Button";
import { PATH } from "../const";
import { authService } from "../services";

type LocationState = { resetToken?: string; email?: string } | null;

export const ResetPassword: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const state = (location.state as LocationState) ?? null;
	const resetToken = state?.resetToken ?? "";

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const canSubmit = useMemo(() => {
		if (!resetToken) return false;
		if (!password.trim() || !confirmPassword.trim()) return false;
		return password === confirmPassword;
	}, [resetToken, password, confirmPassword]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (!resetToken) {
			setError("Missing reset token. Please verify your reset code again.");
			return;
		}
		if (!password.trim()) {
			setError("Please enter a new password.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setLoading(true);
		try {
			await authService.resetPassword({ resetToken, newPassword: password });
			setSuccess(true);
			setTimeout(() => navigate(PATH.SIGN_IN, { replace: true }), 1200);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to reset password.");
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<div className="max-w-xl w-full mx-auto px-6 py-20">
				<div className="glass-strong rounded-2xl p-8 text-center">
					<h1 className="text-2xl font-bold text-white">Password updated</h1>
					<p className="text-slate-400 mt-2">Redirecting you to sign in…</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-xl w-full mx-auto px-6 py-20">
			<div className="glass-strong rounded-2xl p-8">
				<h1 className="text-2xl font-bold text-white">Set new password</h1>
				<p className="text-slate-400 mt-2">
					Choose a new password for your account.
				</p>
				<p className="text-slate-400 mt-2">
					Need a new code?{" "}
					<Link
						className="text-teal-300 hover:text-teal-200 underline"
						to={PATH.FORGOT_PASSWORD}
					>
						Restart reset
					</Link>
				</p>

				{!resetToken && (
					<div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
						This page requires a verified reset code.
					</div>
				)}
				{error && (
					<div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<div className="space-y-1.5">
						<label className="text-sm text-slate-300" htmlFor="new-password">
							New password
						</label>
						<input
							id="new-password"
							type="password"
							autoComplete="new-password"
							className="w-full rounded-xl bg-dark-card/60 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-teal-500/60 focus:ring-0"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={loading || !resetToken}
							placeholder="••••••••"
						/>
					</div>
					<div className="space-y-1.5">
						<label className="text-sm text-slate-300" htmlFor="confirm-new-password">
							Confirm new password
						</label>
						<input
							id="confirm-new-password"
							type="password"
							autoComplete="new-password"
							className="w-full rounded-xl bg-dark-card/60 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-teal-500/60 focus:ring-0"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							disabled={loading || !resetToken}
							placeholder="••••••••"
						/>
					</div>
					<Button type="submit" className="w-full" disabled={loading || !canSubmit}>
						{loading ? "Saving..." : "Update password"}
					</Button>
				</form>
			</div>
		</div>
	);
};

