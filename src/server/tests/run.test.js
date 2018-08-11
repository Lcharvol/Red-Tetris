import run from '../run';
import config from '../../../config/server/index';

describe('run.js', () => {
    describe('run', () => {
        it('Should return enhanced context', () => {
            const ctx = {
                config: {
                    ...config,
                    server: {
                        host: '127.0.0.1',
                        port: '3006',
                    }
                }
            };
            return run(ctx).then(ctx => {
                expect(ctx).toBeDefined();
            });
        });
    });
});