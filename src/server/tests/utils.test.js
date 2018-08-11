import { getPointByline } from '../utils';

describe('Utils', () => {
    describe('getPointByline', () => {
        it('Should return 50', () => {
            const nbLines = 1;
            const res = getPointByline(nbLines);

            expect(res).toBe(50);
        });
        it('Should return 150', () => {
            const nbLines = 2;
            const res = getPointByline(nbLines);

            expect(res).toBe(150);
        });
        it('Should return 350', () => {
            const nbLines = 3;
            const res = getPointByline(nbLines);

            expect(res).toBe(350);
        });
        it('Should return 1000', () => {
            const nbLines = 4;
            const res = getPointByline(nbLines);

            expect(res).toBe(1000);
        });
        it('Should return 1000', () => {
            const nbLines = 7;
            const res = getPointByline(nbLines);

            expect(res).toBe(1000);
        });
    });
});