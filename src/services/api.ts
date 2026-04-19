import { Env } from "../const";

const API_BASE_URL = Env.API_URL.replace(/\/+$/, "");

export class ApiError extends Error {
	status: number;
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

export async function apiFetch<T>(
	path: string,
	init?: RequestInit,
): Promise<T> {
	const url = path.startsWith("http")
		? path
		: `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

	const res = await fetch(url, {
		...init,
		headers: {
			Accept: "application/json",
			...(init?.body && !(init.body instanceof FormData)
				? { "Content-Type": "application/json" }
				: {}),
			...(init?.headers ?? {}),
		},
	});

	const contentType = res.headers.get("content-type") ?? "";
	const isJson = contentType.includes("application/json");
	const payload = isJson
		? ((await res.json().catch(() => ({}))) as unknown)
		: ((await res.text().catch(() => "")) as unknown);

	if (!res.ok) {
		const message =
			(isJson &&
				typeof payload === "object" &&
				payload !== null &&
				("error" in payload || "message" in payload)
				? String(
						(payload as { error?: unknown; message?: unknown }).error ??
							(payload as { message?: unknown }).message ??
							"",
					)
				: typeof payload === "string"
					? payload
					: "") || `Request failed (${res.status})`;
		throw new ApiError(message, res.status);
	}

	return payload as T;
}
