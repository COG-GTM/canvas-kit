import {expectTypeOf} from 'expect-type';

import {ButtonColors} from '../lib/types';

describe('ButtonColors', () => {
  it('should not accept the removed focus.focusRing option', () => {
    type FocusColors = NonNullable<ButtonColors['focus']>;
    expectTypeOf<FocusColors>().not.toHaveProperty('focusRing');

    const colors: ButtonColors = {
      // @ts-expect-error focusRing was removed in v17, use boxShadowInner/boxShadowOuter
      focus: {focusRing: {boxShadow: 'none'}},
    };
    expectTypeOf(colors).toMatchTypeOf<ButtonColors>();
  });

  it('should accept boxShadowInner and boxShadowOuter focus colors', () => {
    const colors: ButtonColors = {focus: {boxShadowInner: 'red', boxShadowOuter: 'blue'}};
    expectTypeOf(colors.focus).toMatchTypeOf<ButtonColors['focus']>();
  });
});
