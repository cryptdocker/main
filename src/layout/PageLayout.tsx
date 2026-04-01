import { Outlet } from "react-router-dom";
import { Navbar } from "../section/Navbar";
import { Footer } from "../section/Footer";
import { ScrollToHash } from "../component/ScrollToHash";

export const PageLayout: React.FC = () => {
	return (
		<div className="w-full relative overflow-x-hidden">
			<ScrollToHash />
			<Navbar />
			<main className="pt-16">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};
