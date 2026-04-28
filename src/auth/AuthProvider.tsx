import { useCallback, useMemo, useState } from "react";
import { AuthContext, type AuthUser, AUTH_STORAGE_KEY } from "./AuthContext";

function loadStoredAuth(): { user: AuthUser; token: string } | null {
	try {
		const raw = localStorage.getItem(AUTH_STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as { user?: AuthUser; token?: string };
		if (parsed?.token && parsed?.user?.email) return { user: parsed.user, token: parsed.token };
		return null;
	} catch {
		return null;
	}
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const stored = loadStoredAuth();
	const [user, setUser] = useState<AuthUser | null>(stored?.user ?? null);
	const [token, setToken] = useState<string | null>(stored?.token ?? null);

	const signIn = useCallback((payload: { user: AuthUser; token: string }) => {
		setUser(payload.user);
		setToken(payload.token);
		localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
	}, []);

	const signOut = useCallback(() => {
		setUser(null);
		setToken(null);
		localStorage.removeItem(AUTH_STORAGE_KEY);
	}, []);

	const value = useMemo(() => ({ user, token, signIn, signOut }), [user, token, signIn, signOut]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

