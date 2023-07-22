CREATE TABLE IF NOT EXISTS hotel (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    image VARCHAR,
    description TEXT,
    address VARCHAR,
    stars INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP 
);