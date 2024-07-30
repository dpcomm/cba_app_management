import BackTextInput from '@components/BackTextinput';
import React, { useEffect, useState } from 'react';
import { ButtonView, Container, EditPageItemView, EditPageLabel, HeaderText, HeaderView, PageNumber, StyledButton, StyledSelect, StyledTable, StyledTbody, StyledThead, TextInput } from './View.styled';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Youtube } from '@type/states';
import { requestCreateYoutube, requestYoutube } from '@apis/index';
import { IconButton } from '@components/IconButton';
import { EColor } from '@styles/color';
import Modal from '@components/Modal';

const MediaLink = () => {
  const [search, set_search] = useState("");
  const [data, set_data] = useState<Youtube[]>([]);
  const [filteredData, set_filteredData] = useState<Youtube[]>([]);
  const [pagination, set_pagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isModal, set_isModal] = useState(false);
  const [retreatId, set_retreatId] = useState(1);
  const [title, set_title] = useState("");
  const [link, set_link] = useState("");

  useEffect(() => {
    requestYoutube().then((res) => {
      set_data(res.data.youtube);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = data.filter(youtube =>
      youtube.title.toLowerCase().includes(lowercasedSearch) ||
      youtube.retreatId.includes(lowercasedSearch)
    );
    set_filteredData(filtered);
  }, [search, data]);


  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("title", { header: "제목" }),
    columnHelper.accessor("link", { header: "주소" }),
    columnHelper.accessor("retreatId", { header: "수련회 ID" }),
    columnHelper.accessor("createdAt", {
      header: "생성 날짜",
      cell: info => {
        const date = new Date(info.getValue());
        return date.toISOString().split('T')[0];
      }
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: set_pagination,
    state: {
      pagination
    }
  });

  const handleCreateLink = () => {
    requestCreateYoutube(retreatId, title, link)
    .then(() => {
      alert("링크가 생성되었습니다.");
      set_isModal(!isModal);
    }).catch((err) => {
      alert("링크 생성에 실패했습니다.");
      set_isModal(!isModal);
      console.log(err);
    });
  };

  return (
    <>
      {
        isModal && (
          <Modal
            title="유튜브 미디어링크 생성"
            footer={
              <>
                <IconButton
                  label={'링크 생성'}
                  height='36px'
                  onClick={handleCreateLink}
                />
                <IconButton
                  label={'취소'}
                  height='36px'
                  onClick={() => {
                    set_retreatId(1);
                    set_title("");
                    set_link("");
                    set_isModal(!isModal);
                  }}
                />
              </>
            }
          >
            <div>
              <EditPageItemView>
                <EditPageLabel>수련회 ID</EditPageLabel>
                <TextInput
                  placeholder="1"
                  value={retreatId}
                  onChange={(e) => set_retreatId(e.target.value)}
                />
              </EditPageItemView>
              <EditPageItemView>
                <EditPageLabel>제목</EditPageLabel>
                <TextInput
                  placeholder="실황 제목을 입력하세요."
                  value={title}
                  onChange={(e) => set_title(e.target.value)}
                />
              </EditPageItemView>
              <EditPageItemView>
                <EditPageLabel>유튜브 링크</EditPageLabel>
                <TextInput
                  placeholder="유튜브 링크를 입력하세요."
                  value={link}
                  onChange={(e) => set_link(e.target.value)}
                />
              </EditPageItemView>
            </div>
          </Modal>
        )
      }
      <Container>
        <HeaderView>
          <HeaderText>유튜브 실황 링크</HeaderText>
          <BackTextInput placeHolder={'Search...'} getter={search} setter={set_search} />
          <IconButton
            label={'링크 생성'}
            onClick={() => set_isModal(!isModal)}
            width='118px'
            height='48px'
            color={EColor.TEXT_200}
            backgroundColor={EColor.COLOR_PRIMARY_SUB1}
            borderRadius='8px'
            borderWidth='0'
          />
        </HeaderView>
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
    </>
  );
};

export default MediaLink;
