'use client';

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import GlobeViz from '@/components/GlobeViz';
import NewsFeed from '@/components/NewsFeed';
import TradingSignals from '@/components/TradingSignals';
import MarketData from '@/components/MarketData';
import { Globe2 } from 'lucide-react';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('EARTH PULSE');

  useEffect(() => {
    // Initial Mock State 
    const mockEvents = [
      { id: '1', title: 'Critical Infrastructure Warning', source: 'IntelReport', severity: 0.95, impact_score: 0.85, timestamp: Date.now(), location: 'Iran', countryCode: 'IRN', signal: 'SELL' },
      { id: '2', title: 'Defense Procurement Peak', source: 'Reuters', severity: 0.9, impact_score: 0.8, timestamp: Date.now() - 3600000, location: 'Ukraine', countryCode: 'UKR', signal: 'BUY' },
      { id: '3', title: 'Energy Export Surge', source: 'Al Jazeera', severity: 0.85, impact_score: 0.75, timestamp: Date.now() - 7200000, location: 'United Arab Emirates', countryCode: 'ARE', signal: 'BUY' },
      { id: '4', title: 'Tech Export Restrictions', source: 'Bloomberg', severity: 0.7, impact_score: 0.9, timestamp: Date.now() - 10800000, location: 'Taiwan', countryCode: 'TWN', signal: 'SELL' },
      { id: '5', title: 'Agricultural Growth Forecast', source: 'AFP', severity: 0.3, impact_score: 0.4, timestamp: Date.now() - 14400000, location: 'Brazil', countryCode: 'BRA', signal: 'NEUTRAL' },
      { id: '6', title: 'Interest Rate Stability', source: 'Handelsblatt', severity: 0.2, impact_score: 0.3, timestamp: Date.now() - 25200000, location: 'Germany', countryCode: 'DEU', signal: 'NEUTRAL' },
      { id: '7', title: 'Naval Drill Alert', source: 'GlobalTimes', severity: 0.75, impact_score: 0.65, timestamp: Date.now() - 21600000, location: 'China', countryCode: 'CHN', signal: 'SELL' },
      { id: '8', title: 'Supply Chain Reshoring', source: 'WSJ', severity: 0.6, impact_score: 0.7, timestamp: Date.now() - 30000000, location: 'United States', countryCode: 'USA', signal: 'BUY' },
      { id: '9', title: 'Mining Sector Expansion', source: 'DailyIntel', severity: 0.4, impact_score: 0.5, timestamp: Date.now() - 40000000, location: 'Australia', countryCode: 'AUS', signal: 'BUY' },
      { id: '10', title: 'Election Volatility Warning', source: 'ParisPulse', severity: 0.5, impact_score: 0.4, timestamp: Date.now() - 50000000, location: 'France', countryCode: 'FRA', signal: 'SELL' },
      { id: '11', title: 'Strategic Infrastructure Expansion', source: 'AsiaInvest', severity: 0.8, impact_score: 0.9, timestamp: Date.now() - 60000000, location: 'India', countryCode: 'IND', signal: 'BUY' },
    ];
    setEvents(mockEvents);

    const mockSignals = [
      { id: '1', asset_symbol: 'XAU/USD', signal: 'BUY', confidence_score: 0.92 },
      { id: '2', asset_symbol: 'SPX', signal: 'SELL', confidence_score: 0.88 },
    ];
    setSignals(mockSignals);

    const socket = io(SOCKET_URL);

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('new_intelligence', (data: any) => {
      setEvents((prev) => [data.event, ...prev].slice(0, 50));
      if (data.signal) {
        setSignals((prev) => [data.signal, ...prev].slice(0, 20));
      }
    });

    return () => { socket.disconnect(); };
  }, []);

  return (
    <div className="w-screen h-screen bg-[#060913] text-[#c9d1d9] overflow-hidden font-sans relative">

      {/* Absolute Background Layer: 3D GeoJSON Globe */}
      <div className="absolute inset-0 z-0 bg-black">
        <GlobeViz activeEvents={events} />
      </div>

      {/* Foreground UI Layer Container (Pointer Events None to let Globe drag work beneath UI) */}
      <div className="absolute inset-0 z-10 p-4 md:p-6 pointer-events-none flex flex-col justify-between overflow-hidden">

        {/* Top Header Row */}
        <div className="flex justify-between items-start w-full shrink-0">
          {/* Top Left Identity */}
          <div className="flex items-center space-x-4 pointer-events-auto bg-[#0a1120]/80 backdrop-blur-md px-4 py-2 rounded-md border border-[#1e293b] shadow-lg">
            <Globe2 className="w-5 h-5 text-[#3b82f6] shadow-[0_0_10px_#3b82f6]" />
            <h1 className="text-sm font-bold tracking-[0.2em] text-[#e2e8f0] uppercase">
              Aether <span className="font-light text-[#94a3b8]">Terminal</span>
            </h1>
          </div>

          {/* Top Middle Tabs (Reference Image Match) */}
          <div className="hidden md:flex items-center space-x-2 pointer-events-auto bg-[#060913]/90 backdrop-blur-md p-1 rounded-md border border-[#1e293b] shadow-xl">
            <button
              onClick={() => setActiveTab('EARTH PULSE')}
              className={`px-4 py-1.5 text-[10px] font-bold rounded uppercase tracking-widest transition ${activeTab === 'EARTH PULSE' ? 'text-[#f8fafc] bg-[#1e293b] shadow-sm border border-[#334155]/50' : 'text-[#64748b] hover:text-[#e2e8f0]'}`}>Earth Pulse</button>
            <button
              onClick={() => setActiveTab('GEO MAP')}
              className={`px-4 py-1.5 text-[10px] font-bold rounded uppercase tracking-widest transition ${activeTab === 'GEO MAP' ? 'text-[#f8fafc] bg-[#1e293b] shadow-sm border border-[#334155]/50' : 'text-[#64748b] hover:text-[#e2e8f0]'}`}>Geo Map</button>
            <button
              onClick={() => setActiveTab('SIGNALS')}
              className={`px-4 py-1.5 text-[10px] font-bold rounded uppercase tracking-widest transition ${activeTab === 'SIGNALS' ? 'text-[#f8fafc] bg-[#1e293b] shadow-sm border border-[#334155]/50' : 'text-[#64748b] hover:text-[#e2e8f0]'}`}>Signals</button>
          </div>

          {/* Top Right Status */}
          <div className="flex items-center space-x-3 text-[10px] font-mono pointer-events-auto bg-[#0a1120]/80 backdrop-blur-md px-4 py-2 rounded-md border border-[#1e293b]">
            <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`}></span>
            <span className="tracking-widest text-[#94a3b8] uppercase">{connected ? 'Sat-Link Active' : 'Disconnected'}</span>
          </div>
        </div>

        {/* Middle Row (Spacer left + Floating Panels Right) */}
        {activeTab === 'EARTH PULSE' ? (
          <div className="flex-1 flex justify-end items-start my-4 min-h-0">
            <div className="w-80 h-full pointer-events-auto flex flex-col space-y-4">

              {/* Market Overlay */}
              <div className="flex-1 min-h-0 flex flex-col bg-[#0a1120]/85 backdrop-blur-xl border border-[#1e293b] rounded-lg shadow-2xl overflow-hidden shadow-black/50">
                <MarketData signals={signals} />
              </div>

              {/* Intel Overlay (takes remaining height) */}
              <div className="flex-1 min-h-0 bg-[#0a1120]/85 backdrop-blur-xl border border-[#1e293b] rounded-lg shadow-2xl overflow-hidden shadow-black/50 flex flex-col">
                <NewsFeed events={events} />
              </div>

            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-0"></div>
        )}

        {/* Bottom Row (Floating Signal Strip) */}
        {(activeTab === 'EARTH PULSE' || activeTab === 'SIGNALS') && (
          <div className="w-full h-24 sm:h-28 pointer-events-auto flex justify-center items-end shrink-0">
            <div className="w-full max-w-6xl h-full bg-[#0a1120]/85 backdrop-blur-xl border border-[#1e293b] rounded-lg shadow-2xl overflow-hidden shadow-black/50">
              <TradingSignals signals={signals} />
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
