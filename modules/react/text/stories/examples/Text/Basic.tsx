import {Text} from '@workday/canvas-kit-react/text';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const bodyTextStyles = createStyles({
  fontSize: system.fontSize.body.sm,
  fontWeight: system.fontWeight.normal,
  fontFamily: system.fontFamily.default,
});

const subtextStyles = createStyles({
  ...system.type.subtext.lg,
});

const inheritedStyles = createStyles({
  ...system.type.subtext.lg,
  color: system.color.fg.muted.default,
});

export const Basic = () => (
  <div>
    <Text as="h4">Text as h4</Text>
    <Text as="p" cs={bodyTextStyles}>
      Text styled using cs props
    </Text>
    <Text as="p" cs={subtextStyles}>
      Text styled using type token level
    </Text>
    <div className={inheritedStyles}>
      <Text>Text with inherited styles</Text>
    </div>
  </div>
);
