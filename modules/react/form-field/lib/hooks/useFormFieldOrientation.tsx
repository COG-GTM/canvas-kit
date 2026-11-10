import {FlexProps} from '@workday/canvas-kit-react/layout';
import {system} from '@workday/canvas-tokens-web';

/**
 * Adds the necessary layout props to a `FormField` component.
 *
 * @deprecated ⚠️ `useFormFieldOrientation` has been deprecated in v11 and will be removed in a future
 * major version. `FormField` applies orientation styles itself through `formFieldStencil`. Please use
 * the `orientation` prop on `FormField` (`vertical`, `horizontalStart` or `horizontalEnd`) instead.
 */
export const useFormFieldOrientation = (orientation: 'horizontal' | 'vertical') => {
  let layoutProps: {
    flexDirection: FlexProps['flexDirection'];
    alignItems: FlexProps['alignItems'];
    gap: FlexProps['gap'];
  };

  if (orientation === 'horizontal') {
    layoutProps = {
      flexDirection: 'row',
      gap: system.legacy.gap.xl,
      alignItems: undefined,
    };
  } else {
    layoutProps = {
      flexDirection: 'column',
      gap: system.legacy.gap.xs,
      alignItems: 'flex-start',
    };
  }

  return layoutProps;
};
