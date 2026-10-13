import {CommandPalette, CommandPaletteItem} from '@workday/canvas-kit-labs-react/command-palette';
import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {documentIcon} from '@workday/canvas-system-icons-web';

const items: CommandPaletteItem[] = [
  {id: 'q1', label: 'Q1 Planning Notes', icon: documentIcon},
  {id: 'q2', label: 'Q2 Roadmap', icon: documentIcon},
  {id: 'retro', label: 'Team Retrospective', icon: documentIcon},
];

export const EmptyState = () => {
  return (
    <CommandPalette
      items={items}
      label="Search documents"
      placeholder="Search documents…"
      hideFooter
      emptyText={query => `We couldn't find any documents matching "${query}". Try another word.`}
    >
      <CommandPalette.Target as={SecondaryButton}>Search documents</CommandPalette.Target>
    </CommandPalette>
  );
};
