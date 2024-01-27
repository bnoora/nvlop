import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../context/UserContext";

// Components
import FriendList from "./FriendList";
import PrivateMessageComponent from "./PrivateMessageComponent";
import FriendRequests from "./FriendRequests";

export default function FriendComponent({onToggleForm}) {
    const { friends } = useContext(UserContext);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [showFriendRequests, setShowFriendRequests] = useState(false);
    const [showPrivateMessages, setShowPrivateMessages] = useState(true);
    const onToggleForm = onToggleForm

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
        setShowFriendRequests(false);
        setShowPrivateMessages(true);
    };

    const handleToggleFriendRequests = () => {
        setShowPrivateMessages(!showPrivateMessages);
        setShowFriendRequests(!showFriendRequests);
    };

    useEffect(() => {
        setSelectedFriend(friends[0]);
    }, [friends]);

    return (
        <div>
            <FriendList friends={friends} onFriendClick={handleFriendClick} 
                        onFriendRequestsClick={handleToggleFriendRequests}
                        onToggleForm={onToggleForm}/>    
            {showPrivateMessages && <PrivateMessageComponent friend={selectedFriend} />}
            {showFriendRequests && <FriendRequests />}
        </div>
    );


}