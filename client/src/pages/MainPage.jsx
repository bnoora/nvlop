import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// Components
import ServerBar from "../components/ServerBar";
import FriendComponent from "../components/FriendComponent";
import ServerComponent from "../components/ServerComponent";

// Forms 
import AddServerForm from "../components/partials/AddServerForm";
import AddFriendForm from "../components/partials/AddFriendForm";
import AddChannelForm from "../components/partials/AddChannelForm";

export default function MainPage() {
    const { user } = useContext(AuthContext);
    const { servers } = useContext(UserContext);
    const navigate = useNavigate();

    // STATES 
    const [showFriendComponent, setShowFriendComponent] = useState(true);
    const [showServerComponent, setShowServerComponent] = useState(false);
    const [showAddServerForm, setShowAddServerForm] = useState(false);
    const [showAddFriendForm, setShowAddFriendForm] = useState(false);
    const [showAddChannelForm, setShowAddChannelForm] = useState(false);
    const [server, setServer] = useState();


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

    const handleToggleServerComponent = (selectedServer) => {
        setShowFriendComponent(false);
        setShowServerComponent(true);
        setServer(selectedServer);
    };

    // HANDLERS FOR FORMS
    const handleToggleAddServerForm = () => {
        setShowAddServerForm(!showAddServerForm);
    };

    const handleToggleAddChannelForm = () => {
        setShowAddChannelForm(!showAddChannelForm);
    };

    const handleToggleAddFriendForm = () => {
        setShowAddFriendForm(!showAddFriendForm);
    };

    return (
        <div>
            <ServerBar onServerClick={handleToggleServerComponent} onFriendClick={handleToggleFriendComponent}
            servers={servers} onAddServer={handleToggleAddServerForm}/>
            {showServerComponent && <ServerComponent server={server} onToggleForm={handleToggleAddServerForm}/>}
            {showFriendComponent && <FriendComponent onToggleForm={handleToggleAddFriendForm}/>}
            {showAddServerForm && <AddServerForm user={user} onToggleForm={handleToggleAddServerForm}/>}
            {showAddFriendForm && <AddFriendForm user={user} onToggleForm={handleToggleAddFriendForm}/>}
            {showAddChannelForm && <AddChannelForm server={server} onToggleForm={handleToggleAddChannelForm} />}
        </div>
    );
}