CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL, -- hashed password
    avatar_url VARCHAR(100),
    bio VARCHAR(100),
    github_url VARCHAR(100),
    twitter_url VARCHAR(100),
    website_url VARCHAR(100)
);

CREATE TABLE user_token (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    token VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 month' NOT NULL
);

CREATE TABLE user_settings (
    user_id INT REFERENCES users(user_id),
    theme VARCHAR(10) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE servers (
    server_id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(user_id),
    server_name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE server_invites (
    invite_id SERIAL PRIMARY KEY,
    server_id INT REFERENCES servers(server_id) ON DELETE CASCADE,
    invite_code SERIAL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 month'
);

CREATE TABLE channels (
    channel_id SERIAL PRIMARY KEY,
    channel_name VARCHAR(100) NOT NULL,
    description TEXT,
    server_id INT REFERENCES servers(server_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE server_membership (
    user_id INT REFERENCES users(user_id),
    server_id INT REFERENCES servers(server_id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_mod BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, server_id)
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    channel_id INT REFERENCES channels(channel_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friends (
    user_id1 INT REFERENCES users(user_id),
    user_id2 INT REFERENCES users(user_id),
    PRIMARY KEY (user_id1, user_id2)
);

CREATE TABLE friend_requests (
    user_id1 INT REFERENCES users(user_id),
    user_id2 INT REFERENCES users(user_id),
    PRIMARY KEY (user_id1, user_id2)
);

CREATE TABLE private_channels (
    channel_id SERIAL PRIMARY KEY,
    user_id1 INT REFERENCES users(user_id),
    user_id2 INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE private_messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    channel_id INT REFERENCES private_channels(channel_id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE session (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    sessiontoken VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 month' NOT NULL
);
