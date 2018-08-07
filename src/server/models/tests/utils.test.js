import {
    getRandomNumber
} from '../utils';

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