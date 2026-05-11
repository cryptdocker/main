import { apiFetch } from "./api";

/* ---------------- Wallet Analysis (FailSafe Radar proxy) ---------------- */

export interface RadarFlags {
	sanctioned?: boolean;
	blacklisted?: boolean;
	threat_actor?: boolean;
	smart_money?: boolean;
}

export interface RadarEntity {
	name: string;
	type: string;
	id: string;
}

export interface RadarSignal {
	signal: string;
	contribution: number;
	source: string;
	matched_value: string;
}

export interface RadarRecommendation {
	action?: string;
	summary: string;
	details: string;
}

export interface RadarRiskResponse {
	address: string;
	score: number;
	risk_level: string;
	confidence: number;
	flags: RadarFlags;
	entity?: RadarEntity;
	signals?: RadarSignal[];
	labels?: string[];
	recommendation?: RadarRecommendation;
	metadata?: Record<string, unknown>;
}

export interface WalletAnalysisResponse {
	success: boolean;
	data?: RadarRiskResponse;
	error?: string;
}

/** Canonical examples: UI quick-fill; `analyzeWallet` returns static data and does not call the API. */
export const WALLET_ANALYSIS_CLIENT_ONLY_KYBER_SWAP =
	"0xC9B826BAD20872EB29f9b1D8af4BefE8460b50c6";
export const WALLET_ANALYSIS_CLIENT_ONLY_TRUST_DRAINER =
	"0x463452c356322d463b84891ebda33daed274cb40";

const WALLET_CLIENT_KYBER_LC = WALLET_ANALYSIS_CLIENT_ONLY_KYBER_SWAP.toLowerCase();
const WALLET_CLIENT_DRAINER_LC =
	WALLET_ANALYSIS_CLIENT_ONLY_TRUST_DRAINER.toLowerCase();

function walletAnalysisClientSample(addressTrimmed: string): RadarRiskResponse | null {
	const lower = addressTrimmed.toLowerCase();
	if (lower === WALLET_CLIENT_DRAINER_LC) {
		return {
			address: addressTrimmed,
			score: 70,
			risk_level: "HIGH",
			confidence: 1,
			flags: {
				sanctioned: false,
				blacklisted: true,
				threat_actor: true,
				smart_money: false,
			},
			labels: [
				"CryptoGuard Engine",
				"OFAC US Treasury",
				"CryptoGuard ScamDB",
				"On-chain analysis",
			],
			entity: {
				name: "Trust Wallet drainer pattern (illustrative sample)",
				type: "drainer",
				id: "client-sample-trust-drainer",
			},
			signals: [
				{
					signal: "Risk Flag",
					contribution: 0,
					source: "CryptoGuard",
					matched_value: "[CryptoGuard] Address on security blacklist",
				},
				{
					signal: "Risk Flag",
					contribution: 0,
					source: "CryptoGuard",
					matched_value: "[CryptoGuard] Address associated with asset theft attacks",
				},
				{
					signal: "Risk Flag",
					contribution: 0,
					source: "CryptoGuard",
					matched_value: "Large single transaction relative to current balance",
				},
				{
					signal: "blacklist doubt",
					contribution: 0,
					source: "CryptoGuard",
					matched_value: "detected",
				},
				{
					signal: "stealing attack",
					contribution: 0,
					source: "CryptoGuard",
					matched_value: "detected",
				},
			],
			recommendation: {
				action: "BLOCK",
				summary: "HIGH risk wallet",
				details:
					"[CryptoGuard] Address on security blacklist; [CryptoGuard] Address associated with asset theft attacks; Large single transaction relative to current balance",
			},
			metadata: { clientSample: true },
		};
	}
	if (lower === WALLET_CLIENT_KYBER_LC) {
		return {
			address: addressTrimmed,
			score: 40,
			risk_level: "MEDIUM",
			confidence: 1,
			flags: {
				sanctioned: false,
				blacklisted: false,
				threat_actor: true,
				smart_money: false,
			},
			labels: [
				"CryptoGuard Engine",
				"OFAC US Treasury",
				"CryptoGuard Scam DB",
				"On-chain analysis",
			],
			entity: {
				name: "Flagged counterparty (illustrative sample)",
				type: "threat_intelligence",
				id: "client-sample-kyber",
			},
			signals: [
				{
					signal: "Risk Flag",
					contribution: 0,
					source: "CryptoGuard",
					matched_value: "[CryptoGuard] Address associated with asset theft attacks",
				},
				{
					signal: "Risk Flag",
					contribution: 0,
					source: "CryptoGuard",
					matched_value: "Large single transaction relative to current balance",
				},
				{
					signal: "stealing attack",
					contribution: 0,
					source: "CryptoGuard",
					matched_value: "detected",
				},
			],
			recommendation: {
				summary: "MEDIUM risk wallet",
				details:
					"[CryptoGuard] Address associated with asset theft attacks; Large single transaction relative to current balance",
			},
			metadata: { clientSample: true },
		};
	}
	return null;
}

export const analyzeWallet = (address: string): Promise<WalletAnalysisResponse> => {
	const trimmed = address.trim();
	const sample = walletAnalysisClientSample(trimmed);
	if (sample) {
		return Promise.resolve({ success: true, data: sample });
	}
	return apiFetch<WalletAnalysisResponse>(
		`/public/wallet-analysis/${encodeURIComponent(trimmed)}`,
	);
};

/* ---------------- Site Analysis (trust score) ---------------- */

export interface SiteAnalysisResponse {
	success: boolean;
	domain?: string;
	summary?: string;
	sentiment?: string;
	takeaway?: string;
	items?: NewsAnalysisItem[];
	error?: string;
}

export const analyzeSite = (url: string): Promise<SiteAnalysisResponse> =>
	apiFetch<SiteAnalysisResponse>(`/public/site-analysis`, {
		method: "POST",
		body: JSON.stringify({ url: url.trim() }),
	});

/* ---------------- News Analysis ---------------- */

export interface NewsAnalysisItem {
	title: string;
	link: string;
	snippet?: string;
	date?: string;
	published_at?: string;
	favicon?: string;
	source?: string;
	thumbnail?: string;
}

export interface NewsAnalysisResponse {
	success: boolean;
	summary?: string;
	sentiment?: string;
	takeaway?: string;
	items?: NewsAnalysisItem[];
	error?: string;
}

export const analyzeNews = (
	keywords: string[],
): Promise<NewsAnalysisResponse> =>
	apiFetch<NewsAnalysisResponse>(`/public/news-analysis`, {
		method: "POST",
		body: JSON.stringify({ keywords }),
	});
