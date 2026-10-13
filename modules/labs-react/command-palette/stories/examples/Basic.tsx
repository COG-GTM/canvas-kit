import React from 'react';

import {
  CommandPalette,
  CommandPaletteItem,
  useCommandPaletteHotkey,
} from '@workday/canvas-kit-labs-react/command-palette';
import {KBD} from '@workday/canvas-kit-labs-react/kbd';
import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {useModalModel} from '@workday/canvas-kit-react/modal';
import {Subtext} from '@workday/canvas-kit-react/text';
import {createStyles} from '@workday/canvas-kit-styling';
import {
  airplaneIcon,
  benefitsIcon,
  calendarIcon,
  documentPlusIcon,
  gearIcon,
  homeIcon,
  inboxIcon,
  moneyIcon,
  moonIcon,
  searchIcon,
  userIcon,
} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const containerStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: system.gap.md,
});

const hintStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  gap: system.gap.xs,
  margin: 0,
});

const commandKey = {label: '⌘', 'aria-label': 'Command'};
const shiftKey = {label: '⇧', 'aria-label': 'Shift'};

export const Basic = () => {
  const [lastCommand, setLastCommand] = React.useState('None yet');
  const model = useModalModel();
  useCommandPaletteHotkey(model);

  const items: CommandPaletteItem[] = [
    {id: 'home', label: 'Go to Home', group: 'Navigation', icon: homeIcon},
    {
      id: 'inbox',
      label: 'Go to Inbox',
      group: 'Navigation',
      icon: inboxIcon,
      shortcut: [commandKey, shiftKey, 'I'],
    },
    {id: 'profile', label: 'View My Profile', group: 'Navigation', icon: userIcon},
    {id: 'benefits', label: 'Review Benefits', group: 'Navigation', icon: benefitsIcon},
    {
      id: 'time-off',
      label: 'Request Time Off',
      description: 'Vacation, sick leave, and other absences',
      group: 'Create',
      icon: airplaneIcon,
      keywords: ['pto', 'vacation', 'holiday', 'leave'],
    },
    {
      id: 'expense',
      label: 'New Expense Report',
      description: 'Submit receipts for reimbursement',
      group: 'Create',
      icon: moneyIcon,
      keywords: ['receipt', 'reimburse'],
      shortcut: [commandKey, 'E'],
    },
    {
      id: 'request',
      label: 'New Request',
      group: 'Create',
      icon: documentPlusIcon,
      shortcut: [commandKey, 'N'],
    },
    {
      id: 'meeting',
      label: 'Schedule a Meeting',
      group: 'Create',
      icon: calendarIcon,
      keywords: ['calendar', 'invite'],
    },
    {
      id: 'dark-mode',
      label: 'Toggle Dark Mode',
      group: 'Settings',
      icon: moonIcon,
      keywords: ['theme', 'appearance'],
    },
    {
      id: 'preferences',
      label: 'Open Preferences',
      group: 'Settings',
      icon: gearIcon,
      shortcut: [commandKey, ','],
    },
  ];

  return (
    <div className={containerStyles}>
      <CommandPalette model={model} items={items} onSelect={item => setLastCommand(item.label)}>
        <CommandPalette.Target
          as={SecondaryButton}
          icon={searchIcon}
          aria-keyshortcuts="Control+K Meta+K"
        >
          Search commands
        </CommandPalette.Target>
      </CommandPalette>
      <p className={hintStyles}>
        <Subtext as="span" size="large">
          Or press
        </Subtext>
        <KBD>
          <KBD.Item aria-label="Command">⌘</KBD.Item>
          <KBD.Item>K</KBD.Item>
        </KBD>
        <Subtext as="span" size="large">
          /
        </Subtext>
        <KBD>
          <KBD.Item>Ctrl</KBD.Item>
          <KBD.Item>K</KBD.Item>
        </KBD>
      </p>
      <Subtext size="large" role="status">
        Last command: {lastCommand}
      </Subtext>
    </div>
  );
};
