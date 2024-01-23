-- Create fake users
INSERT INTO users (username, email, password, avatar_url, bio, github_url, 
            twitter_url, website_url)
VALUES
    ('johndoe', 'jd@gmail.com' , '123456', 'avatar_url', 'bio', 'github_url', 'twitter_url', 'website_url'),
    ('kanedoe', 'kd@gmail.com' , '123456', 'avatar_url', 'bio', 'github_url', 'twitter_url', 'website_url'),
    ('danedoe', 'dd@gmail.com' , '123456', 'avatar_url', 'bio', 'github_url', 'twitter_url', 'website_url')
;

-- Create fake servers
INSERT INTO servers (owner_id, server_name, description)
VALUES
    (1, 'server1', 'server1 description'),
    (2, 'server2', 'server2 description'),
    (2, 'server3', 'server3 description') 
;

INSERT INTO server_invites (server_id)
VALUES
    (1),
    (2),
    (3)
;

-- Create fake channels
INSERT INTO channels (channel_name, description ,server_id)
VALUES
    ('channel1', 'channel1 description', 1),
    ('channel2', 'channel2 description', 1),
    ('channel3', 'channel3 description', 2),
    ('channel4', 'channel4 description', 2),
    ('channel5', 'channel5 description', 3),
    ('channel6', 'channel6 description', 3)
;

-- Create fake channel memberships
INSERT INTO server_membership (user_id, server_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 2),
    (2, 3),
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
    (1, 2)
;

INSERT INTO friend_requests (user_id1, user_id2)
VALUES
    (1, 3)
;

-- Create fake private channels
INSERT INTO private_channels (user_id1, user_id2)
VALUES
    (1, 2)
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


