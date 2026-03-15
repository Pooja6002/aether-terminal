CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news_articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    source VARCHAR(255) NOT NULL,
    url TEXT UNIQUE NOT NULL,
    content TEXT,
    published_at TIMESTAMP,
    credibility_score FLOAT DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE processed_events (
    id SERIAL PRIMARY KEY,
    article_id INT REFERENCES news_articles(id) ON DELETE CASCADE,
    event_type VARCHAR(100),
    severity FLOAT,
    sentiment_score FLOAT,
    location VARCHAR(255),
    extracted_entities JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE asset_impacts (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES processed_events(id) ON DELETE CASCADE,
    asset_symbol VARCHAR(50) NOT NULL,
    asset_type VARCHAR(50),
    impact_score FLOAT,
    predicted_volatility FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trading_signals (
    id SERIAL PRIMARY KEY,
    asset_symbol VARCHAR(50) NOT NULL,
    signal VARCHAR(10) CHECK (signal IN ('BUY', 'SELL', 'HOLD')),
    confidence_score FLOAT,
    reasoning TEXT,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
