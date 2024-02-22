export default function MessageRow(props) {
    const { message } = props;
    return (
        <div>
            <div>userid: {message.user_id}</div>
            <div>{message.message}</div>
        </div>
    );
}