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
    const [server, setServer] = useState(null);


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
        if (serverlist.length === 0) {
            return;
        }
        setServer(serverlist[0]);
    }, [serverlist]); 

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
    };

    // HANDLERS FOR FORMS
    const handleToggleAddServerForm = () => {
        setShowAddServerForm(!showAddServerForm);
    };

    const handleAddServer = (newServer) => {
        setServerList([...serverlist, newServer]);
        handleToggleAddServerForm();
    };

    const handleToggleAddFriendForm = () => {
        setShowAddFriendForm(!showAddFriendForm);
    };

    if (!user || !serverlist) {
        return (
            <div>
                1. Loading...
            </div>
        )
    }

    return (
        <div>
            <ServerBar onServerClick={handleToggleServerComponent} 
                        onFriendClick={handleToggleFriendComponent} servers={serverlist} 
                        onAddServer={handleAddServer} formToggle={handleToggleAddServerForm}/>
            {showServerComponent && <ServerComponent server={server}/>}
            {showFriendComponent && <FriendComponent onToggleForm={handleToggleAddFriendForm}/>}
            {showAddServerForm && <AddServerForm user={user} onToggleForm={handleToggleAddServerForm} 
                                    handleAddServer={handleAddServer}/>}
            {showAddFriendForm && <AddFriendForm user={user} onToggleForm={handleToggleAddFriendForm}/>}
        </div>
    );
}