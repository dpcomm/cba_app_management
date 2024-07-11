import BackTextInput from '@components/BackTextinput';
import React, { useEffect, useState } from 'react';
import { ButtonView, Container, PageNumber, StyledButton, StyledSelect, StyledTable, StyledTbody, StyledThead } from './View.styled';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { User } from '@type/states';
import { requestUser } from '@apis/index';


// const dummy: User[] = [
//   {
//     id: 1,
//     userId: 'courtneyscott',
//     rank: 'Private',
//     password: '6j(40Vsz(l',
//     name: 'Paige Adams',
//     group: 'Charlie',
//     phone: '(540)358-3304x197',
//     birth: '1927-05-24',
//     gender: 'Other'
//   },
//   {
//     id: 2,
//     userId: 'duane86',
//     rank: 'Sergeant',
//     password: '+iDitVzqS7',
//     name: 'David Kennedy',
//     group: 'Delta',
//     phone: '847-158-4943',
//     birth: '2002-06-11',
//     gender: 'Other'
//   },
//   {
//     id: 3,
//     userId: 'justin10',
//     rank: 'Captain',
//     password: '$0Lf6kkMgZ',
//     name: 'Jacqueline Fitzgerald',
//     group: 'Alpha',
//     phone: '700.490.6267',
//     birth: '1945-12-19',
//     gender: 'Other'
//   },
//   {
//     id: 4,
//     userId: 'daniel49',
//     rank: 'Captain',
//     password: 'D*n7Irqx5H',
//     name: 'Miguel Sandoval',
//     group: 'Echo',
//     phone: '(761)532-1549x63406',
//     birth: '1921-04-28',
//     gender: 'Other'
//   },
//   {
//     id: 5,
//     userId: 'zachary88',
//     rank: 'Captain',
//     password: '#2GoV)Epxc',
//     name: 'Christina Willis',
//     group: 'Bravo',
//     phone: '+1-338-781-8895x74240',
//     birth: '2001-01-24',
//     gender: 'Male'
//   },
//   {
//     id: 5,
//     userId: 'zachary88',
//     rank: 'Captain',
//     password: '#2GoV)Epxc',
//     name: 'Christina Willis',
//     group: 'Bravo',
//     phone: '+1-338-781-8895x74240',
//     birth: '2001-01-24',
//     gender: 'Male'
//   },
//   {
//     id: 5,
//     userId: 'zachary88',
//     rank: 'Captain',
//     password: '#2GoV)Epxc',
//     name: 'Christina Willis',
//     group: 'Bravo',
//     phone: '+1-338-781-8895x74240',
//     birth: '2001-01-24',
//     gender: 'Male'
//   },
//   {
//     id: 5,
//     userId: 'zachary88',
//     rank: 'Captain',
//     password: '#2GoV)Epxc',
//     name: 'Christina Willis',
//     group: 'Bravo',
//     phone: '+1-338-781-8895x74240',
//     birth: '2001-01-24',
//     gender: 'Male'
//   },
//   {
//     id: 5,
//     userId: 'zachary88',
//     rank: 'Captain',
//     password: '#2GoV)Epxc',
//     name: 'Christina Willis',
//     group: 'Bravo',
//     phone: '+1-338-781-8895x74240',
//     birth: '2001-01-24',
//     gender: 'Male'
//   },
//   {
//     id: 5,
//     userId: 'zachary88',
//     rank: 'Captain',
//     password: '#2GoV)Epxc',
//     name: 'Christina Willis',
//     group: 'Bravo',
//     phone: '+1-338-781-8895x74240',
//     birth: '2001-01-24',
//     gender: 'Male'
//   },
//   {
//     id: 5,
//     userId: 'zachary88',
//     rank: 'Captain',
//     password: '#2GoV)Epxc',
//     name: 'Christina Willis',
//     group: 'Bravo',
//     phone: '+1-338-781-8895x74240',
//     birth: '2001-01-24',
//     gender: 'Male'
//   },
//   {
//     id: 5,
//     userId: 'zachary88',
//     rank: 'Captain',
//     password: '#2GoV)Epxc',
//     name: 'Christina Willis',
//     group: 'Bravo',
//     phone: '+1-338-781-8895x74240',
//     birth: '2001-01-24',
//     gender: 'Male'
//   },
//   {
//     id: 5,
//     userId: 'zachary88',
//     rank: 'Captain',
//     password: '#2GoV)Epxc',
//     name: 'Christina Willis',
//     group: 'Bravo',
//     phone: '+1-338-781-8895x74240',
//     birth: '2001-01-24',
//     gender: 'Male'
//   },
// ];


const AllUser = () => {
  const [search, set_search] = useState("");
  const [data, set_data] = useState<User[]>([]);
  const [pagination, set_pagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    requestUser().then((res) => {
      set_data(res.data.user);
      console.log(res.data);
    });
  }, []);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("userId", { header: "아이디" }),
    columnHelper.accessor("name", { header: "이름" }),
    columnHelper.accessor("rank", { header: "등급" }),
    columnHelper.accessor("group", { header: "그룹" }),
    columnHelper.accessor("phone", { header: "전화번호" }),
    columnHelper.accessor("birth", {
      header: "생년월일",
      cell: info => {
        const date = new Date(info.getValue());
        return date.toISOString().split('T')[0];
      }
    }),
    columnHelper.accessor("gender", { header: "성별" }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: set_pagination,
    state: {
      pagination
    }
  });

  return (
    <Container>
      <BackTextInput placeHolder={'Search...'} getter={search} setter={set_search} />
      <StyledTable>
        <StyledThead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {
                    header.isPlaceholder
                      ? null
                    : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </StyledThead>
        <StyledTbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </StyledTbody>
      </StyledTable>
      <ButtonView>
        <StyledButton onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>{'<<'}</StyledButton>
          <StyledButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</StyledButton>
          <PageNumber>{pagination.pageIndex}</PageNumber>
          <StyledButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</StyledButton>
          <StyledButton onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>{'>>'}</StyledButton>
          <StyledSelect onChange={e => set_pagination({ ...pagination, pageSize: parseInt(e.target.value) })}>
            {[10, 20].map(pageSize => (
              <option key={pageSize} value={pageSize}>{pageSize}</option>
            ))}
          </StyledSelect>
      </ButtonView>
    </Container>
  );
};

export default AllUser;
