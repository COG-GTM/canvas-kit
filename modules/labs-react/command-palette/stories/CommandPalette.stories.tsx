import {Meta} from '@storybook/react';

import mdxDoc from './CommandPalette.mdx';
import {Basic as BasicExample} from './examples/Basic';
import {EmptyState as EmptyStateExample} from './examples/EmptyState';

export default {
  title: 'Labs/Command Palette',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: mdxDoc,
    },
  },
} as Meta;

export const Basic = {
  render: BasicExample,
};

export const EmptyState = {
  render: EmptyStateExample,
};
