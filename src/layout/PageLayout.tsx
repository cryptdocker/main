import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "../section/Navbar";
import { Footer } from "../section/Footer";
import { ScrollToHash } from "../component/ScrollToHash";

export const PageLayout: React.FC = () => {
	const location = useLocation();

	return (
		<div className="w-full relative overflow-x-hidden bg-dark-base min-h-screen">
			<ScrollToHash />
			<Navbar />
			<AnimatePresence mode="wait">
				<motion.main
					key={location.pathname}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="pt-16"
				>
					<Outlet />
				</motion.main>
			</AnimatePresence>
			<Footer />
		</div>
	);
};
