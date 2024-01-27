import { useEffect } from "react";
import FriendListFriend from "./partials/FriendListFriend";

export default function FriendList(props) {
    const { friends, onFriendClick, onFriendRequestsClick, onToggleForm } = props;

    useEffect(() => {
    }, [friends]);

    return (
        <div>
            <h1>Friends</h1>
            <button onClick={onFriendRequestsClick}>Friend Requests</button>
            <button onClick={onToggleForm}>Add Friend</button>
            {friends.map((friend) => {
                return <FriendListFriend key={friend.id} friend={friend} onFriendClick={onFriendClick} />
            })}
        </div>
    )
}