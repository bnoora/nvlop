const {getUserByToken, checkTokenValid} = require('../database/userTokenModel');
const {getChannelById } = require('../database/channelModel');
const {getPrivateChannelById} = require('../database/privateChatModel');

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