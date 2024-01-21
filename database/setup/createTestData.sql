-- Create fake users
INSERT INTO users (username, email, password, avatar_url, bio, github_url, 
            twitter_url, website_url, token, one_time_token)
VALUES
    ('johndoe', 'jd@gmail.com' , '123456', 'avatar_url', 'bio', 'github_url', 'twitter_url', 'website_url' , 'token', 'one_time_token'),
    ('kanedoe', 'kd@gmail.com' , '123456', 'avatar_url', 'bio', 'github_url', 'twitter_url', 'website_url', 'token', 'one_time_token'),
    ('danedoe', 'dd@gmail.com' , '123456', 'avatar_url', 'bio', 'github_url', 'twitter_url', 'website_url', 'token', 'one_time_token')
;

-- Create fake channels
INSERT INTO channels (owner_id, channel_name, description)
VALUES
    (1, 'general', 'General discussion'),
    (2, 'random', 'Random discussion')

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
INSERT INTO friends (user_id1, user_id2, status)
VALUES
    (1, 2, 'accepted'),
    (2, 1, 'accepted')
;

-- Create fake private channels
INSERT INTO private_channels (user_id1, user_id2, status)
VALUES
    (1, 2),
;

-- create fake private_messages
INSERT INTO private_messages (user_id, channel_id, message)
VALUES
    (1, 1, 'Hello'),
    (1, 1, 'How are you?'),
    (2, 1, 'Fine, thanks'),
    (2, 1, 'And you?'),
    (1, 1, 'Fine, thanks'),
    (1, 1, 'And you?')
;


