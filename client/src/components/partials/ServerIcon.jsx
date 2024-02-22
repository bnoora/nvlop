export default function ServerIcon({ server, onClick }) {
    function firstLetter(str) {
        return str.charAt(0);
    }
    
    if (!server) {
        return null;
    }
    
    return (
        <div onClick={onClick}>
            {server.icon_url ? (
                <img src={server.icon_url} alt={server.server_name} />
            ) : (
                <div>{firstLetter(server.server_name)}</div>
            )} 
        </div>
    );
}
