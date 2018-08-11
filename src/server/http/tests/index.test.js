import init, { handler } from '../index';
import config from '../../../../config/server/index';
import express from 'express';

const request = require('supertest');

describe('http', () => {
    const app = express();
    describe('init', () => {
        it('Should return enhanced context', () => {
            const ctx = {
                config: {
                    ...config,
                    server: {
                        host: '127.0.0.1',
                        port: '3005',
                    }
                }
            };
            return init(ctx).then(res => {
                expect(res).toBeDefined();
            });
        });
    });
    describe('handler', () => {
        it('Should return proper res', () => {
            const req = {
                url: '/bundle.js',
            }
            request(app).get('/').then((response) => {
                expect(response.statusCode).toBe(200);
                expect(handler).toHaveBeenCalled();
                done();
            });
        });
    });
});