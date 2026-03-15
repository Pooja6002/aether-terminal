'use client';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobeViz({ activeEvents }: { activeEvents: any[] }) {
    const globeRef = useRef<any>();
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [countries, setCountries] = useState<any>({ features: [] });

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };
        window.addEventListener('resize', handleResize);
        setTimeout(handleResize, 50);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch GeoJSON map data
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(setCountries);
    }, []);

    useEffect(() => {
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.3;
            globeRef.current.controls().enableZoom = true;

            // Listen for interact to pause rotation
            globeRef.current.controls().addEventListener('start', () => {
                globeRef.current.controls().autoRotate = false;
            });

            const scene = globeRef.current.scene();
            if (scene) {
                // Flat lighting setup for solid colors
                const ambientLight = scene.children.find((obj: any) => obj.type === 'AmbientLight');
                if (ambientLight) ambientLight.intensity = 1.0;

                const directionalLight = scene.children.find((obj: any) => obj.type === 'DirectionalLight');
                if (directionalLight) {
                    directionalLight.intensity = 0.5;
                }
            }
        }
    }, [globeRef.current]);

    // Map polygon colors based on active events mapping to countries
    const getPolygonColor = (feature: any) => {
        const countryName = feature.properties.ADMIN;

        // Check if any active event maps to this country (mock matching)
        // In a real app we'd map via ISO A3 code. For the mockup we randomly match or use dummy string includes.
        const mappedEvent = activeEvents.find(ev => ev.location === countryName || ['United States', 'China', 'Switzerland'].includes(countryName));

        if (mappedEvent) {
            // Using the reference colors: Red=Severe, Yellow=Mod, LightBlue=Low
            if (mappedEvent.severity > 0.7) return '#ef4444'; // Red
            if (mappedEvent.severity > 0.4) return '#f59e0b'; // Yellow
            return '#3b82f6'; // Light Blue highlight
        }

        // Base Green color from reference image for untouched countries
        return '#105a40';
    };

    const getPolygonAltitude = (feature: any) => {
        // Slightly elevate highlighted countries
        const countryName = feature.properties.ADMIN;
        const mappedEvent = activeEvents.find(ev => ev.location === countryName || ['United States', 'China', 'Switzerland'].includes(countryName));
        return mappedEvent ? 0.04 : 0.01;
    };

    const handlePolygonClick = (polygon: any) => {
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = false;

            // Find if this polygon has an event
            const countryName = polygon.properties.ADMIN;
            const mappedEvent = activeEvents.find(ev => ev.location === countryName || ['United States', 'China', 'Switzerland'].includes(countryName));

            if (mappedEvent) {
                setSelectedEvent({ ...mappedEvent, location: countryName });
            } else {
                setSelectedEvent(null);
            }
        }
    };

    return (
        <div ref={containerRef} className="w-full h-full relative cursor-move bg-[#060913] star-bg">
            <Globe
                ref={globeRef}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="#060913"
                showAtmosphere={true}
                atmosphereColor="#3b82f6"
                atmosphereAltitude={0.15}

                // GeoJSON Polygons Setup
                polygonsData={countries.features}
                polygonAltitude={getPolygonAltitude}
                polygonCapColor={getPolygonColor}
                polygonSideColor={() => 'rgba(0, 0, 0, 0.4)'}
                polygonStrokeColor={() => '#111827'}
                onPolygonClick={handlePolygonClick}

                // Remove textures to use raw geometry base
                globeImageUrl={null}
                bumpImageUrl={null}
                showGraticules={true}
            />

            {/* Selected Event Overlay inside the 3D Container context */}
            {selectedEvent && (
                <div className="absolute top-[20%] left-10 bg-[#0a1120]/90 backdrop-blur-xl border border-[#1e293b] p-4 rounded-lg shadow-2xl max-w-sm pointer-events-auto z-50">
                    <div className="flex justify-between items-start mb-3 border-b border-[#1e293b] pb-2">
                        <h3 className="font-bold text-xs tracking-wider text-[#e2e8f0] uppercase">{selectedEvent.location || 'Global Entity'} PULSE</h3>
                        <button onClick={() => setSelectedEvent(null)} className="text-[#94a3b8] hover:text-white px-2 text-lg">&times;</button>
                    </div>
                    <div className="space-y-2 text-xs text-[#cbd5e1] font-sans">
                        <p className="text-sm font-semibold text-white mb-2 leading-relaxed">{selectedEvent.title}</p>
                        <div className="flex justify-between border-t border-[#1e293b] pt-2 mt-2">
                            <span className="text-[#64748b] tracking-wider text-[10px] uppercase">Severity</span>
                            <span className={`font-mono font-bold ${selectedEvent.severity > 0.7 ? 'text-red-500' : 'text-yellow-500'}`}>
                                {(selectedEvent.severity * 10).toFixed(1)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#64748b] tracking-wider text-[10px] uppercase">Est. Impact</span>
                            <span className="font-mono text-blue-400">{(selectedEvent.impact_score * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
