import { Outlet } from "react-router-dom";
import { Navbar } from "../section/Navbar";
import { Footer } from "../section/Footer";

export const PageLayout: React.FC = () => {
	return (
		<div className="w-full relative overflow-x-hidden">
			<Navbar />
			<main className="pt-16">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};
