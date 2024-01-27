export default function ChannelRows(props) {
    const { channel, onChannelClick } = props;

    return (
        <div>
            <button onClick={() => onChannelClick(channel)}>
                {channel.name}
            </button>
        </div>
    );
}