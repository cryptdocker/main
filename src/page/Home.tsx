import { Hero } from "../section/Hero";
import { Features } from "../section/Features";
import { AITools } from "../section/AITools";
import { Pricing } from "../section/Pricing";
import { CTA } from "../section/CTA";
import { SEO } from "../component/SEO";

export const Home: React.FC = () => {
	return (
		<div className="-mt-16">
			<SEO path="/" />
			<Hero />
			<Features />
			<AITools />
			<Pricing />
			<CTA />
		</div>
	);
};
