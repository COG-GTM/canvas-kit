import {fireEvent, render, screen} from '@testing-library/react';
import * as React from 'react';

import {useModalModel} from '@workday/canvas-kit-react/modal';

import {CommandPalette, CommandPaletteItem, filterCommandPaletteItems} from '../lib/CommandPalette';
import {useCommandPaletteHotkey} from '../lib/useCommandPaletteHotkey';

const items: CommandPaletteItem[] = [
  {id: 'home', label: 'Go to Home', group: 'Navigation'},
  {id: 'inbox', label: 'Go to Inbox', group: 'Navigation'},
  {id: 'time-off', label: 'Request Time Off', group: 'Create', keywords: ['pto']},
  {id: 'expense', label: 'New Expense Report', group: 'Create'},
];

const renderPalette = (props: Partial<React.ComponentProps<typeof CommandPalette>> = {}) => {
  render(
    <CommandPalette items={items} {...props}>
      <CommandPalette.Target>Open</CommandPalette.Target>
    </CommandPalette>
  );
  fireEvent.click(screen.getByRole('button', {name: 'Open'}));
  return screen.getByRole('combobox', {name: 'Command palette'});
};

describe('filterCommandPaletteItems', () => {
  it('should return every item grouped in the original order with an empty query', () => {
    const groups = filterCommandPaletteItems(items, '');
    expect(groups.map(g => g.group)).toEqual(['Navigation', 'Create']);
    expect(groups[0].items.map(m => m.item.id)).toEqual(['home', 'inbox']);
  });

  it('should drop groups without matches', () => {
    const groups = filterCommandPaletteItems(items, 'inbox');
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map(m => m.item.id)).toEqual(['inbox']);
  });

  it('should match keywords without highlighting the label', () => {
    const groups = filterCommandPaletteItems(items, 'pto');
    expect(groups[0].items[0].item.id).toBe('time-off');
    expect(groups[0].items[0].indices).toEqual([]);
  });

  it('should render ungrouped items first', () => {
    const groups = filterCommandPaletteItems([...items, {id: 'help', label: 'Help'}], '');
    expect(groups[0].group).toBeUndefined();
  });
});

describe('CommandPalette', () => {
  it('should open a dialog with a combobox and listbox', () => {
    renderPalette();
    expect(screen.getByRole('dialog', {name: 'Command palette'})).toBeInTheDocument();
    expect(screen.getByRole('listbox', {name: 'Command palette'})).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(4);
    expect(screen.getByRole('group', {name: 'Navigation'})).toBeInTheDocument();
  });

  it('should mark the first option as active', () => {
    const input = renderPalette();
    const firstOption = screen.getByRole('option', {name: 'Go to Home'});
    expect(firstOption).toHaveAttribute('aria-selected', 'true');
    expect(input).toHaveAttribute('aria-activedescendant', firstOption.id);
  });

  it('should filter options as the user types', () => {
    const input = renderPalette();
    fireEvent.change(input, {target: {value: 'expense'}});
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option', {name: 'New Expense Report'})).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('1 result');
  });

  it('should move the active option with the arrow keys and wrap around', () => {
    const input = renderPalette();
    fireEvent.keyDown(input, {key: 'ArrowDown'});
    expect(screen.getByRole('option', {name: 'Go to Inbox'})).toHaveAttribute(
      'aria-selected',
      'true'
    );
    fireEvent.keyDown(input, {key: 'ArrowUp'});
    fireEvent.keyDown(input, {key: 'ArrowUp'});
    expect(screen.getByRole('option', {name: 'New Expense Report'})).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('should run the active command on Enter and close', () => {
    const onItemSelect = vi.fn();
    const onSelect = vi.fn();
    const input = renderPalette({
      items: items.map(item => (item.id === 'inbox' ? {...item, onSelect: onItemSelect} : item)),
      onSelect,
    });
    fireEvent.keyDown(input, {key: 'ArrowDown'});
    fireEvent.keyDown(input, {key: 'Enter'});
    expect(onItemSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({id: 'inbox'}));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should run a command when it is clicked', () => {
    const onSelect = vi.fn();
    renderPalette({onSelect});
    fireEvent.click(screen.getByRole('option', {name: 'Request Time Off'}));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({id: 'time-off'}));
  });

  it('should show the empty text when nothing matches', () => {
    const input = renderPalette({emptyText: query => `Nothing for ${query}`});
    fireEvent.change(input, {target: {value: 'zzz'}});
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByText('Nothing for zzz')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).not.toHaveAttribute('aria-activedescendant');
  });

  it('should reset the query when reopened', () => {
    const input = renderPalette();
    fireEvent.change(input, {target: {value: 'inbox'}});
    fireEvent.keyDown(input, {key: 'Enter'});
    fireEvent.click(screen.getByRole('button', {name: 'Open'}));
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });
});

const activeLabel = () => {
  const id = screen.getByRole('combobox').getAttribute('aria-activedescendant');
  return id ? document.getElementById(id)?.textContent : undefined;
};

describe('CommandPalette active option', () => {
  it('should reset the active option to the first item when reopened', () => {
    const input = renderPalette();
    fireEvent.keyDown(input, {key: 'ArrowDown'});
    expect(activeLabel()).toContain('Go to Inbox');
    fireEvent.keyDown(input, {key: 'Escape'});
    fireEvent.click(screen.getByRole('button', {name: 'Open'}));
    expect(activeLabel()).toContain('Go to Home');
  });

  it('should reset the active option to the first result when the query changes', () => {
    const input = renderPalette();
    fireEvent.change(input, {target: {value: 'go'}});
    fireEvent.keyDown(input, {key: 'ArrowDown'});
    expect(activeLabel()).toContain('Go to Inbox');
    fireEvent.change(input, {target: {value: 'go '}});
    expect(activeLabel()).toContain('Go to Home');
  });

  it('should ignore Enter while an IME composition is in progress', () => {
    const onSelect = vi.fn();
    const input = renderPalette({onSelect});
    fireEvent.keyDown(input, {key: 'Enter', isComposing: true});
    fireEvent.keyDown(input, {key: 'Enter', keyCode: 229});
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('useCommandPaletteHotkey', () => {
  const HotkeyPalette = ({hotkey}: {hotkey?: string}) => {
    const model = useModalModel();
    useCommandPaletteHotkey(model, {key: hotkey});
    return <CommandPalette model={model} items={items} />;
  };

  it('should open with Ctrl+K and Meta+K and close when pressed again', () => {
    render(<HotkeyPalette />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.keyDown(document, {key: 'k', ctrlKey: true});
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, {key: 'K', metaKey: true});
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should ignore the key without a modifier', () => {
    render(<HotkeyPalette />);
    fireEvent.keyDown(document, {key: 'k'});
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should support a custom key', () => {
    render(<HotkeyPalette hotkey="p" />);
    fireEvent.keyDown(document, {key: 'p', ctrlKey: true});
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should only open one palette when several register the same hotkey', () => {
    render(
      <>
        <HotkeyPalette />
        <HotkeyPalette />
      </>
    );
    fireEvent.keyDown(document, {key: 'k', ctrlKey: true});
    expect(screen.getAllByRole('dialog')).toHaveLength(1);
    fireEvent.keyDown(document, {key: 'k', ctrlKey: true});
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
