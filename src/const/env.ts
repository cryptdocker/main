export const Env = {
	API_URL:
		(import.meta.env.VITE_API_URL as string | undefined) ||
		"https://api.cryptdocker.com/api",
};
