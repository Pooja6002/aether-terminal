'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TradingSignals({ signals }: { signals: any[] }) {
    // Layout matching the bottom terminal strip
    return (
        <div className="w-full h-full flex px-4 items-center space-x-6 overflow-hidden bg-transparent font-sans">

            {/* Fixed Context Block Left */}
            <div className="shrink-0 flex items-center space-x-4 pr-6 border-r border-[#1e293b] h-3/4">
                <div className="flex flex-col space-y-2">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#64748b] font-bold">Severity Level</span>
                    <div className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span><span className="text-[9px] uppercase tracking-widest text-[#94a3b8] font-mono">CRITICAL [99]</span></div>
                    <div className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span><span className="text-[9px] uppercase tracking-widest text-[#94a3b8] font-mono">HIGH [60]</span></div>
                    <div className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span><span className="text-[9px] uppercase tracking-widest text-[#94a3b8] font-mono">MEDIUM [40]</span></div>
                    <div className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span><span className="text-[9px] uppercase tracking-widest text-[#94a3b8] font-mono">LOW [10]</span></div>
                </div>
            </div>

            {/* Global Risk Index */}
            <div className="shrink-0 flex items-center pr-6 border-r border-[#1e293b] h-3/4">
                <div className="flex flex-col mr-4">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#64748b] font-bold mb-1">GTI INDEX</span>
                    <div className="flex space-x-0.5 mt-1">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className={`w-1.5 h-3 ${i < 8 ? 'bg-[#3b82f6]' : 'bg-[#1e293b]'}`}></div>
                        ))}
                    </div>
                </div>
                <span className="text-xl font-mono text-[#3b82f6]">72.4</span>
            </div>

            {/* Horizontal List of Signals */}
            <div className="flex-1 flex items-center h-3/4 space-x-4 overflow-x-auto custom-scrollbar">
                <AnimatePresence>
                    {signals.map((sig, idx) => {
                        const isBuy = sig.signal === 'BUY';
                        const flagColor = isBuy ? 'border-l-[#10b981]' : 'border-l-[#ef4444]';
                        const tagColor = isBuy ? 'text-[#10b981]' : 'text-[#ef4444]';

                        return (
                            <motion.div
                                key={sig.id || idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, width: 0 }}
                                className={`flex-shrink-0 w-64 h-full bg-[#060913] border border-[#1e293b] rounded flex flex-col justify-center px-4 border-l-2 ${flagColor}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-xs font-bold text-[#f8fafc] truncate font-sans">{sig.asset_symbol || 'Market Event'}</h3>
                                    <span className={`text-[8px] font-bold tracking-widest uppercase ${tagColor}`}>{sig.signal}</span>
                                </div>
                                <div className="text-[10px] text-[#64748b] font-sans truncate mb-2">
                                    {idx === 0 ? "Strait of Hormuz Naval A..." : "ECB Emergency Statement"}
                                </div>
                                <div className="flex justify-between items-center text-[9px] text-[#475569] font-mono tracking-widest uppercase">
                                    <span>08:45 PM</span>
                                    <span>System Sync</span>
                                    <span className={tagColor}>{isBuy ? "CRITICAL" : "CAUTION"}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

        </div>
    );
}
