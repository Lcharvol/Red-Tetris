import { findIndex, propEq, remove } from 'ramda';

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

export const getModalMessage = state => state.game.modalMessage;

export const getMyBoard = state => {
    if(state.game.users) {
        const myUserIndex = findIndex(propEq('name', state.game.me))(state.game.users);
        return state.game.users[myUserIndex].board
    };
    return undefined;
};

export const getEnemyBoard = state => {
    if(state.game.users) {
        const myUserIndex = findIndex(propEq('name', state.game.me))(state.game.users);
        const enemy = remove(myUserIndex, 1, state.game.users)[0];
        if(enemy) return enemy.board;
    };
    return undefined;
};

export const getUsers = state => state.game.users;

export const getDisplayToast = state => state.game.displayToast;

export const getToastMessage = state => state.game.toastMessage;