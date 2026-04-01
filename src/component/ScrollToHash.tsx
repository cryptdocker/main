import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToHash: React.FC = () => {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const id = hash.replace("#", "");
			const poll = () => {
				const el = document.getElementById(id);
				if (el) {
					el.scrollIntoView({ behavior: "smooth" });
				}
			};
			// Small delay so the target page has time to mount
			const timeout = setTimeout(poll, 80);
			return () => clearTimeout(timeout);
		}

		window.scrollTo(0, 0);
	}, [pathname, hash]);

	return null;
};
