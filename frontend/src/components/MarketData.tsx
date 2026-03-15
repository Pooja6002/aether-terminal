'use client';
import React from 'react';
import { Activity, CircleUser, Map } from 'lucide-react';

export default function MarketData({ signals }: { signals: any[] }) {
    // Hardcoded to match the reference XAU/USD layout
    return (
        <div className="w-full h-full flex flex-col bg-transparent font-sans text-[#e2e8f0]">
            {/* Top Header Card like Reference */}
            <div className="px-4 py-3 border-b border-[#1e293b] flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span>
                    <span className="text-[10px] uppercase font-bold text-[#94a3b8] tracking-widest">Global 2</span>
                </div>
            </div>

            {/* Main Asset Focus */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">

                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-black font-mono tracking-tight text-white mb-1">XAU/USD <span className="ml-2 text-[10px] bg-[#064e3b] text-[#10b981] px-1.5 py-0.5 rounded tracking-widest">BUY</span></h2>
                        <p className="text-[10px] text-[#64748b] font-mono tracking-widest uppercase">Commodities / Global</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-black font-mono tracking-tight text-white mb-1">$2314.50</h2>
                        <p className="text-[11px] text-[#10b981] font-mono tracking-widest">+1.2%</p>
                    </div>
                </div>

                {/* AI Confidence Bar */}
                <div className="w-full bg-[#0f172a] h-1.5 rounded-full overflow-hidden flex my-2 border border-[#1e293b]">
                    <div className="bg-[#3b82f6] h-full" style={{ width: '85%' }}></div>
                    <div className="bg-[#1e293b] h-full" style={{ width: '15%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-[#64748b] font-mono tracking-widest uppercase">
                    <span>Confidence: 85%</span>
                    <span>Uncertainty: 15%</span>
                </div>

                {/* AI Analysis Block */}
                <div className="mt-4 bg-[#0a1120] border border-[#1e293b] rounded p-3">
                    <h3 className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest mb-1 flex items-center">
                        <Activity className="w-3 h-3 mr-1 text-[#3b82f6]" /> AI Analysis
                    </h3>
                    <p className="text-[11px] text-[#cbd5e1] leading-relaxed mb-3 font-sans">
                        Safe haven flows increasing due to elevated geopolitical stress.
                    </p>

                    <h3 className="text-[10px] text-[#f59e0b] font-bold uppercase tracking-widest mb-1">Warning</h3>
                    <ul className="text-[11px] text-[#94a3b8] space-y-1 ml-4 list-disc font-sans">
                        <li>Sudden de-escalation</li>
                        <li>Strong DXY data</li>
                    </ul>
                </div>

                {/* Additional Signals Accordion/List */}
                <div className="pt-2">
                    <h3 className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest mb-3 pb-1 border-b border-[#1e293b]">All Signals (2)</h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-bold text-white font-mono">XAU/USD</span>
                                    <span className="text-[8px] bg-[#064e3b] text-[#10b981] px-1 rounded uppercase font-bold tracking-widest">BUY</span>
                                </div>
                                <div className="text-[10px] text-[#64748b] font-mono uppercase tracking-widest mt-0.5">Commodities</div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-[#10b981] font-mono block">+1.2%</span>
                                <span className="text-xs text-slate-300 font-mono block mt-0.5">2314.50</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-bold text-white font-mono">SPX</span>
                                    <span className="text-[8px] bg-[#450a0a] text-[#ef4444] px-1 rounded uppercase font-bold tracking-widest">SELL</span>
                                </div>
                                <div className="text-[10px] text-[#64748b] font-mono uppercase tracking-widest mt-0.5">Equities</div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-[#ef4444] font-mono block">-1.2%</span>
                                <span className="text-xs text-slate-300 font-mono block mt-0.5">5124.30</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
