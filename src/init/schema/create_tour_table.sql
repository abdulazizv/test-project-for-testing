CREATE TABLE IF NOT EXISTS tour (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    description VARCHAR,
    images VARCHAR,
    address VARCHAR,
    price INT,
    day VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP 
);
