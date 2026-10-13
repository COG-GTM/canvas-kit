import React from 'react';

import {
  accessibleHideStyles,
  createContainer,
  focusRing,
  useUniqueId,
} from '@workday/canvas-kit-react/common';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {Modal, useModalModel} from '@workday/canvas-kit-react/modal';
import {CSProps, createStencil, handleCsProp, px2rem} from '@workday/canvas-kit-styling';
import {searchIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';
import {CanvasSystemIcon} from '@workday/design-assets-types';

import {KBD} from '../../kbd';
import {fuzzyMatch} from './fuzzyMatch';

/**
 * A single key of a shortcut. Use a string for keys that read correctly on their own (`K`,
 * `Enter`), and an object with an `aria-label` for glyphs and abbreviations (`⌘`, `⇧`).
 */
export type CommandPaletteShortcutKey = string | {label: string; 'aria-label': string};

export interface CommandPaletteItem {
  /**
   * Unique identifier of the command.
   */
  id: string;
  /**
   * The visible name of the command. This is the text that is searched and highlighted.
   */
  label: string;
  /**
   * Secondary text rendered below the label.
   */
  description?: string;
  /**
   * The heading the command is grouped under. Commands without a group are rendered first.
   */
  group?: string;
  /**
   * An icon rendered before the label.
   */
  icon?: CanvasSystemIcon;
  /**
   * The keyboard shortcut hint rendered at the end of the row. This is only a visual hint; the
   * shortcut itself must be implemented by the application.
   */
  shortcut?: CommandPaletteShortcutKey[];
  /**
   * Extra search terms (synonyms) that match the command without being displayed.
   */
  keywords?: string[];
  /**
   * The function called when the command is chosen.
   */
  onSelect?: () => void;
}

export interface CommandPaletteProps extends CSProps {
  /**
   * The commands that can be searched and run.
   */
  items: CommandPaletteItem[];
  /**
   * The accessible name of the dialog, search input and results list.
   * @default 'Command palette'
   */
  label?: string;
  /**
   * Placeholder text of the search input.
   * @default 'Type a command or search…'
   */
  placeholder?: string;
  /**
   * The text displayed when no commands match the query. Receives the current query.
   * @default (query) => `No results for "${query}"`
   */
  emptyText?: (query: string) => React.ReactNode;
  /**
   * The function called after any command is chosen, after the command's own `onSelect`.
   */
  onSelect?: (item: CommandPaletteItem) => void;
  /**
   * If true, the footer with keyboard hints is hidden.
   * @default false
   */
  hideFooter?: boolean;
  /**
   * Optional target element(s) such as `<CommandPalette.Target>` rendered in place.
   */
  children?: React.ReactNode;
}

interface MatchedItem {
  item: CommandPaletteItem;
  indices: number[];
  score: number;
}

interface MatchedGroup {
  group: string | undefined;
  items: MatchedItem[];
}

/**
 * Filters and orders commands for a query. Groups keep their original order, and matching
 * commands within a group are sorted by relevance.
 */
export function filterCommandPaletteItems(
  items: CommandPaletteItem[],
  query: string
): MatchedGroup[] {
  const groups = new Map<string | undefined, MatchedItem[]>();
  const hasQuery = query.trim().length > 0;

  items.forEach(item => {
    const labelMatch = fuzzyMatch(query, item.label);
    let match: MatchedItem | null = labelMatch
      ? {item, indices: labelMatch.indices, score: labelMatch.score}
      : null;

    if (!match && hasQuery) {
      const extraMatches = [...(item.keywords || []), item.description || '', item.group || '']
        .map(text => (text ? fuzzyMatch(query, text) : null))
        .filter((result): result is NonNullable<typeof result> => result !== null);
      if (extraMatches.length) {
        // Matches on hidden/secondary text rank below label matches.
        match = {item, indices: [], score: Math.max(...extraMatches.map(m => m.score)) - 30};
      }
    }

    if (match) {
      if (!groups.has(item.group)) {
        groups.set(item.group, []);
      }
      groups.get(item.group)!.push(match);
    }
  });

  const result = Array.from(groups.entries()).map(([group, groupItems]) => ({
    group,
    items: hasQuery ? [...groupItems].sort((a, b) => b.score - a.score) : groupItems,
  }));

  // Ungrouped commands come first
  return [
    ...result.filter(g => g.group === undefined),
    ...result.filter(g => g.group !== undefined),
  ];
}

export const commandPaletteCardStencil = createStencil({
  base: {
    alignSelf: 'flex-start',
    marginBlockStart: '12vh',
    width: px2rem(640),
    maxWidth: `calc(100vw - ${system.legacy.gap.xl})`,
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    '@media screen and (max-width: 768px)': {
      alignSelf: 'flex-start',
      padding: 0,
    },
  },
});

export const commandPaletteStencil = createStencil({
  parts: {
    searchRow: 'command-palette-search-row',
    input: 'command-palette-input',
    list: 'command-palette-list',
    groupLabel: 'command-palette-group-label',
    option: 'command-palette-option',
    optionIcon: 'command-palette-option-icon',
    optionText: 'command-palette-option-text',
    optionLabel: 'command-palette-option-label',
    optionDescription: 'command-palette-option-description',
    match: 'command-palette-match',
    empty: 'command-palette-empty',
    footer: 'command-palette-footer',
    hint: 'command-palette-hint',
  },
  base: ({
    searchRowPart,
    inputPart,
    listPart,
    groupLabelPart,
    optionPart,
    optionIconPart,
    optionTextPart,
    optionLabelPart,
    optionDescriptionPart,
    matchPart,
    emptyPart,
    footerPart,
    hintPart,
  }) => ({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '70vh',
    color: system.color.fg.default,
    [searchRowPart]: {
      display: 'flex',
      alignItems: 'center',
      gap: system.legacy.gap.sm,
      paddingInline: system.legacy.padding.md,
      borderBlockEnd: `${px2rem(1)} solid ${system.legacy.color.border.default}`,
      '&:focus-within': focusRing({
        inset: 'outer',
        innerColor: system.color.border.transparent,
        outerColor: system.legacy.color.brand.focus.primary,
      }),
      [`[data-whatinput='mouse'] &:focus-within,
        [data-whatinput='touch'] &:focus-within,
        [data-whatinput='pointer'] &:focus-within`]: {
        boxShadow: 'none',
      },
    },
    [inputPart]: {
      ...system.legacy.type.body.md,
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: system.color.fg.strong,
      paddingBlock: system.legacy.padding.md,
      '&::placeholder': {
        color: system.color.fg.muted.default,
      },
    },
    [listPart]: {
      overflowY: 'auto',
      padding: system.legacy.padding.xs,
      flex: 1,
    },
    [groupLabelPart]: {
      ...system.legacy.type.subtext.md,
      fontWeight: system.fontWeight.bold,
      color: system.color.fg.muted.default,
      paddingInline: system.legacy.padding.sm,
      paddingBlockStart: system.legacy.padding.sm,
      paddingBlockEnd: system.legacy.padding.xxs,
    },
    [optionPart]: {
      display: 'flex',
      alignItems: 'center',
      gap: system.legacy.gap.sm,
      paddingInline: system.legacy.padding.sm,
      paddingBlock: system.legacy.padding.xs,
      borderRadius: system.legacy.shape.md,
      cursor: 'pointer',
      position: 'relative',
      '&[aria-selected=true], &.active': {
        backgroundColor: system.legacy.color.surface.alt.default,
        boxShadow: `inset ${px2rem(3)} 0 0 ${system.legacy.color.brand.focus.primary}`,
      },
    },
    [optionIconPart]: {
      flexShrink: 0,
    },
    [optionTextPart]: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minWidth: 0,
    },
    [optionLabelPart]: {
      ...system.legacy.type.subtext.lg,
      color: system.color.fg.strong,
    },
    [optionDescriptionPart]: {
      ...system.legacy.type.subtext.md,
      color: system.color.fg.muted.default,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    [matchPart]: {
      fontWeight: system.fontWeight.bold,
      color: system.legacy.color.brand.focus.primary,
      textDecoration: 'underline',
      textUnderlineOffset: px2rem(2),
    },
    [emptyPart]: {
      ...system.legacy.type.subtext.lg,
      color: system.color.fg.muted.default,
      textAlign: 'center',
      padding: system.legacy.padding.xl,
    },
    [footerPart]: {
      ...system.legacy.type.subtext.md,
      display: 'flex',
      flexWrap: 'wrap',
      gap: system.legacy.gap.md,
      color: system.color.fg.muted.default,
      paddingInline: system.legacy.padding.md,
      paddingBlock: system.legacy.padding.xs,
      borderBlockStart: `${px2rem(1)} solid ${system.legacy.color.border.default}`,
      backgroundColor: system.legacy.color.surface.alt.default,
    },
    [hintPart]: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: system.legacy.gap.xs,
    },
  }),
});

const renderHighlightedLabel = (label: string, indices: number[]) => {
  if (!indices.length) {
    return label;
  }
  const matched = new Set(indices);
  const segments: {text: string; match: boolean}[] = [];
  for (let i = 0; i < label.length; i++) {
    const match = matched.has(i);
    const last = segments[segments.length - 1];
    if (last && last.match === match) {
      last.text += label[i];
    } else {
      segments.push({text: label[i], match});
    }
  }
  return segments.map((segment, i) =>
    segment.match ? (
      <span key={i} {...commandPaletteStencil.parts.match}>
        {segment.text}
      </span>
    ) : (
      <React.Fragment key={i}>{segment.text}</React.Fragment>
    )
  );
};

const renderShortcut = (shortcut: CommandPaletteShortcutKey[]) => (
  <KBD size="small">
    {shortcut.map((key, i) =>
      typeof key === 'string' ? (
        <KBD.Item key={i}>{key}</KBD.Item>
      ) : (
        <KBD.Item key={i} aria-label={key['aria-label']}>
          {key.label}
        </KBD.Item>
      )
    )}
  </KBD>
);

/**
 * `CommandPalette` is a keyboard-first modal for searching and running commands. Typing filters
 * the commands with fuzzy matching, highlighting the matched characters; arrow keys move through
 * the results, <kbd>Enter</kbd> runs the active command, and <kbd>Escape</kbd> closes the palette.
 *
 * It uses a `useModalModel`, so it can be opened with `CommandPalette.Target`, by calling
 * `model.events.show()`, or with the {@link useCommandPaletteHotkey} global shortcut.
 *
 * ```tsx
 * const model = useModalModel();
 * useCommandPaletteHotkey(model);
 *
 * <CommandPalette model={model} items={items}>
 *   <CommandPalette.Target>Search</CommandPalette.Target>
 * </CommandPalette>
 * ```
 */
export const CommandPalette = createContainer('div')({
  displayName: 'CommandPalette',
  modelHook: useModalModel,
  subComponents: {
    /**
     * A button that opens the command palette. It renders a `SecondaryButton` by default and
     * accepts an `as` prop.
     */
    Target: Modal.Target,
  },
})<CommandPaletteProps>(
  (
    {
      items,
      label = 'Command palette',
      placeholder = 'Type a command or search…',
      emptyText = (query: string) => `No results for "${query}"`,
      onSelect,
      hideFooter = false,
      children,
      ...elemProps
    },
    Element,
    model
  ) => {
    const [query, setQuery] = React.useState('');
    const [activeId, setActiveId] = React.useState<string | undefined>();
    const listId = useUniqueId();
    const idPrefix = useUniqueId();
    const visible = model.state.visibility !== 'hidden';

    const groups = React.useMemo(() => filterCommandPaletteItems(items, query), [items, query]);
    const flatItems = React.useMemo(() => groups.flatMap(g => g.items.map(m => m.item)), [groups]);
    const optionId = (id: string) => `${idPrefix}-option-${id}`;

    // Reset every time the palette opens
    React.useEffect(() => {
      if (visible) {
        setQuery('');
        setActiveId(undefined);
      }
    }, [visible]);

    // Keep the active option valid as results change
    React.useEffect(() => {
      if (!flatItems.some(item => item.id === activeId)) {
        setActiveId(flatItems[0]?.id);
      }
    }, [flatItems, activeId]);

    React.useEffect(() => {
      if (activeId && typeof document !== 'undefined') {
        document.getElementById(optionId(activeId))?.scrollIntoView?.({block: 'nearest'});
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId]);

    const runCommand = (item: CommandPaletteItem) => {
      model.events.hide();
      item.onSelect?.();
      onSelect?.(item);
    };

    const moveActive = (delta: number) => {
      if (!flatItems.length) {
        return;
      }
      const currentIndex = flatItems.findIndex(item => item.id === activeId);
      const nextIndex = (currentIndex + delta + flatItems.length) % flatItems.length;
      setActiveId(flatItems[nextIndex].id);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          moveActive(1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          moveActive(-1);
          break;
        case 'PageDown':
          event.preventDefault();
          setActiveId(flatItems[flatItems.length - 1]?.id);
          break;
        case 'PageUp':
          event.preventDefault();
          setActiveId(flatItems[0]?.id);
          break;
        case 'Enter': {
          // Enter confirms an IME composition rather than selecting a command
          if (event.nativeEvent.isComposing || event.keyCode === 229) {
            break;
          }
          const activeItem = flatItems.find(item => item.id === activeId);
          if (activeItem) {
            event.preventDefault();
            runCommand(activeItem);
          }
          break;
        }
        default:
          break;
      }
    };

    const resultCount = flatItems.length;
    const hasResults = resultCount > 0;

    return (
      <>
        {children}
        <Modal.Overlay>
          <Modal.Card cs={commandPaletteCardStencil()}>
            <Modal.Heading cs={accessibleHideStyles}>{label}</Modal.Heading>
            <Element {...handleCsProp(elemProps, commandPaletteStencil())}>
              <div {...commandPaletteStencil.parts.searchRow}>
                <SystemIcon icon={searchIcon} {...commandPaletteStencil.parts.optionIcon} />
                <input
                  {...commandPaletteStencil.parts.input}
                  type="text"
                  role="combobox"
                  aria-label={label}
                  aria-expanded={hasResults}
                  aria-controls={listId}
                  aria-autocomplete="list"
                  aria-activedescendant={activeId && hasResults ? optionId(activeId) : undefined}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder={placeholder}
                  value={query}
                  onChange={event => {
                    setQuery(event.target.value);
                    setActiveId(undefined);
                  }}
                  onKeyDown={onKeyDown}
                />
              </div>
              <div
                {...commandPaletteStencil.parts.list}
                id={listId}
                role="listbox"
                aria-label={label}
                hidden={!hasResults}
              >
                {groups.map(({group, items: groupItems}) => {
                  const groupLabelId = `${idPrefix}-group-${group}`;
                  const options = groupItems.map(({item, indices}) => {
                    const selected = item.id === activeId;
                    return (
                      <div
                        {...commandPaletteStencil.parts.option}
                        key={item.id}
                        id={optionId(item.id)}
                        role="option"
                        aria-selected={selected}
                        onMouseMove={() => !selected && setActiveId(item.id)}
                        // Keep focus in the search input
                        onMouseDown={event => event.preventDefault()}
                        onClick={() => runCommand(item)}
                      >
                        {item.icon && (
                          <SystemIcon
                            icon={item.icon}
                            size={20}
                            {...commandPaletteStencil.parts.optionIcon}
                          />
                        )}
                        <span {...commandPaletteStencil.parts.optionText}>
                          <span {...commandPaletteStencil.parts.optionLabel}>
                            {renderHighlightedLabel(item.label, indices)}
                          </span>
                          {item.description && (
                            <span {...commandPaletteStencil.parts.optionDescription}>
                              {item.description}
                            </span>
                          )}
                        </span>
                        {item.shortcut && renderShortcut(item.shortcut)}
                      </div>
                    );
                  });
                  return group === undefined ? (
                    <React.Fragment key="__ungrouped">{options}</React.Fragment>
                  ) : (
                    <div key={group} role="group" aria-labelledby={groupLabelId}>
                      <div {...commandPaletteStencil.parts.groupLabel} id={groupLabelId}>
                        {group}
                      </div>
                      {options}
                    </div>
                  );
                })}
              </div>
              {!hasResults && <div {...commandPaletteStencil.parts.empty}>{emptyText(query)}</div>}
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={accessibleHideStyles}
              >
                {visible ? `${resultCount} ${resultCount === 1 ? 'result' : 'results'}` : ''}
              </div>
              {!hideFooter && (
                <div {...commandPaletteStencil.parts.footer} aria-hidden="true">
                  <span {...commandPaletteStencil.parts.hint}>
                    <KBD size="small">
                      <KBD.Item>↑</KBD.Item>
                      <KBD.Item>↓</KBD.Item>
                    </KBD>
                    to navigate
                  </span>
                  <span {...commandPaletteStencil.parts.hint}>
                    <KBD size="small">
                      <KBD.Item>↵</KBD.Item>
                    </KBD>
                    to select
                  </span>
                  <span {...commandPaletteStencil.parts.hint}>
                    <KBD size="small">
                      <KBD.Item>esc</KBD.Item>
                    </KBD>
                    to close
                  </span>
                </div>
              )}
            </Element>
          </Modal.Card>
        </Modal.Overlay>
      </>
    );
  }
);
