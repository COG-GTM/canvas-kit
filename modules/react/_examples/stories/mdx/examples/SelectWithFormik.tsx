import {useFormik} from 'formik';

import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {Select, useSelectModel} from '@workday/canvas-kit-react/select';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {cloudArrowUpIcon, cloudIcon, commentIcon, userIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

const formStyles = createStyles({
  display: 'flex',
  gap: system.gap.sm,
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const formFieldStyles = createStyles({
  alignSelf: 'stretch',
  alignItems: 'normal',
});

const selectListStyles = createStyles({
  maxHeight: px2rem(200),
});

export const customOptionsMain = [
  {
    label: 'Dessert Person by Claire Saffitz',
    serverId: 1,
    icon: commentIcon,
  },
  {
    label: 'Elements of Pizza by Ken Forkish',
    serverId: 2,
    icon: cloudIcon,
  },
  {
    label: 'Flour Water Salt Yeast by Ken Forkish',
    serverId: 3,
    icon: cloudArrowUpIcon,
  },
  {label: 'Mastering Pasta by Marc Verti', serverId: 4, icon: userIcon},
];

export const SelectWithFormik = () => {
  const formik = useFormik({
    initialValues: {
      selectedBook: '',
    },
    onSubmit: values => {
      // Send data to server
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
      }, 0);
    },
  });

  const selectModel = useSelectModel({
    items: customOptionsMain,
    getId: item => {
      return item.serverId;
    },
    getTextValue: item => item.label,
  });

  return (
    <form onSubmit={formik.handleSubmit} action=".">
      <div className={formStyles}>
        <FormField orientation="vertical" cs={formFieldStyles}>
          <Select model={selectModel}>
            <FormField.Label>Choose a book</FormField.Label>
            <FormField.Input
              as={Select.Input}
              name="selectedBook"
              onChange={event => formik.setFieldValue('selectedBook', event.currentTarget.value)}
              value={formik.values.selectedBook}
              grow
            />
            <Select.Popper>
              <Select.Card>
                <Select.List cs={selectListStyles}>
                  {item => {
                    return (
                      <Select.Item data-id={item.serverId} data-text={item.label}>
                        <Select.Item.Icon icon={item.icon} />
                        {item.label}
                      </Select.Item>
                    );
                  }}
                </Select.List>
              </Select.Card>
            </Select.Popper>
          </Select>
        </FormField>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </div>
    </form>
  );
};
