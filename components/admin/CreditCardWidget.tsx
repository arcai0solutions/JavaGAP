export default function CreditCardWidget() {
    return (
        <div className="relative h-full w-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/20 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-blue-100 text-sm font-medium">Current Balance</p>
                    <h3 className="text-2xl font-bold mt-1">$ 24,562.00</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                </div>
            </div>

            <div className="relative z-10 mt-8">
                <div className="flex justify-between items-end mb-4">
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="font-mono text-blue-100">**** 4589</span>
                    <span className="text-blue-100">09/25</span>
                </div>
                <p className="mt-2 font-medium tracking-wide">Shahid H.</p>
            </div>
        </div>
    );
}
