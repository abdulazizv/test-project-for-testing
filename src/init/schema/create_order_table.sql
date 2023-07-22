CREATE TABLE IF NOT EXISTS orderr(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR,
    tour_type VARCHAR,
    phone_number VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  
);
