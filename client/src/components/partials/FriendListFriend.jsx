export default function FriendListFriend(props) {
    const { friend, onFriendClick } = props;

    return (
        <div>
            <img src={friend.avatar_url} alt="Pic" />
            <button onClick={() => onFriendClick(friend)}>{friend.username}</button>
        </div>
    );
}