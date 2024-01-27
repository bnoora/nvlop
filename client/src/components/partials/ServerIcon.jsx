export default function ServerIcon({ server }) {
    return (
        <div>
            <img src={server.iconurl} alt={server.name} />
        </div>
    );
}