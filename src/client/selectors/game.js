import {
    findIndex,
    propEq,
    remove,
    map,
    isNil,
} from 'ramda';

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

export const getToasts = state => state.game.toasts;

export const getErrorMessage = state => state.game.errorMessage;

export const getUsers = state => state.game.users || [];

export const getUsersNames = state => {
    const { game: { users } } = state;
    if(isNil(users))
        return [];
    let usersNames = [];
    map(user => usersNames = [...usersNames, user.name],users);
    return usersNames;
};

export const getOwnerName = state => {
    const { game: { users } } = state;
    if(isNil(users))
        return undefined;
    let owner = undefined;
    map(user => user.owner ? owner = user.name : null,users);
    return owner;
};