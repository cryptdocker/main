import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { ApiError } from "../../services/api";
import type { CreatePaymentResult } from "../../services/payment.service";
import { paymentService } from "../../services/payment.service";
import { userService, type MeResponse } from "../../services/user.service";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { ErrorBanner } from "./components/ErrorBanner";
import { cx } from "./components/shared";
import {
	AccountSection,
	DevicesSection,
	PlanBillingSection,
} from "./components/DashboardSections";

type DashboardMainTab = "user" | "billing" | "signins";

const DASHBOARD_MAIN_TABS: { id: DashboardMainTab; label: string }[] = [
	{ id: "user", label: "User" },
	{ id: "billing", label: "Plan & Billing" },
	{ id: "signins", label: "Sign In History" },
];

const getMinimumTopUpAmount = (ticker: string): number => {
	const normalized = ticker.toLowerCase();
	if (normalized === "usdt-trc20") return 10;
	if (normalized === "usdt-erc20" || normalized === "usdc-erc20") return 2;
	return 1;
};

// ─── main component ───────────────────────────────────────────────────────────

export const Dashboard: React.FC = () => {
	const { user, token, signOut } = useAuth();
	const [me, setMe] = useState<MeResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// profile
	const [savingProfile, setSavingProfile] = useState(false);
	const [profileFullName, setProfileFullName] = useState("");
	const [avatarUploading, setAvatarUploading] = useState(false);

	// billing/top-up
	const [topUpOpen, setTopUpOpen] = useState(false);
	const [topUpAmount, setTopUpAmount] = useState("");
	const [topUpMethod, setTopUpMethod] = useState("usdt-erc20");
	const [topUpBusy, setTopUpBusy] = useState(false);
	const [topUpPayment, setTopUpPayment] = useState<CreatePaymentResult | null>(null);

	const [mainTab, setMainTab] = useState<DashboardMainTab>("user");

	const authed = useMemo(() => ({ token: token ?? "" }), [token]);

	// ── load ──────────────────────────────────────────────────────────────────

	const loadAll = async () => {
		if (!token) return;
		setLoading(true);
		setError(null);
		try {
			const meRes = await userService.getMe(token);

			setMe(meRes);
			setProfileFullName(meRes.fullName ?? "");
		} catch (e) {
			if (e instanceof ApiError && e.status === 401) {
				signOut();
				return;
			}
			setError(e instanceof Error ? e.message : "Failed to load dashboard.");
		} finally {
			setLoading(false);
		}
	};

	const refreshMeSilently = async () => {
		if (!token) return;
		try {
			const meRes = await userService.getMe(token);
			setMe(meRes);
		} catch (e) {
			if (e instanceof ApiError && e.status === 401) {
				signOut();
				return;
			}
			setError(e instanceof Error ? e.message : "Failed to refresh dashboard data.");
		}
	};

	useEffect(() => {
		loadAll(); /* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [authed.token]);

	// ── plan helpers ──────────────────────────────────────────────────────────

	const plan = useMemo(() => {
		const isPro = me?.paymentMethod === "pro";
		const trialActive =
			!!me?.trialExpiresAt &&
			new Date(me.trialExpiresAt).getTime() > Date.now();
		const graceActive =
			!!me?.proGraceUntil && new Date(me.proGraceUntil).getTime() > Date.now();
		return { isPro, trialActive, graceActive };
	}, [me]);

	// ── handlers ──────────────────────────────────────────────────────────────

	const saveProfile = async () => {
		if (!token || !me?.uuid) return;
		setSavingProfile(true);
		setError(null);
		try {
			await userService.updateMe(token, {
				uuid: me.uuid,
				fullName: profileFullName.trim() || undefined,
			});
			setMe(await userService.getMe(token));
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to update profile.");
		} finally {
			setSavingProfile(false);
		}
	};

	const uploadAvatar = async (file: File) => {
		if (!token || !me?.uuid) return;
		setAvatarUploading(true);
		setError(null);
		try {
			const res = await userService.uploadAvatar(token, {
				uuid: me.uuid,
				file,
			});
			setMe((p) => (p ? { ...p, avatar: res.avatar ?? p.avatar } : p));
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to upload photo.");
		} finally {
			setAvatarUploading(false);
		}
	};

	const upgrade = async () => {
		if (!token) return;
		setError(null);
		try {
			const res = await userService.upgradeToPro(token);
			if (res.user) setMe(res.user);
			else await loadAll();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Upgrade failed.");
		}
	};

	const cancelPro = async () => {
		if (!token) return;
		if (!confirm("Cancel Pro at the end of this billing period?")) return;
		setError(null);
		try {
			const res = await userService.cancelProAtPeriodEnd(token);
			if (res.user) setMe(res.user);
			else await loadAll();
		} catch (e) {
			setError(
				e instanceof Error ? e.message : "Could not schedule cancellation.",
			);
		}
	};

	const startTopUp = async () => {
		if (!me?.uuid) return;
		const amt = Number(topUpAmount);
		if (!Number.isFinite(amt) || amt <= 0) {
			setError("Enter a valid top up amount.");
			return;
		}
		const minimumAmount = getMinimumTopUpAmount(topUpMethod);
		if (amt < minimumAmount) {
			setError(`Minimum top up for ${topUpMethod.toUpperCase()} is $${minimumAmount}.`);
			return;
		}
		setError(null);
		setTopUpBusy(true);
		try {
			const p = await paymentService.createPayment({
				userUuid: me.uuid,
				amount: amt,
				ticker: topUpMethod,
			});
			setTopUpPayment(p);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to create payment.");
		} finally {
			setTopUpBusy(false);
		}
	};

	useEffect(() => {
		if (!topUpPayment?.uuid) return;
		if (String(topUpPayment.status).toLowerCase() === "confirmed") return;
		let cancelled = false;
		const interval = setInterval(async () => {
			try {
				const s = await paymentService.getPaymentStatus(topUpPayment.uuid);
				if (cancelled) return;
				setTopUpPayment((prev) =>
					prev
						? {
								...prev,
								status: s.status ?? prev.status,
								addressIn: s.addressIn ?? prev.addressIn,
								amount: s.amount ?? prev.amount,
								ticker: s.ticker ?? prev.ticker,
								minimumTransactionCoin:
									s.minimumTransactionCoin ?? prev.minimumTransactionCoin,
							}
						: prev,
				);
				if (String(s.status).toLowerCase() === "confirmed") {
					clearInterval(interval);
					setTopUpAmount("");
					void refreshMeSilently();
				}
			} catch {
				// ignore transient poll failures
			}
		}, 5000);
		return () => {
			cancelled = true;
			clearInterval(interval);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [topUpPayment?.uuid]);

	if (!user) return null;

	// ── render ────────────────────────────────────────────────────────────────

	return (
		<div className="max-w-8xl w-full mx-auto px-5 py-12">
			<DashboardHeader loading={loading} onRefresh={loadAll} />

			<ErrorBanner error={error} onDismiss={() => setError(null)} />

			{loading ? (
				<DashboardSkeleton />
			) : (
				<div className="space-y-5">
					<div
						className="flex flex-wrap gap-1"
						role="tablist"
						aria-label="Dashboard sections">
						{DASHBOARD_MAIN_TABS.map((t) => (
							<button
								key={t.id}
								type="button"
								role="tab"
								aria-selected={mainTab === t.id}
								id={`dashboard-tab-${t.id}`}
								className={cx(
									"max-w-48 flex-1 px-3 py-2.5 text-sm font-semibold transition-colors sm:px-4",
									mainTab === t.id
										? "text-white shadow-sm border-b-2 border-white/10"
										: "text-slate-500 hover:text-slate-200 border-b-2 border-transparent",
								)}
								onClick={() => setMainTab(t.id)}>
								{t.label}
							</button>
						))}
					</div>

					{mainTab === "user" && (
						<div
							className="space-y-5 h-[calc(100vh-310px)]"
							role="tabpanel"
							aria-labelledby="dashboard-tab-user">
							<AccountSection
								me={me}
								profileFullName={profileFullName}
								setProfileFullName={setProfileFullName}
								savingProfile={savingProfile}
								onSaveProfile={saveProfile}
								onResetProfile={() => setProfileFullName(me?.fullName ?? "")}
								onLogout={signOut}
								avatarUploading={avatarUploading}
								onUploadAvatar={uploadAvatar}
							/>
						</div>
					)}

					{mainTab === "billing" && (
						<div role="tabpanel"className="space-y-5 h-[calc(100vh-310px)]" aria-labelledby="dashboard-tab-billing">
							<PlanBillingSection
								me={me}
								plan={plan}
								onUpgrade={upgrade}
								onCancelPro={cancelPro}
								topUp={{
									open: topUpOpen,
									onToggle: () => setTopUpOpen((p) => !p),
									amount: topUpAmount,
									onAmountChange: setTopUpAmount,
									method: topUpMethod,
									onMethodChange: setTopUpMethod,
									minimumAmount: getMinimumTopUpAmount(topUpMethod),
									busy: topUpBusy,
									payment: topUpPayment,
									onPay: startTopUp,
									onReset: () => {
										setTopUpPayment(null);
										setTopUpAmount("");
									},
								}}
							/>
						</div>
					)}

					{mainTab === "signins" && (
						<div role="tabpanel"className="space-y-5 h-[calc(100vh-310px)]" aria-labelledby="dashboard-tab-signins">
							<DevicesSection me={me} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};
