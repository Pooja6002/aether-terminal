'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsFeed({ events }: { events: any[] }) {
    // Matched to the reference image right-side textual logs layout
    return (
        <div className="w-full h-full flex flex-col overflow-hidden bg-transparent font-sans pt-4 border-t border-[#1e293b]">
            <div className="px-4 pb-2 mb-2 flex items-center justify-between">
                <h2 className="text-[10px] font-bold text-[#64748b] tracking-widest uppercase">Live Activity Logs</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 custom-scrollbar">
                <AnimatePresence>
                    {events.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#64748b] text-[10px] font-mono mt-2">
                            WAITING FOR INTEL SYNC...
                        </motion.div>
                    )}

                    {events.map((ev, idx) => {
                        const isHighSeverity = ev.severity > 0.7;
                        const markerColor = isHighSeverity ? 'bg-[#ef4444]' : 'bg-[#3b82f6]';

                        return (
                            <motion.div
                                key={ev.id || idx}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-start relative pl-4"
                            >
                                {/* Visual Connector Dot */}
                                <div className={`absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full ${markerColor}`}></div>
                                <div className="absolute left-[3px] top-4 bottom-[-16px] w-[1px] bg-[#1e293b]"></div>

                                <div className="flex w-full justify-between items-center mb-1">
                                    <span className="text-[11px] font-semibold text-[#e2e8f0] leading-snug truncate pr-2">
                                        {ev.title || ev.message}
                                    </span>
                                    <span className="text-[9px] text-[#64748b] font-mono tracking-widest shrink-0">
                                        {new Date(ev.timestamp || Date.now()).toLocaleTimeString()}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-3 text-[9px] font-mono uppercase tracking-widest mt-1">
                                    <span className="text-[#f59e0b] px-1 py-0.5 bg-[#f59e0b]/10 rounded border border-[#f59e0b]/20">
                                        EVENT: {ev.severity > 0.7 ? 'SEVERE' : 'MONITOR'}
                                    </span>
                                    <span className="text-[#64748b]">LOC: {ev.location || 'GLOBAL'}</span>
                                    <span className="text-[#64748b]">IMP: {(ev.impact_score * 100).toFixed(0)}</span>
                                    <span className="text-[#64748b]">SRC: {ev.source || 'Intel'}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
