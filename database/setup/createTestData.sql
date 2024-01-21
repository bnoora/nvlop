-- Create fake users
INSERT INTO users (username, email, password, avatar_url, bio, github_url, twitter_url, website_url)
VALUES
    ('johndoe', 'jd@gmail.com' , '123456', 'avatar_url', 'bio', 'github_url', 'twitter_url', 'website_url'),
    ('kanedoe', 'kd@gmail.com' , '123456', 'avatar_url', 'bio', 'github_url', 'twitter_url', 'website_url')
;

-- Create fake channels
INSERT INTO channels (channel_name, description)
VALUES
    ('general', 'General discussion'),
    ('random', 'Random discussion')
;

-- Create fake channel memberships
INSERT INTO channel_membership (user_id, channel_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2)
;

-- Create fake messages
INSERT INTO messages (user_id, channel_id, message)
VALUES
    (1, 1, 'Hello'),
    (1, 1, 'How are you?'),
    (2, 1, 'Fine, thanks'),
    (2, 1, 'And you?'),
    (1, 1, 'Fine, thanks'),
    (1, 1, 'And you?')
;

-- Create fake friends
INSERT INTO friends (user_id1, user_id2)
VALUES
    (1, 2),
    (2, 1)
;

-- create fake private_messages
INSERT INTO private_messages (user_id1, user_id2, message)
VALUES
    (1, 2, 'Hello'),
    (1, 2, 'How are you?'),
    (2, 1, 'Fine, thanks'),
    (2, 1, 'And you?'),
    (1, 2, 'Fine, thanks'),
    (1, 2, 'And you?')
;


