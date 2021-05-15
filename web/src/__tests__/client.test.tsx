import '@testing-library/jest-dom';
import { Dispatch } from '@reduxjs/toolkit';
import * as apiModule from '../common/api';
import { fetchClients } from '../features/clientPc/clientPcSlice';

jest.mock('../common/api');

describe('ClientSlice', () => {
    let api: jest.Mocked<typeof apiModule>;

    beforeAll(() => {
        api = apiModule as any;
    });

    afterAll(() => {
        jest.unmock('../common/api');
    });

    describe('fetchClients', () => {
        let action: any;
        let dispatch: Dispatch;
        let getState: () => unknown;

        let arg: any;
        let result: any;

        beforeEach(() => {
            dispatch = jest.fn();
            getState = jest.fn();

            api.getAll.mockClear();
            api.getAll.mockResolvedValue(result);

            action = fetchClients();
        });

        it('call api correctly', async () => {
            await action(dispatch, getState, undefined);
            expect(api.getAll).toHaveBeenCalled();
        });
    });
});
