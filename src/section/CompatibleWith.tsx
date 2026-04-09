import { SectionHeading } from "../component/SectionHeading";

const brands = [
	{
		name: "Binance",
		logoUrl: "https://bin.bnbstatic.com/static/images/bnb-for/brand.png",
	},
	{
		name: "Coinbase",
		logoUrl: "https://www.coinbase.com/favicon.ico",
	},
	{
		name: "DexScreener",
		logoUrl: "https://dexscreener.com/favicon.ico",
	},
	{
		name: "Uniswap",
		logoUrl: "https://app.uniswap.org/favicon.ico",
	},
	{
		name: "TradingView",
		logoUrl: "https://www.tradingview.com/favicon.ico",
	},
];

export const CompatibleWith: React.FC = () => {
	return (
		<section className="py-16 bg-white">
			<div className="max-w-6xl mx-auto px-6">
				<SectionHeading
					label="Ecosystem"
					title="Compatible with the tools you already trust"
					description="CryptDocker runs the web apps you use every day — with isolation, extensions, and controls built in."
				/>

				<div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6 md:p-8 overflow-hidden">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 items-center">
						{brands.map((b) => (
							<div
								key={b.name}
								className="flex items-center justify-center rounded-2xl bg-white border border-slate-100 px-4 py-4"
								title={b.name}
							>
								<div className="flex items-center gap-3">
									<img
										src={b.logoUrl}
										alt={`${b.name} logo`}
										className="w-7 h-7 rounded"
										loading="lazy"
										referrerPolicy="no-referrer"
									/>
									<span className="text-sm font-semibold text-slate-700">
										{b.name}
									</span>
								</div>
							</div>
						))}
					</div>

					<p className="mt-6 text-center text-xs text-slate-400">
						Third-party trademarks belong to their respective owners. Compatibility
						refers to using their web apps inside CryptDocker.
					</p>
				</div>
			</div>
		</section>
	);
};

