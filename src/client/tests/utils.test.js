import {
    getUser,
    getRoomName,
    getParsedGameUrl,
    getCellColor,
    getRandomNumber
} from '../utils';
import { CELLS_COLORS } from '../constants/colors';

describe('getUser: ', () => {
    test('should return the right user name', () => {
        const str = '#room1[lcharvol]';        
        const res = getUser(str);
        const expectedRes = 'lcharvol';

        expect(res).toBe(expectedRes);
    });
    test('should not find user name and return undefined', () => {
        const str = '#room1';        
        const res = getUser(str);
        const expectedRes = undefined;

        expect(res).toBe(expectedRes);
    });
    test('should not find user name and return undefined', () => {
        const str = '#room1[]';        
        const res = getUser(str);
        const expectedRes = undefined;

        expect(res).toBe(expectedRes);
    });
});

describe('getRoomName: ', () => {
    test('should return the right room name', () => {
        const str = '#room1[lcharvol]';        
        const res = getRoomName(str);
        const expectedRes = 'room1';

        expect(res).toBe(expectedRes);
    });
    test('should not find room name and return undefined', () => {
        const str = '';        
        const res = getRoomName(str);
        const expectedRes = undefined;

        expect(res).toBe(expectedRes);
    });
    test('should not find room name and return undefined', () => {
        const str = '#';        
        const res = getRoomName(str);
        const expectedRes = undefined;

        expect(res).toBe(expectedRes);
    });
});

describe('getParsedGameUrl: ', () => {
    test('should return the right parsed url', () => {
        const str = 'http://127.0.0.1:3004/#room1[lcharvol]';        
        const res = getParsedGameUrl(str);
        const expectedRes = {
            auth: "",
            hash: "#room1[lcharvol]",
            host: "127.0.0.1:3004",
            hostname: "127.0.0.1",
            href: "http://127.0.0.1:3004/#room1[lcharvol]",
            origin: "http://127.0.0.1:3004",
            password: "",
            pathname: "/",
            port: "3004",
            protocol: "http:",
            query: "",
            slashes: true,
            username: ""
        };

        expect(res).toEqual(expectedRes);
    });
});

describe('getCellColor: ', () => {
    test('should return a color of defined colors', () => {     
        const res = getCellColor();
        const possibleRes = CELLS_COLORS;

        expect(CELLS_COLORS).toContain(res);
    });
});

describe('getRandomNumber: ', () => {
    const min = 0;
    const max = 10;
    test('should return a number between 0 and 10', () => {     
        const res = getRandomNumber(min, max);
        const possibleRes = [0,1,2,3,4,5,6,7,8,9,10];

        expect(possibleRes).toContain(res);
    });
    test('should return a number between 0 and 10', () => {     
        const res = getRandomNumber(min, max);
        const possibleRes = [0,1,2,3,4,5,6,7,8,9,10];

        expect(possibleRes).toContain(res);
    });
    test('should return a number between 0 and 10', () => {     
        const res = getRandomNumber(min, max);
        const possibleRes = [0,1,2,3,4,5,6,7,8,9,10];

        expect(possibleRes).toContain(res);
    });
    test('should return a number between 0 and 10', () => {     
        const res = getRandomNumber(min, max);
        const possibleRes = [0,1,2,3,4,5,6,7,8,9,10];

        expect(possibleRes).toContain(res);
    });
});