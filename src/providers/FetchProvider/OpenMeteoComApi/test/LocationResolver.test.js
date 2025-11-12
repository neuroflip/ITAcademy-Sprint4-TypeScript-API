import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getLocation } from '../LocationResolver';

let globalNavigator;
const location = {
    latitude: 151.1,
    longitude: 245.3
};

const getCurrentPositionSuccessMock = vi.fn()
    .mockImplementation((success) => Promise.resolve(success({
      coords: location
})));
const getCurrentPositionFailMock = vi.fn()
    .mockImplementation((success, fail) => Promise.reject(fail(new Error('Location not resolved'))));

describe('LocationResolver', () => {
    describe('location resolved correctly', () => {
        beforeEach(() => {
            globalNavigator = globalThis.navigator;
            globalThis.navigator = {
                geolocation: {
                    getCurrentPosition: getCurrentPositionSuccessMock
                }
            }
        });

        afterEach(() => {
            globalThis.navigator = globalNavigator;
        });

        it('returns the correct location position correctly using the callback', () => {
            const locationResolvedMock = vi.fn();
            const locationNotResolvedMock = vi.fn();
            
            getLocation(locationResolvedMock, locationNotResolvedMock);

            expect(locationResolvedMock).toHaveBeenCalledTimes(1);
            expect(locationResolvedMock).toHaveBeenCalledWith(location);
            expect(locationNotResolvedMock).not.toHaveBeenCalled();
        });
    });

    describe('location NOT resolved because not geolocation available in browser', () => {
        beforeEach(() => {
            globalNavigator = globalThis.navigator;
            globalThis.navigator = { };
        });

        afterEach(() => {
            globalThis.navigator = globalNavigator;
        });

        it('does not returns the correct location position correctly using the callback', () => {
            const locationResolvedMock = vi.fn();
            const locationNotResolvedMock = vi.fn();
            
            getLocation(locationResolvedMock, locationNotResolvedMock);

            expect(locationResolvedMock).not.toHaveBeenCalled();
            expect(locationNotResolvedMock).toHaveBeenCalledTimes(1);
            expect(locationNotResolvedMock).toHaveBeenCalled();
        });
    });

    describe('location NOT resolved because getCurrentPosition returns a permission error', () => {
        beforeEach(() => {
            globalNavigator = globalThis.navigator;
            globalThis.navigator = {
                geolocation: {
                    getCurrentPosition: getCurrentPositionFailMock
                }
            }
        });

        afterEach(() => {
            globalThis.navigator = globalNavigator;
        });

        it('does not returns the correct location position correctly using the callback', () => {
            const locationResolvedMock = vi.fn();
            const locationNotResolvedMock = vi.fn();
            
            getLocation(locationResolvedMock, locationNotResolvedMock);

            expect(locationResolvedMock).not.toHaveBeenCalled();
            expect(locationNotResolvedMock).toHaveBeenCalledTimes(1);
            expect(locationNotResolvedMock).toHaveBeenCalledWith(expect.any(Error));
        });
    });
});