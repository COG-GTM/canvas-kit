import {stripIndent} from 'common-tags';

import transform from '../removeTabsMenuPopper';
import {expectTransformFactory} from './expectTransformFactory';

const expectTransform = expectTransformFactory(transform);

describe('removeTabsMenuPopper', () => {
  it('should ignore files without a main Tabs import', () => {
    const input = stripIndent`
      import {Tabs} from '@workday/canvas-kit-preview-react/tabs';
      <Tabs.MenuPopper>Content</Tabs.MenuPopper>
    `;

    expectTransform(input, input);
  });

  it('should replace Tabs.MenuPopper with Tabs.Menu.Popper on slash imports', () => {
    const input = stripIndent`
      import {Tabs} from '@workday/canvas-kit-react/tabs';

      const MyTabs = () => (
        <Tabs>
          <Tabs.MenuPopper>
            <Tabs.Menu.Card>
              <Tabs.Menu.List>{item => <Tabs.Menu.Item>{item.text}</Tabs.Menu.Item>}</Tabs.Menu.List>
            </Tabs.Menu.Card>
          </Tabs.MenuPopper>
        </Tabs>
      );
    `;

    const expected = stripIndent`
      import {Tabs} from '@workday/canvas-kit-react/tabs';

      const MyTabs = () => (
        <Tabs>
          <Tabs.Menu.Popper>
            <Tabs.Menu.Card>
              <Tabs.Menu.List>{item => <Tabs.Menu.Item>{item.text}</Tabs.Menu.Item>}</Tabs.Menu.List>
            </Tabs.Menu.Card>
          </Tabs.Menu.Popper>
        </Tabs>
      );
    `;

    expectTransform(input, expected);
  });

  it('should replace Tabs.MenuPopper on package root imports', () => {
    const input = stripIndent`
      import {Tabs} from '@workday/canvas-kit-react';
      <Tabs.MenuPopper placement="bottom" />
    `;

    const expected = stripIndent`
      import {Tabs} from '@workday/canvas-kit-react';
      <Tabs.Menu.Popper placement="bottom" />
    `;

    expectTransform(input, expected);
  });

  it('should replace Tabs.MenuPopper on renamed imports', () => {
    const input = stripIndent`
      import {Tabs as CanvasTabs} from '@workday/canvas-kit-react/tabs';
      <CanvasTabs.MenuPopper>Content</CanvasTabs.MenuPopper>
    `;

    const expected = stripIndent`
      import {Tabs as CanvasTabs} from '@workday/canvas-kit-react/tabs';
      <CanvasTabs.Menu.Popper>Content</CanvasTabs.Menu.Popper>
    `;

    expectTransform(input, expected);
  });

  it('should replace non-JSX references to Tabs.MenuPopper', () => {
    const input = stripIndent`
      import {Tabs} from '@workday/canvas-kit-react/tabs';
      const Popper = Tabs.MenuPopper;
      <Foo as={Tabs.MenuPopper} />
    `;

    const expected = stripIndent`
      import {Tabs} from '@workday/canvas-kit-react/tabs';
      const Popper = Tabs.Menu.Popper;
      <Foo as={Tabs.Menu.Popper} />
    `;

    expectTransform(input, expected);
  });

  it('should not change other Tabs subcomponents', () => {
    const input = stripIndent`
      import {Tabs} from '@workday/canvas-kit-react/tabs';
      <Tabs.Menu.Popper>
        <Tabs.OverflowButton>More</Tabs.OverflowButton>
      </Tabs.Menu.Popper>
    `;

    expectTransform(input, input);
  });
});
