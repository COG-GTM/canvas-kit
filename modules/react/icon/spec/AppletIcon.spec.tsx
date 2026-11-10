import {render} from '@testing-library/react';
import * as React from 'react';

import {benefitsIcon} from '@workday/canvas-applet-icons-web';

import {AppletIcon} from '../lib/AppletIcon';

describe('Applet Icon', () => {
  it('should render extra props to containing element', () => {
    const {container} = render(<AppletIcon icon={benefitsIcon} data-propspread="test" />);

    // containing element is not a semantic element
    expect(container.firstChild).toHaveAttribute('data-propspread', 'test');
  });
});
