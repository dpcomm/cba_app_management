import BackTextInput from '@components/BackTextinput';
import React, { useEffect, useState } from 'react';
import { ButtonView, Container, EditPageContainer, EditPageHeader, EditPageItemView, EditPageLabel, EditPageValue, HeaderText, HeaderView, PageNumber, StyledButton, StyledSelect, StyledTable, StyledTbody, StyledThead } from './View.styled';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { requestApplication, requestApplicationUpdate } from '@apis/index';
import { ApplicationStatusType } from '@type/states';
import { IconButton } from '@components/IconButton';
import { EColor } from '@styles/color';
import useConfirm from '@hooks/useConfirm';
import { isLoadingState } from '@modules/atoms';
import { useSetRecoilState } from 'recoil';
import RadioButton from '@components/RadioButton';

const ApplicationState = () => {
  const setIsLoading = useSetRecoilState(isLoadingState);

  const [render, set_render] = useState(0);
  const [search, set_search] = useState("");
  const [data, set_data] = useState<ApplicationStatusType[]>([]);
  const [filteredData, set_filteredData] = useState<ApplicationStatusType[]>([]);
  const [editData, set_editData] = useState<ApplicationStatusType | null>();
  const [edit_attended, set_edit_attended] = useState();
  const [edit_feePaid, set_edit_feePaid] = useState();
  const [pagination, set_pagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    requestApplication().then((res) => {
      set_data(res.data.application);
    });
  }, []);

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = data.filter(application =>
      application.name.toLowerCase().includes(lowercasedSearch) // `userId` 대신 `name`을 사용
    );
    set_filteredData(filtered);
  }, [search, data]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("name", { header: "이름" }),
    columnHelper.accessor("title", { header: "수련회 제목" }),
    columnHelper.accessor("transfer", { header: "이동 수단" }),
    columnHelper.accessor("bus", {
      header: "버스 탑승 정보",
      cell: data => {
        if (data.getValue()[0] === 0 && data.getValue()[1] === 1) return <div>본당→수련회장</div>;
        if (data.getValue()[0] === 1 && data.getValue()[1] === 0) return <div>수련회장→본당</div>;
        return <div>왕복</div>;
      }
    }),
    columnHelper.accessor("ownCar", { header: "차량번호" }),
    columnHelper.accessor("attended", {
      header: "현장 등록 여부",
      cell: data => {
        if (data.getValue() === false) return <div>미등록</div>;
        return <div>등록 완료</div>;
      }
    }),
    columnHelper.accessor("feePaid", {
      header: "회비 납부 여부",
      cell: data => {
        if (data.getValue() === false) return <div>미납</div>;
        return <div>납부 완료</div>;
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

  const handleRenderingEditPage = (data) => {
    set_editData(data);
    set_render(1);
  };

  const handleEditApplication = (isEdit: boolean) => {
    if (isEdit) {
      setIsLoading({ isLoading: true });
      const confirmEditApplication = useConfirm("수련회 신청서를 수정하시겠습니까?", async () => {
        requestApplicationUpdate(editData?.id, Boolean(edit_attended), Boolean(edit_feePaid)).then(() => {
          alert("수련회 신청서 수정이 완료되었습니다.");
          set_data(prevData =>
            prevData.map(application =>
              application.id === editData?.id
                ? { ...application, attended: Boolean(edit_attended), feePaid: Boolean(edit_feePaid) }
                : application
            )
          );
          set_filteredData(prevFilteredData =>
            prevFilteredData.map(application =>
              application.id === editData?.id
                ? { ...application, attended: Boolean(edit_attended), feePaid: Boolean(edit_feePaid) }
                : application
            )
          );
          set_render(0);
          setIsLoading({ isLoading: false });
        }).catch((err) => {
          console.log(err);
          alert("수련회 신청서 수정에 실패하였습니다..");
          setIsLoading({ isLoading: false });
        });
      }, () => null);
      confirmEditApplication();
    } else {
      set_editData(null);
      set_render(0);
    }
  };

  return (
    <Container>
      <HeaderView>
        <HeaderText>수련회 등록 현황</HeaderText>
        <BackTextInput placeHolder={'Search...'} getter={search} setter={set_search} />
        <HeaderText></HeaderText>
      </HeaderView>
      {render ?
          <EditPageContainer>
            <EditPageHeader>수련회 신청서 수정</EditPageHeader>
            <EditPageItemView>
              <EditPageLabel>이름</EditPageLabel>
              <EditPageValue>{editData?.name}</EditPageValue>
            </EditPageItemView>
            <EditPageItemView>
              <EditPageLabel>수련회 제목</EditPageLabel>
              <EditPageValue>{editData?.title}</EditPageValue>
            </EditPageItemView>
            <EditPageItemView>
              <EditPageLabel>납부 여부</EditPageLabel>
              <div>
                <RadioButton
                  items={[
                    { text: '미납', value: 0 },
                    { text: '납부', value: 1 },
                  ]}
                  initialValue={editData?.feePaid ? 1 : 0}
                  onChange={set_edit_feePaid}
                />
              </div>
            </EditPageItemView>
            <EditPageItemView>
              <EditPageLabel>현장 등록 여부</EditPageLabel>
              <div>
                <RadioButton
                  items={[
                    { text: '미등록', value: 0 },
                    { text: '등록 완료', value: 1 },
                  ]}
                  initialValue={editData?.attended ? 1 : 0}
                  onChange={set_edit_attended}
                />
              </div>
            </EditPageItemView>
            <IconButton
              label={"수정하기"}
              onClick={() => handleEditApplication(true)}
              backgroundColor={EColor.COLOR_PRIMARY_SUB1}
              borderWidth='0'
              color={EColor.TEXT_200}
              width='100%'
            />
            <IconButton
              label={"취소하기"}
              onClick={() => handleEditApplication(false)}
              backgroundColor={EColor.TEXT_400}
              borderWidth='0'
              color={EColor.TEXT_800}
              width='100%'
            />
          </EditPageContainer> :
        <>
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
                <tr key={row.id} onClick={() => handleRenderingEditPage(row.original)}>
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
        </>
      }
    </Container>
  );
};

export default ApplicationState;
