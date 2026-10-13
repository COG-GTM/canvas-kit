/**
 * @jest-environment node
 */
import {renderToString} from 'react-dom/server';

import {CommandPalette} from '../lib/CommandPalette';

describe('CommandPalette', () => {
  it('should render on a server without crashing', () => {
    const ssrRender = () =>
      renderToString(
        <CommandPalette items={[{id: 'home', label: 'Go to Home'}]}>
          <CommandPalette.Target>Open</CommandPalette.Target>
        </CommandPalette>
      );
    expect(ssrRender).not.toThrow();
  });
});
