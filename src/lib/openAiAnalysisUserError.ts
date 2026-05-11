function tryParseOpenAIErrorBody(raw: string): {
	code?: string;
	type?: string;
} | null {
	const start = raw.indexOf("{");
	if (start === -1) return null;
	try {
		const parsed = JSON.parse(raw.slice(start)) as {
			error?: { code?: string; type?: string };
		};
		const inner = parsed?.error;
		if (!inner || typeof inner !== "object") return null;
		return { code: inner.code, type: inner.type };
	} catch {
		return null;
	}
}

const DEFAULT_INSUFFICIENT_QUOTA_MESSAGE =
	"We couldn't generate an AI summary right now. Please try again in a little while.";

/**
 * Maps OpenAI `insufficient_quota` payloads (e.g. from backend `OpenAI error 429: {...}`) to
 * user-safe copy so billing/quota details are not shown. Other errors pass through unchanged.
 */
export function userFacingOpenAiAnalysisError(
	raw: string,
	insufficientQuotaMessage: string = DEFAULT_INSUFFICIENT_QUOTA_MESSAGE,
): string {
	const openai = tryParseOpenAIErrorBody(raw);
	const isInsufficientQuota =
		openai?.code === "insufficient_quota" ||
		openai?.type === "insufficient_quota" ||
		raw.includes("insufficient_quota");
	if (isInsufficientQuota) return insufficientQuotaMessage;
	return raw;
}
