import {
    describe,
    before,
    it,
} from 'mocha'
import {expect} from 'chai';
import {
    SinonFakeXMLHttpRequest,
    useFakeXMLHttpRequest,
} from 'sinon';
import Api from "../api";

let currentRequest: SinonFakeXMLHttpRequest | undefined;

function createApi () {
    currentRequest = undefined;

    return Api.getInstance();
}

describe('Api', () => {
    before(() => {
        // @ts-ignore
        global.XMLHttpRequest = useFakeXMLHttpRequest();
        // @ts-ignore
        global.XMLHttpRequest.onCreate = (request: SinonFakeXMLHttpRequest) => currentRequest = request;
    });
    describe('Api GET запрос', () => {
        it('GET запрос отправляется', () => {
            const api = createApi();

            expect(currentRequest).to.undefined;
            api.get('test');
            expect(currentRequest).to.not.undefined;
            expect(currentRequest?.method).to.eq('get')
            expect(currentRequest?.url).to.eq('test');
        });
        it('GET запрос c параметрами отправляется', () => {
            const api = createApi();

            expect(currentRequest).to.undefined;
            api.get('test', {
                data: { text: 'test' },
            });
            expect(currentRequest).to.not.undefined;
            expect(currentRequest?.method).to.eq('get')
            expect(currentRequest?.url).to.eq('test?text=test');
        });
    });
    describe('Api POST запрос', () => {
        it('POST запрос отправляется', () => {
            const api = createApi();

            expect(currentRequest).to.undefined;
            api.post('test');
            expect(currentRequest).to.not.undefined;
            expect(currentRequest?.method).to.eq('post')
            expect(currentRequest?.url).to.eq('test');
        });
        it('POST запрос отправляется с телом в формате json', () => {
            const api = createApi();

            expect(currentRequest).to.undefined;
            const requestData = {
                text: 'test',
            };
            const contentType = 'application/json;charset=utf-8';
            api.post('test', {
                headers: {
                    'content-type': contentType,
                },
                data: requestData,
            });
            expect(currentRequest).to.not.undefined;
            expect(currentRequest?.method).to.eq('post')
            expect(currentRequest?.url).to.eq('test');
            expect(currentRequest?.requestHeaders['content-type']).to.eq(contentType);
            expect(currentRequest?.requestBody).to.eq(JSON.stringify(requestData));
        });
        it('POST запрос поддерживает cookie', () => {
            const api = createApi();

            expect(currentRequest).to.undefined;

            api.post('test');
            expect(currentRequest).to.not.undefined;
            expect(currentRequest?.withCredentials).to.not.true;

            api.post('test', {
                credentials: 'include',
            });
            expect(currentRequest).to.not.undefined;
            expect(currentRequest?.withCredentials).to.true;
        });
    });
    describe('Api PUT запрос', () => {
        it('PUT запрос отправляется', () => {
            const api = createApi();

            expect(currentRequest).to.undefined;
            api.put('test');
            expect(currentRequest).to.not.undefined;
            expect(currentRequest?.method).to.eq('put')
            expect(currentRequest?.url).to.eq('test');
        });
    });
    describe('Api PATCH запрос', () => {
        it('PATCH запрос отправляется', () => {
            const api = createApi();

            expect(currentRequest).to.undefined;
            api.patch('test');
            expect(currentRequest).to.not.undefined;
            expect(currentRequest?.method).to.eq('patch')
            expect(currentRequest?.url).to.eq('test');
        });
    });
    describe('Api DELETE запрос', () => {
        it('DELETE запрос отправляется', () => {
            const api = createApi();

            expect(currentRequest).to.undefined;
            api.delete('test');
            expect(currentRequest).to.not.undefined;
            expect(currentRequest?.method).to.eq('delete')
            expect(currentRequest?.url).to.eq('test');
        });
    });
})