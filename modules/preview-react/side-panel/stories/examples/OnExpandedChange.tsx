import * as React from 'react';

import {SidePanel, useSidePanel} from '@workday/canvas-kit-preview-react/side-panel';
import {AccessibleHide} from '@workday/canvas-kit-react/common';
import {Text} from '@workday/canvas-kit-react/text';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';

const viewportStyles = createStyles({
  display: 'flex',
  height: px2rem(320),
});

const mainStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flex: 1,
  flexBasis: 'auto',
});

export const OnExpandedChange = () => {
  const {expanded, panelProps, labelProps, controlProps} = useSidePanel();

  const handleExpandedChange = (expanded: boolean) => {
    console.log(`Side panel is ${expanded ? 'expanded' : 'collapsed'}`);
  };

  return (
    <div className={viewportStyles}>
      <SidePanel {...panelProps} onExpandedChange={handleExpandedChange}>
        <SidePanel.ToggleButton {...controlProps} />
        <AccessibleHide {...labelProps}>Hidden Title</AccessibleHide>
      </SidePanel>
      <main className={mainStyles}>
        <Text as="p" typeLevel="body.large">
          Side panel is {expanded ? 'expanded' : 'collapsed'}.
        </Text>
      </main>
    </div>
  );
};
