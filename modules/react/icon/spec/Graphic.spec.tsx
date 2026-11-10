import {render} from '@testing-library/react';

import {CanvasGraphic, CanvasIconTypes} from '@workday/design-assets-types';

import {Graphic} from '../lib/Graphic';

const mockGraphic: CanvasGraphic = {
  name: 'mockGraphic',
  type: CanvasIconTypes.Graphic,
  svg: '<svg></svg>',
  filename: 'mock-graphic.svg',
};

describe('Graphic', () => {
  it('should render an svg with a graphic type', () => {
    const {container} = render(<Graphic src={mockGraphic} />);

    // container is not a semantic element
    expect(container.firstChild).toContainHTML('svg');
  });

  it('should forward extra props to containing element', () => {
    const {container} = render(<Graphic src={mockGraphic} data-propspread="test" />);

    // container is not a semantic element
    expect(container.firstChild).toHaveAttribute('data-propspread', 'test');
  });
});
