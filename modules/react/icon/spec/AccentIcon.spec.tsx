import {render} from '@testing-library/react';
import * as React from 'react';

import {shieldIcon} from '@workday/canvas-accent-icons-web';
import {base} from '@workday/canvas-tokens-web';

import {AccentIcon, accentIconStencil} from '../lib/AccentIcon';

describe('Accent Icon', () => {
  it('should map a base token name passed to color to its CSS variable', () => {
    const {container} = render(<AccentIcon icon={shieldIcon} color="cinnamon500" />);

    expect((container.firstChild as HTMLElement).getAttribute('style')).toContain(
      `var(${base.cinnamon500})`
    );
  });

  it('should apply the transparent modifier when transparent is true', () => {
    const {container} = render(<AccentIcon icon={shieldIcon} transparent />);

    expect(container.firstChild).toHaveClass(accentIconStencil.modifiers.transparent.true);
  });

  it('should spread extra props to the icon element', () => {
    const {container} = render(<AccentIcon icon={shieldIcon} data-propspread="test" />);

    // the container is not a semantic element
    expect(container.firstChild).toHaveAttribute('data-propspread', 'test');
  });
});
