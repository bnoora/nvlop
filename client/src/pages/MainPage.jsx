import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// Components
import ServerBar from "../components/ServerBar";
import FriendComponent from "../components/FriendComponent";
import ServerComponent from "../components/ServerComponent";



export default function MainPage() {
    const { user } = useContext(AuthContext);
    const { servers, friends } = useContext(UserContext);
    const navigate = useNavigate();

    // STATES 
    const [showFriendComponent, setShowFriendComponent] = useState(true);
    const [showServerComponent, setShowServerComponent] = useState(false);
    const [showAddServerForm, setShowAddServerForm] = useState(false);
    const [showAddFriendForm, setShowAddFriendForm] = useState(false);
    const [showAddChannelForm, setShowAddChannelForm] = useState(false);


    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }
    , [user, navigate]);


    // HANDLERS FOR VIEWS
    const handleToggleFriendComponent = () => {
        setShowServerComponent(false);
        setShowFriendComponent(true);
    };

    const handleToggleServerComponent = () => {
        setShowFriendComponent(false);
        setShowServerComponent(true);
    };

    return (
        <div>
            <ServerBar onServerClick={handleToggleServerComponent} onFriendClick={handleToggleFriendComponent}/>
            {showServerComponent && <ServerComponent servers={servers}/>}
            {showFriendComponent && <FriendComponent friends={friends}/>}
        </div>
    );
}