import * as common from '@workday/canvas-kit-react/common';

import {getTransformOrigin} from '../lib/utils/getTranslateFromOrigin';

describe('getTransformOrigin', () => {
  it('should return negative calc values for a top left origin', () => {
    expect(getTransformOrigin({horizontal: 'left', vertical: 'top'}, '0.5rem')).toEqual({
      x: 'calc(0.5rem * -1)',
      y: 'calc(0.5rem * -1)',
    });
  });

  it('should return zero multipliers for a center origin', () => {
    expect(getTransformOrigin({horizontal: 'center', vertical: 'center'}, '1rem')).toEqual({
      x: 'calc(1rem * 0)',
      y: 'calc(1rem * 0)',
    });
  });

  it('should return positive calc values for a bottom right origin', () => {
    expect(getTransformOrigin({horizontal: 'right', vertical: 'bottom'}, '1rem')).toEqual({
      x: 'calc(1rem * 1)',
      y: 'calc(1rem * 1)',
    });
  });

  it('should wrap CSS variables in var()', () => {
    expect(
      getTransformOrigin({horizontal: 'left', vertical: 'bottom'}, '--cnvs-sys-space-x2')
    ).toEqual({
      x: 'calc(var(--cnvs-sys-space-x2) * -1)',
      y: 'calc(var(--cnvs-sys-space-x2) * 1)',
    });
  });

  it('should be exported from common while getTranslateFromOrigin is not', () => {
    expect(common.getTransformOrigin).toBe(getTransformOrigin);
    expect('getTranslateFromOrigin' in common).toBe(false);
  });
});
