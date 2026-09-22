import React from 'react';

import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {Dialog} from '@workday/canvas-kit-react/dialog';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {
  Pagination,
  getLastPage,
  getVisibleResultsMax,
  getVisibleResultsMin,
} from '@workday/canvas-kit-react/pagination';
import {Select} from '@workday/canvas-kit-react/select';
import {Table} from '@workday/canvas-kit-react/table';
import {Text} from '@workday/canvas-kit-react/text';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

interface Employee {
  name: string;
  title: string;
  department: string;
  location: string;
  email: string;
  manager: string;
}

const employees: Employee[] = [
  {
    name: 'Aisha Khan',
    title: 'Staff Engineer',
    department: 'Engineering',
    location: 'Seattle, WA',
    email: 'aisha.khan@example.com',
    manager: 'Priya Raman',
  },
  {
    name: 'Ben Ortiz',
    title: 'Product Designer',
    department: 'Design',
    location: 'Austin, TX',
    email: 'ben.ortiz@example.com',
    manager: 'Nina Alvarez',
  },
  {
    name: 'Chen Wei',
    title: 'Engineering Manager',
    department: 'Engineering',
    location: 'Dublin, IE',
    email: 'chen.wei@example.com',
    manager: 'Priya Raman',
  },
  {
    name: 'Dana Whitfield',
    title: 'Recruiter',
    department: 'People',
    location: 'Atlanta, GA',
    email: 'dana.whitfield@example.com',
    manager: 'Omar Haddad',
  },
  {
    name: 'Elena Petrova',
    title: 'Content Strategist',
    department: 'Design',
    location: 'Berlin, DE',
    email: 'elena.petrova@example.com',
    manager: 'Nina Alvarez',
  },
  {
    name: 'Farid Sadeghi',
    title: 'Software Engineer',
    department: 'Engineering',
    location: 'Toronto, ON',
    email: 'farid.sadeghi@example.com',
    manager: 'Chen Wei',
  },
  {
    name: 'Grace Nolan',
    title: 'Benefits Partner',
    department: 'People',
    location: 'Boston, MA',
    email: 'grace.nolan@example.com',
    manager: 'Omar Haddad',
  },
  {
    name: 'Hugo Martins',
    title: 'Accessibility Specialist',
    department: 'Design',
    location: 'Lisbon, PT',
    email: 'hugo.martins@example.com',
    manager: 'Nina Alvarez',
  },
  {
    name: 'Imani Brooks',
    title: 'Site Reliability Engineer',
    department: 'Engineering',
    location: 'Chicago, IL',
    email: 'imani.brooks@example.com',
    manager: 'Chen Wei',
  },
  {
    name: 'Jonas Lind',
    title: 'People Analytics Lead',
    department: 'People',
    location: 'Stockholm, SE',
    email: 'jonas.lind@example.com',
    manager: 'Omar Haddad',
  },
];

const departments = ['All departments', 'Engineering', 'Design', 'People'];
const resultsPerPage = 4;

const containerStyles = createStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: system.space.x4,
  maxWidth: '48rem',
});

const filterStyles = createStyles({
  maxWidth: '16rem',
});

const headerStyles = createStyles({
  backgroundColor: system.color.surface.default,
});

const footerStyles = createStyles({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: system.space.x2,
});

const detailListStyles = createStyles({
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  gap: `${system.space.x2} ${system.space.x4}`,
  margin: system.space.zero,
});

const detailTermStyles = createStyles({
  fontWeight: system.fontWeight.bold,
});

const detailDescriptionStyles = createStyles({
  margin: system.space.zero,
});

export const EmployeeDirectory = () => {
  const [department, setDepartment] = React.useState(departments[0]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const filtered =
    department === departments[0]
      ? employees
      : employees.filter(employee => employee.department === department);

  const totalCount = filtered.length;
  const lastPage = getLastPage(resultsPerPage, totalCount);
  const page = Math.min(currentPage, lastPage);
  const visible = filtered.slice((page - 1) * resultsPerPage, page * resultsPerPage);

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={containerStyles}>
      <FormField cs={filterStyles}>
        <FormField.Label>Department</FormField.Label>
        <FormField.Field>
          <Select items={departments} initialSelectedIds={[departments[0]]}>
            <FormField.Input as={Select.Input} onChange={handleDepartmentChange} />
            <Select.Popper>
              <Select.Card>
                <Select.List>{item => <Select.Item>{item}</Select.Item>}</Select.List>
              </Select.Card>
            </Select.Popper>
          </Select>
        </FormField.Field>
      </FormField>

      <Table>
        <Table.Caption>Employee Directory</Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.Header scope="col" cs={headerStyles}>
              Name
            </Table.Header>
            <Table.Header scope="col" cs={headerStyles}>
              Title
            </Table.Header>
            <Table.Header scope="col" cs={headerStyles}>
              Department
            </Table.Header>
            <Table.Header scope="col" cs={headerStyles}>
              Details
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {visible.map(employee => (
            <Table.Row key={employee.email}>
              <Table.Cell>{employee.name}</Table.Cell>
              <Table.Cell>{employee.title}</Table.Cell>
              <Table.Cell>{employee.department}</Table.Cell>
              <Table.Cell>
                <Dialog>
                  <Dialog.Target as={SecondaryButton} size="small">
                    View
                  </Dialog.Target>
                  <Dialog.Popper>
                    <Dialog.Card>
                      <Dialog.CloseIcon aria-label="Close" />
                      <Dialog.Heading cs={{paddingBlockStart: system.padding.md}}>
                        {employee.name}
                      </Dialog.Heading>
                      <Dialog.Body>
                        <dl className={detailListStyles}>
                          <Text as="dt" cs={detailTermStyles}>
                            Title
                          </Text>
                          <Text as="dd" cs={detailDescriptionStyles}>
                            {employee.title}
                          </Text>
                          <Text as="dt" cs={detailTermStyles}>
                            Department
                          </Text>
                          <Text as="dd" cs={detailDescriptionStyles}>
                            {employee.department}
                          </Text>
                          <Text as="dt" cs={detailTermStyles}>
                            Location
                          </Text>
                          <Text as="dd" cs={detailDescriptionStyles}>
                            {employee.location}
                          </Text>
                          <Text as="dt" cs={detailTermStyles}>
                            Email
                          </Text>
                          <Text as="dd" cs={detailDescriptionStyles}>
                            {employee.email}
                          </Text>
                          <Text as="dt" cs={detailTermStyles}>
                            Manager
                          </Text>
                          <Text as="dd" cs={detailDescriptionStyles}>
                            {employee.manager}
                          </Text>
                        </dl>
                      </Dialog.Body>
                      <Dialog.ButtonGroup>
                        <Dialog.CloseButton>Close</Dialog.CloseButton>
                      </Dialog.ButtonGroup>
                    </Dialog.Card>
                  </Dialog.Popper>
                </Dialog>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className={footerStyles}>
        <Pagination
          aria-label="Employee directory pagination"
          lastPage={lastPage}
          initialCurrentPage={page}
          onPageChange={setCurrentPage}
        >
          <Pagination.Controls>
            <Pagination.StepToPreviousButton aria-label="Previous" />
            <Pagination.PageList>
              {({state}) =>
                state.range.map(pageNumber => (
                  <Pagination.PageListItem key={pageNumber}>
                    <Pagination.PageButton
                      aria-label={`Page ${pageNumber}`}
                      pageNumber={pageNumber}
                    />
                  </Pagination.PageListItem>
                ))
              }
            </Pagination.PageList>
            <Pagination.StepToNextButton aria-label="Next" />
          </Pagination.Controls>
          <Pagination.AdditionalDetails>
            {({state}) =>
              `${getVisibleResultsMin(state.currentPage, resultsPerPage)}-${getVisibleResultsMax(
                state.currentPage,
                resultsPerPage,
                totalCount
              )} of ${totalCount} employees`
            }
          </Pagination.AdditionalDetails>
        </Pagination>
      </div>
    </div>
  );
};
