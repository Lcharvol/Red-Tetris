import { getUser } from '../utils';

describe('getUser: ', () => {
    const str = 'http://127.0.0.1:3004/#room1[lcharvol]';

    test('should return the right user name', () => {
        const res = getUser(str);
        const expectedRes = 'lcharvol';

        expect(res).toBe(expectedRes);
    });
  });