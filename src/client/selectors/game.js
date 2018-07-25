import { findIndex, propEq } from 'ramda';

export const getIsGameStarted = state => state.game.isGameStarted;

export const getDisplayModal = state => state.game.displayModal;

export const getMe = state => state.game.me;

export const getOwner = state => {
    const me = state.game.me;
    if(me !== undefined) {
        const users = state.game.users || {};
        const myUserId = findIndex(propEq('name', me))(users);
        return users[myUserId] ? users[myUserId].owner : false;
    }
    return false;
};

export const getRoomName = state => state.game.name;
