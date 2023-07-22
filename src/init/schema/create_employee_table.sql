CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    role_id INT NOT NULL,
    username VARCHAR,
    password VARCHAR,
    token VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP 
);
