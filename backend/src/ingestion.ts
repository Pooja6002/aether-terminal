import { Pool } from 'pg';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const pool = new Pool({
    user: process.env.POSTGRES_USER || 'admin',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'geopolitical_intelligence',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
});

const MOCK_NEWS_SOURCES = [
    "Global Financial Network",
    "Geopolitics Weekly",
    "Energy Markets Review",
    "Tech Policy Daily"
];

const MOCK_HEADLINES = [
    "New sanctions proposed on major oil exporters",
    "Tech companies face new semiconductor regulations",
    "Renewable energy subsidies cause market rally",
    "Central bank announces unexpected interest rate hike",
    "Tensions rise in disputed maritime regions",
    "Breakthrough in AI regulations sparks global debate"
];

// Helper to wait
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function ingestMockNews() {
    console.log("Starting mock news ingestion worker...");

    while (true) {
        try {
            const title = MOCK_HEADLINES[Math.floor(Math.random() * MOCK_HEADLINES.length)];
            const source = MOCK_NEWS_SOURCES[Math.floor(Math.random() * MOCK_NEWS_SOURCES.length)];
            const url = `https://mocknews.com/article/${Date.now()}`;
            const content = `${title}. This is a simulated article describing the events in detail. Experts suggest profound market impacts.`;
            const credibility_score = (Math.random() * (1.0 - 0.5) + 0.5).toFixed(2); // Score between 0.5 and 1.0

            const articleId = Math.floor(Math.random() * 100000);
            console.log(`Ingested article ID ${articleId}: ${title}`);

            // Now, simulate sending this to the ML service for NLP
            await processArticle(articleId, title, content);

            // Wait 10-30 seconds before next article
            const nextWait = Math.floor(Math.random() * 20000) + 10000;
            await sleep(nextWait);
        } catch (error) {
            console.error("Error in ingestion worker:", error);
            await sleep(5000);
        }
    }
}

async function processArticle(articleId: number, title: string, content: string) {
    try {
        // Call Python ML Service (assuming it runs on port 8000 in docker)
        const mlHost = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';

        // We mock the DB transaction for ML results
        // Wait for the python service simulation using static responses.
        const sentimentRes = await axios.post(`${mlHost}/analyze/sentiment`, { text: title });
        const sentimentScore = sentimentRes.data.sentiment_score;

        const entityRes = await axios.post(`${mlHost}/analyze/entities`, { text: title });
        const entities = entityRes.data.entities;

        const eventSeverity = Math.random(); // 0 to 1

        const eventId = Math.floor(Math.random() * 100000);
        console.log(`Processed event ID ${eventId} for article ${articleId}`);

        // Call ML Predict Impact
        const impactRes = await axios.post(`${mlHost}/predict/impact`, null, {
            params: {
                event_severity: eventSeverity,
                sentiment_intensity: sentimentScore,
                market_sensitivity: 0.8 // static mock
            }
        });

        const { impact_score, predicted_volatility, signal, confidence } = impactRes.data;

        // Generate an asset impact for a random entity
        const assetSymbol = entities.length > 0 ? entities[0].toUpperCase() : "GLOBAL-IDX";

        console.log(`Generated signal ${signal} for ${assetSymbol}`);

        // Emit via HTTP to main backend for WebSocket broadcast
        const backendHost = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        await axios.post(`${backendHost}/internal/emit`, {
            event: {
                id: eventId,
                title,
                source: "AI OS",
                severity: eventSeverity,
                impact_score,
                timestamp: Date.now()
            },
            signal: {
                id: eventId,
                asset_symbol: assetSymbol,
                signal,
                confidence_score: confidence
            }
        });
        console.log(`Broadcasted event ${eventId} to WebSocket server.`);

    } catch (error: any) {
        console.error(`Error processing article ${articleId}:`, error.message);
    }
}

// Start worker
ingestMockNews();
