import {
    findIndex,
    propEq,
    remove,
    map,
    isNil,
    find,
    length
} from 'ramda';

export const getIsGameStarted = state => state.isGameStarted;

export const getDisplayModal = state => !isNil(state.modal) ? state.modal.display : false;

export const getModalMessage = state => !isNil(state.modal) ? state.modal.message : '';

export const getMe = state => state.me;

export const getEnemyName = state => {
    if(state.users) {
        const myUserIndex = findIndex(propEq('name', state.me))(state.users);
        const enemy = remove(myUserIndex, 1, state.users)[0];
        if(enemy) return enemy.name;
    };
    return undefined;
};

export const getOwner = state => {
    const me = state.me;
    if(me !== undefined) {
        const users = state.users || {};
        const myUserId = findIndex(propEq('name', me))(users);
        return users[myUserId] ? users[myUserId].owner : false;
    }
    return false;
};

export const getRoomName = state => state.roomName;

export const getMyBoard = state => {
    if(state.users) {
        const myUserIndex = findIndex(propEq('name', state.me))(state.users);
        return state.users[myUserIndex].board
    };
    return undefined;
};

export const getEnemyBoard = state => {
    if(state.users) {
        const myUserIndex = findIndex(propEq('name', state.me))(state.users);
        const enemy = remove(myUserIndex, 1, state.users)[0];
        if(enemy) return enemy.board;
    };
    return undefined;
};

export const getToasts = state => state.toasts;

export const getErrorMessage = state => state.errorMessage;

export const getUsers = state => state.users || [];

export const getUsersNames = state => {
    const { users } = state;
    if(isNil(users))
        return [];
    let usersNames = [];
    map(user => usersNames = [...usersNames, user.name], users);
    return usersNames;
};

export const getOwnerName = state => {
    const { users } = state;
    if(isNil(users))
        return undefined;
    let owner = undefined;
    map(user => user.owner ? owner = user.name : null, users);
    return owner;
};

export const getMyScore = state => {
    const me = getMe(state);
    const users = getUsers(state);
    
    if(isNil(me) || length(users) === 0)
        return 0;
    return find(propEq('name', me))(users).score
};

export const getNextPieces = state => {
    const me = getMe(state);
    const users = getUsers(state);
    
    if(isNil(me) || length(users) === 0)
        return [];
    return find(propEq('name', me))(users).pieces || [];
};

export const getGameDecount = state => state.gameDecount;