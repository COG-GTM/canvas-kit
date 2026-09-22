import React from 'react';

import * as CanvasAccentIcons from '@workday/canvas-accent-icons-web';
import {AccentIcon} from '@workday/canvas-kit-react/icon';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const ImportedIcons = Object.keys(CanvasAccentIcons);

const allIcons = ImportedIcons.filter(icon => icon !== 'CanvasAccentIcons');

const styleOverrides = {
  parentContainer: createStyles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: system.gap.lg,
  }),
  iconGroupContainer: createStyles({
    display: 'flex',
    flexWrap: 'wrap',
  }),
  individualIconContainer: createStyles({
    display: 'flex',
    alignItems: 'center',
    width: `max(${px2rem(320)},20%)`,
    flexDirection: 'row',
    gap: px2rem(12),
    padding: system.padding.sm,
  }),
};

export const AccentIconList = () => {
  const [value, setValue] = React.useState('');

  const handleSearch = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className={styleOverrides.parentContainer}>
      <TextInput onKeyDown={e => handleSearch(e)} placeholder="Search for an icon" />
      <div className={styleOverrides.iconGroupContainer}>
        {allIcons
          .filter(icon => {
            if (value === '') {
              return 'No icons found';
            } else if (icon.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
              return icon;
            }
          })
          .map((singleIcon, index) => {
            return (
              <div className={styleOverrides.individualIconContainer} key={index}>
                <div>
                  <AccentIcon icon={CanvasAccentIcons[singleIcon]} />
                </div>
                <div>{singleIcon}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
