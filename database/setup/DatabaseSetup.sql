CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL, -- hashed password
    avatar_url VARCHAR(100),
    bio VARCHAR(100),
    github_url VARCHAR(100),
    twitter_url VARCHAR(100),
    website_url VARCHAR(100),
    token VARCHAR(100) NOT NULL,
    one_time_token VARCHAR(100),
    token_created_at TIMESTAMP,
    one_time_token_created_at TIMESTAMP, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE channels (
    channel_id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(user_id),
    channel_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE channel_membership (
    user_id INT REFERENCES users(user_id),
    channel_id INT REFERENCES channels(channel_id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_mod BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, channel_id)
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    channel_id INT REFERENCES channels(channel_id),
    user_id INT REFERENCES users(user_id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friends (
    user_id1 INT REFERENCES users(user_id),
    user_id2 INT REFERENCES users(user_id),
    status VARCHAR(10) NOT NULL,
    PRIMARY KEY (user_id1, user_id2)
);

CREATE TABLE private_channels (
    channel_id SERIAL PRIMARY KEY,
    user_id1 INT REFERENCES users(user_id),
    user_id2 INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE private_messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    channel_id INT REFERENCES private_channels(channel_id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

