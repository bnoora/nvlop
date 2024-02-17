const {getChannelById } = require('../api/channelModel');
const {getPrivateChannelById} = require('../api/privateChatModel');
const {getUserSessionById} = require('../api/sessionModel');

async function checkAuth(token) {
    const res = await getUserSessionById();
    if (res.sessionToken === token) {
        return true;
    }
    return false;
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

function checkAllowedToDelete(msgId, roomId, userID) {
    // TODO: Implement this function
    return true;
}

function checkAllowedToJoinRoom(roomId, roomType, userId) {
    // TODO: Implement this function
    return true;
}

module.exports = {checkAuth, roomFinder, checkAllowedToDelete, checkAllowedToJoinRoom};