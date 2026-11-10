import {createComponent} from '@workday/canvas-kit-react/common';
import {FlexProps, mergeStyles} from '@workday/canvas-kit-react/layout';
import {createStencil} from '@workday/canvas-kit-styling';

export interface ListItemProps extends FlexProps {}

export const paginationListItemStencil = createStencil({
  base: {
    display: 'flex',
  },
});

export const ListItem = createComponent('li')({
  displayName: 'ListItem',
  Component: ({children, ...elemProps}: ListItemProps, ref, Element) => {
    return (
      <Element ref={ref} {...mergeStyles(elemProps, paginationListItemStencil())}>
        {children}
      </Element>
    );
  },
});
