import React from 'react';
import {renderHook} from '@testing-library/react';
import {makeFakeOffer} from '../utils/mocks';
import useMap from './useMap';
import {Class} from 'leaflet';

const fakeOffer = makeFakeOffer();
const fakeElement = document.createElement('div');
const mapRef: React.MutableRefObject<HTMLElement | null> = {current: fakeElement};

describe('Hook: useMap', () => {
  it('should return map leaflet', () => {
    const {result} = renderHook(() =>
      useMap(mapRef, fakeOffer),
    );

    expect(result.current).toBeInstanceOf(Class);
  });
});
