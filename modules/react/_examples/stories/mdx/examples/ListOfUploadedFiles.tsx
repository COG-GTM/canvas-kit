import {DeleteButton} from '@workday/canvas-kit-react/button';
import {Heading, Text} from '@workday/canvas-kit-react/text';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';
import {createStyles} from '@workday/canvas-kit-styling';
import {trashIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const files = ['Cover Letter.docx', 'Resume.docx', 'Portfolio.pptx', 'Portrait.png'];

const containerStyles = createStyles({
  display: 'flex',
  gap: system.gap.md,
  flexDirection: 'column',
});

const listStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  width: '35rem',
});

const deleteBtnStyle = createStyles({
  marginInlineStart: 'auto',
});

export const ListOfUploadedFiles = () => {
  return (
    <>
      <Heading size="medium">Uploaded Files:</Heading>
      <ul className={containerStyles}>
        {files.map(i => (
          <li className={listStyles}>
            <Text>{i}</Text>
            <Tooltip type="description" title={i}>
              <DeleteButton icon={trashIcon} cs={deleteBtnStyle}>
                Delete
              </DeleteButton>
            </Tooltip>
          </li>
        ))}
      </ul>
    </>
  );
};
