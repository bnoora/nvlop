const {getChannelById } = require('../api/channelModel');
const {getPrivateChannelById} = require('../api/privateChatModel');

async function checkAuth(token) {
    const validity = await checkTokenValid(token);
    if (validity === true) {
        const user = await getUserByToken(token);
        return user || false;
    } else {
        return false;
    }
}

function roomFinder(roomId, roomType) {
    let room = null;
    if (roomType === 'private') {
        room = getPrivateChannelById(roomId);
    } else {
        room = getChannelById(roomId);
    }
    return room || false;
}

module.exports = {checkAuth, roomFinder};