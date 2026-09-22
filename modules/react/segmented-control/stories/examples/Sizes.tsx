import {SegmentedControl} from '@workday/canvas-kit-react/segmented-control';
import {BodyText} from '@workday/canvas-kit-react/text';
import {createStyles} from '@workday/canvas-kit-styling';
import {
  gridIcon,
  listDetailIcon,
  listViewIcon,
  pieChartIcon,
} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const firstLabelStyles = createStyles({
  marginBlockStart: system.space.zero,
  fontWeight: system.fontWeight.bold,
});

const labelStyles = createStyles({
  fontWeight: system.fontWeight.bold,
});

export const Sizes = () => (
  <>
    <div>
      <BodyText size="medium" cs={firstLabelStyles}>
        Small
      </BodyText>
      <SegmentedControl size="small">
        <SegmentedControl.List aria-label="View type">
          <SegmentedControl.Item data-id="table" icon={gridIcon}>
            Table
          </SegmentedControl.Item>
          <SegmentedControl.Item data-id="list-view" icon={listViewIcon}>
            List
          </SegmentedControl.Item>
          <SegmentedControl.Item data-id="list-detail" icon={listDetailIcon}>
            Detail
          </SegmentedControl.Item>
          <SegmentedControl.Item data-id="diagrams" icon={pieChartIcon}>
            Diagram
          </SegmentedControl.Item>
        </SegmentedControl.List>
      </SegmentedControl>
    </div>
    <div>
      <BodyText size="medium" cs={labelStyles}>
        Medium
      </BodyText>
      <SegmentedControl size="medium">
        <SegmentedControl.List aria-label="View type">
          <SegmentedControl.Item data-id="table" icon={gridIcon}>
            Table
          </SegmentedControl.Item>
          <SegmentedControl.Item data-id="list-view" icon={listViewIcon}>
            List
          </SegmentedControl.Item>
          <SegmentedControl.Item data-id="list-detail" icon={listDetailIcon}>
            Detail
          </SegmentedControl.Item>
          <SegmentedControl.Item data-id="diagrams" icon={pieChartIcon}>
            Diagram
          </SegmentedControl.Item>
        </SegmentedControl.List>
      </SegmentedControl>
    </div>
    <div>
      <BodyText size="medium" cs={labelStyles}>
        Large
      </BodyText>
      <SegmentedControl size="large">
        <SegmentedControl.List aria-label="Content view type">
          <SegmentedControl.Item data-id="table" icon={gridIcon}>
            Table
          </SegmentedControl.Item>
          <SegmentedControl.Item data-id="list-view" icon={listViewIcon}>
            List
          </SegmentedControl.Item>
          <SegmentedControl.Item data-id="list-detail" icon={listDetailIcon}>
            Detail
          </SegmentedControl.Item>
          <SegmentedControl.Item data-id="diagrams" icon={pieChartIcon}>
            Diagram
          </SegmentedControl.Item>
        </SegmentedControl.List>
      </SegmentedControl>
    </div>
  </>
);
