import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// Components
import ServerBar from "../components/ServerBar";
import FriendComponent from "../components/FriendComponent";
import ServerComponent from "../components/ServerComponent";
import SpinningLoading from "../components/SpinningLoading";

// Forms 
import AddServerForm from "../components/partials/AddServerForm";
import AddFriendForm from "../components/partials/AddFriendForm";
import AddChannelForm from "../components/partials/AddChannelForm";

export default function MainPage() {
    const { user } = useContext(AuthContext);
    const { servers, friends } = useContext(UserContext);
    const navigate = useNavigate();
    const [serverlist , setServerList] = useState([]);
    const [friendList, setFriendList] = useState([]);

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

    useEffect(() => {
        if (!servers) {
            return;
        }

        setServerList(servers);
    }, [servers]);

    useEffect(() => {
        if (!friends) {
            return;
        }

        setFriendList(friends);
    }, [friends]);


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

    // useEffect(() => {
    //     console.log(servers);
    // }, []);

    if (!user || !serverlist) {
        return (
            <div>
                1. Loading...
            </div>
        )
    }

    return (
        <div>
            <ServerBar onServerClick={handleToggleServerComponent} onFriendClick={handleToggleFriendComponent}
            servers={serverlist} onAddServer={handleToggleAddServerForm}/>
            {showServerComponent && <ServerComponent server={server} onToggleForm={handleToggleAddServerForm}/>}
            {showFriendComponent && <FriendComponent onToggleForm={handleToggleAddFriendForm}/>}
            {showAddServerForm && <AddServerForm user={user} onToggleForm={handleToggleAddServerForm}/>}
            {showAddFriendForm && <AddFriendForm user={user} onToggleForm={handleToggleAddFriendForm}/>}
            {showAddChannelForm && <AddChannelForm server={server} onToggleForm={handleToggleAddChannelForm} />}
        </div>
    );
}