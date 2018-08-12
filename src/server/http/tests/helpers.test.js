import { getUrl, bindError, bindLogger  } from '../helpers';

describe('http', () => {
    describe('helpers', () => {
        describe('getUrl', () => {
            it('Should return the right url', () => {
                const server = 
                {
                    address: () => ({
                        address: '127.0.0.1',
                        port: '3006',
                    }),
                };
                const res = getUrl(server);

                expect(res).toEqual('http://127.0.0.1:3006');
            });
        });

        describe('bindError', () => {
            it('bindError', () => {
                const next = jest.fn();
                const req = {
                    Err: '',
                };
                const res = {
                    status: jest.fn(),
                    json: jest.fn(),
                };
                const ret = bindError(req, res, next);

                expect(ret).not.toBeDefined();
                expect(next).toHaveBeenCalled();
            });
        });

        describe('bindLogger', () => {
            it('bindLogger', () => {
                const next = jest.fn();
                const req = {
                    Err: '',
                };
                const res = {
                    status: jest.fn(),
                    json: jest.fn(),
                };
                const ret = bindLogger(req, res, next);

                expect(ret).not.toBeDefined();
                expect(next).toHaveBeenCalled();
            });
        });
    });
});