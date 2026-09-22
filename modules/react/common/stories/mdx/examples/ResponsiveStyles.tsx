import * as React from 'react';

import {useResizeObserver, useResponsiveContainerStyles} from '@workday/canvas-kit-react/common';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {Select} from '@workday/canvas-kit-react/select';
import {Text} from '@workday/canvas-kit-react/text';
import {createStyles, cssVar, px2rem} from '@workday/canvas-kit-styling';
import {base, system} from '@workday/canvas-tokens-web';

const headingTextStyles = createStyles({
  fontSize: px2rem(20),
  fontWeight: system.fontWeight.bold,
  color: base.frenchVanilla100,
  margin: system.space.zero,
});

const sectionStyles = createStyles({
  display: 'grid',
});

const headerStyles = createStyles({
  display: 'grid',
  boxSizing: 'border-box',
  gridArea: 'Header',
  backgroundColor: base.blueberry400,
});

const contentLeftStyles = createStyles({
  display: 'grid',
  boxSizing: 'border-box',
  gridArea: 'ContentLeft',
  backgroundColor: base.plum300,
});

const contentRightStyles = createStyles({
  display: 'grid',
  boxSizing: 'border-box',
  gridArea: 'ContentRight',
  backgroundColor: base.blueberry300,
});

const footerStyles = createStyles({
  display: 'grid',
  boxSizing: 'border-box',
  gridArea: 'Footer',
  backgroundColor: base.berrySmoothie300,
});

export const ResponsiveContainer = () => {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(0);

  useResizeObserver({
    ref: ref,
    onResize: data => {
      setWidth(data.width || 0);
    },
  });

  // `useResponsiveContainerStyles` returns style objects for the current container width, so these
  // styles are applied inline. Everything that doesn't depend on the container width is defined
  // with `createStyles` at module scope.
  const responsiveStyles = useResponsiveContainerStyles(
    {
      parentContainer: {
        gap: cssVar(system.space.x4),
        display: 'inline-grid',
        gridTemplateAreas: "'Header' 'ContentLeft' 'ContentRight ' 'Footer'",
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto auto auto',
        m: {
          gridTemplateAreas: "'Header Header' 'ContentLeft ContentRight ' 'Footer Footer'",
          gap: cssVar(system.space.x4),
          gridTemplateColumns: '1fr 3fr',
          gridTemplateRows: `auto ${px2rem(200)} auto`,
        },
      },
      childrenContainers: {
        boxShadow: cssVar(system.depth[1]),
        borderRadius: cssVar(system.shape.x1),
        padding: cssVar(system.space.x4),
      },
      box: {
        padding: cssVar(system.space.x4),
      },
    },
    width
  );

  // `useResponsiveContainerStyles` is typed against the deprecated style props, so the returned
  // CSS objects are cast to `React.CSSProperties` before being applied inline.
  const parentContainerStyle = responsiveStyles.parentContainer as React.CSSProperties;
  const childContainerStyle = responsiveStyles.childrenContainers as React.CSSProperties;

  const desktop = 1024;

  const [contWidth, setContWidth] = React.useState(desktop);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line radix
    setContWidth(parseInt(event.target.value));
  };

  return (
    <div ref={ref} style={{width: contWidth}}>
      <FormField>
        <FormField.Label>Container Size</FormField.Label>
        <Select items={['1024px', '768px', '320px']} initialSelectedIds={['1024px']}>
          <FormField.Input as={Select.Input} onChange={handleChange} />
          <Select.Popper>
            <Select.Card>
              <Select.List>{item => <Select.Item>{item}</Select.Item>}</Select.List>
            </Select.Card>
          </Select.Popper>
        </Select>
      </FormField>
      <section className={sectionStyles}>
        <div style={parentContainerStyle}>
          <div className={headerStyles} style={childContainerStyle}>
            <Text as="p" cs={headingTextStyles}>
              Header
            </Text>
          </div>
          <div className={contentLeftStyles} style={childContainerStyle}>
            <Text as="p" cs={headingTextStyles}>
              Content Left
            </Text>
          </div>
          <div className={contentRightStyles} style={childContainerStyle}>
            <Text as="p" cs={headingTextStyles}>
              Content Right
            </Text>
          </div>
          <div className={footerStyles} style={childContainerStyle}>
            <Text as="p" cs={headingTextStyles}>
              Footer
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
};
