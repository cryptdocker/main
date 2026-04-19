import { useState } from "react";
import { motion } from "framer-motion";
import {
	IoGlobeOutline,
	IoSearchOutline,
	IoAlertCircleOutline,
	IoShieldCheckmarkOutline,
	IoStar,
} from "react-icons/io5";
import { PageHeader } from "../layout/PageHeader";
import { Button } from "../component/Button";
import { SEO } from "../component/SEO";
import {
	analyzeSite,
	type SiteAnalysisResponse,
} from "../services/analysis.service";

function extractHost(input: string): string | null {
	const v = input.trim();
	if (!v) return null;
	try {
		const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
		const u = new URL(withScheme);
		const host = u.hostname.replace(/^www\./i, "");
		if (!host.includes(".")) return null;
		return host.toLowerCase();
	} catch {
		return null;
	}
}

function scoreTone(score: number) {
	if (score >= 4)
		return {
			label: "Trusted",
			wrap: "border-emerald-500/30 bg-emerald-500/10",
			text: "text-emerald-300",
			badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
		};
	if (score >= 2.5)
		return {
			label: "Mixed signals",
			wrap: "border-amber-500/30 bg-amber-500/10",
			text: "text-amber-300",
			badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
		};
	if (score > 0)
		return {
			label: "High risk",
			wrap: "border-red-500/30 bg-red-500/10",
			text: "text-red-300",
			badge: "bg-red-500/20 text-red-300 border-red-500/40",
		};
	return {
		label: "Unknown",
		wrap: "border-white/8 bg-white/4",
		text: "text-slate-300",
		badge: "bg-white/8 text-slate-300 border-white/12",
	};
}

function Stars({ value, max = 5 }: { value: number; max?: number }) {
	const filled = Math.round(Math.max(0, Math.min(max, value)));
	return (
		<span className="inline-flex items-center gap-0.5 align-middle">
			{Array.from({ length: max }).map((_, i) => (
				<IoStar
					key={i}
					className={`w-4 h-4 ${i < filled ? "text-amber-400" : "text-white/15"}`}
				/>
			))}
		</span>
	);
}

export const SiteAnalysis: React.FC = () => {
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<SiteAnalysisResponse | null>(null);

	const host = extractHost(input);
	const valid = !!host;

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!valid || loading) return;
		setLoading(true);
		setError(null);
		setData(null);
		try {
			const res = await analyzeSite(input.trim());
			if (res.success) setData(res);
			else setError(res.error || "Analysis failed.");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Request failed.");
		} finally {
			setLoading(false);
		}
	};

	const trustScore = data?.trustScore ?? 0;
	const tone = scoreTone(trustScore);

	return (
		<>
			<SEO
				title="Site Analysis"
				description="Grade any website's trust score from threat intelligence, brand signals, and real review aggregates — before you connect your wallet."
				path="/tools/site-analysis"
			/>
			<PageHeader
				label="Site Analysis"
				title="Check any site's trust score"
				description="Enter a URL to pull a combined trust rating from APIVoid threat intel, BrandFetch brand data, and Google / Trustpilot reviews."
			/>

			<section className="pb-24">
				<div className="max-w-3xl mx-auto px-6">
					<motion.form
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						onSubmit={onSubmit}
						className="glass rounded-2xl p-5 sm:p-6"
					>
						<label className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
							<IoGlobeOutline className="w-4 h-4 text-teal-400" />
							Site URL or domain
						</label>
						<div className="flex flex-col sm:flex-row gap-3">
							<input
								type="text"
								autoComplete="off"
								spellCheck={false}
								placeholder="https://example.com"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-white/8 bg-white/4 text-slate-200 placeholder:text-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/30 focus:border-teal-500/50 transition"
							/>
							<Button
								size="lg"
								disabled={!valid || loading}
								title={!valid ? "Enter a valid URL or domain" : undefined}
							>
								<IoSearchOutline className="w-5 h-5 mr-2" />
								{loading ? "Analyzing…" : "Analyze"}
							</Button>
						</div>
						<p className="mt-3 text-xs text-slate-500">
							Example: <span className="font-mono">binance.com</span>,{" "}
							<span className="font-mono">https://uniswap.org</span>
						</p>
					</motion.form>

					{error && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 flex gap-3"
						>
							<IoAlertCircleOutline className="w-5 h-5 text-red-300 shrink-0 mt-0.5" />
							<div className="min-w-0">
								<p className="text-sm font-medium text-red-200">Analysis failed</p>
								<p className="text-sm text-red-300/80 mt-1 wrap-break-word">{error}</p>
							</div>
						</motion.div>
					)}

					{loading && !data && !error && (
						<div className="mt-6 space-y-3">
							<div className="h-28 rounded-2xl bg-white/4 border border-white/6 animate-pulse" />
							<div className="h-24 rounded-2xl bg-white/4 border border-white/6 animate-pulse" />
						</div>
					)}

					{data && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45 }}
							className="mt-6 space-y-4"
						>
							<div className={`rounded-2xl border ${tone.wrap} p-5`}>
								<div className="flex flex-wrap items-start justify-between gap-3">
									<div className="min-w-0">
										<p className="text-[11px] uppercase tracking-wider text-slate-400 mb-1">
											Domain
										</p>
										<p className="text-lg font-semibold text-slate-100 break-all">
											{data.details?.companyName || data.domain}
										</p>
										<p className="text-xs text-slate-500 font-mono break-all">
											{data.domain}
										</p>
									</div>
									<span
										className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${tone.badge}`}
									>
										<IoShieldCheckmarkOutline className="w-3.5 h-3.5" />
										{tone.label}
									</span>
								</div>
								<div className="mt-4 flex flex-wrap items-end gap-6">
									<div>
										<p className="text-[11px] uppercase tracking-wider text-slate-400">
											Trust score
										</p>
										<div className="flex items-end gap-2">
											<p
												className={`text-4xl font-extrabold tabular-nums ${tone.text}`}
											>
												{trustScore.toFixed(1)}
											</p>
											<span className="text-sm text-slate-500 pb-1">/ 5</span>
										</div>
										<div className="mt-1">
											<Stars value={trustScore} />
										</div>
									</div>
								</div>
							</div>

							<div className="grid sm:grid-cols-3 gap-4">
								<MetricCard
									title="Threat intel"
									source="APIVoid"
									score={
										data.details?.apivoid
											? data.details.apivoid.normalized
											: null
									}
									subtitle={
										data.details?.apivoid
											? `Raw: ${data.details.apivoid.raw}`
											: "No data"
									}
								/>
								<MetricCard
									title="Google reviews"
									source="Google Maps"
									score={data.details?.google?.rating ?? null}
									subtitle={
										data.details?.google?.reviews
											? `${data.details.google.reviews.toLocaleString()} reviews`
											: "No reviews"
									}
								/>
								<MetricCard
									title="Trustpilot"
									source="Trustpilot"
									score={data.details?.trustpilot?.rating ?? null}
									subtitle={
										data.details?.trustpilot?.totalReviews
											? `${data.details.trustpilot.totalReviews.toLocaleString()} reviews`
											: "No reviews"
									}
								/>
							</div>
						</motion.div>
					)}
				</div>
			</section>
		</>
	);
};

function MetricCard({
	title,
	source,
	score,
	subtitle,
}: {
	title: string;
	source: string;
	score: number | null;
	subtitle?: string;
}) {
	const hasScore = typeof score === "number" && !Number.isNaN(score);
	return (
		<div className="rounded-2xl border border-white/8 bg-white/4 p-4">
			<div className="flex items-baseline justify-between">
				<p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
					{title}
				</p>
				<span className="text-[10px] uppercase tracking-wider text-slate-500">
					{source}
				</span>
			</div>
			<div className="mt-2 flex items-end gap-2">
				{hasScore ? (
					<>
						<p className="text-2xl font-bold text-slate-100 tabular-nums">
							{(score as number).toFixed(1)}
						</p>
						<span className="text-xs text-slate-500 pb-1">/ 5</span>
					</>
				) : (
					<p className="text-2xl font-bold text-slate-500">—</p>
				)}
			</div>
			{hasScore && (
				<div className="mt-1">
					<Stars value={score as number} />
				</div>
			)}
			{subtitle && (
				<p className="mt-2 text-xs text-slate-500 truncate">{subtitle}</p>
			)}
		</div>
	);
}
