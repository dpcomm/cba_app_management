import BackTextInput from '@components/BackTextinput';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BooleanCheckbox, ButtonView, Container, HeaderActions, HeaderText, HeaderView, PageNumber, StyledButton, StyledSelect, StyledTable, StyledTbody, StyledThead } from './View.styled';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { requestApplication, requestApplicationUpdate } from '@apis/index';
import { ApplicationCheck } from '@type/states';
import { isLoadingState } from '@modules/atoms';
import { useSetRecoilState } from 'recoil';

const ApplicationState = () => {
  const setIsLoading = useSetRecoilState(isLoadingState);

  const [search, set_search] = useState("");
  const [data, set_data] = useState<ApplicationCheck[]>([]);
  const [editableData, set_editableData] = useState<ApplicationCheck[]>([]);
  const [isEditMode, set_isEditMode] = useState(false);
  const [modifiedIds, set_modifiedIds] = useState<Set<number>>(new Set());
  const [isSaving, set_isSaving] = useState(false);
  const [pagination, set_pagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    requestApplication()
      .then((res) => {
        const payload = res?.data?.data ?? res?.data ?? res;
        const list = payload?.application ?? [];
        set_data(list);
        set_editableData(list.map((item) => ({ ...item })));
      })
      .catch((err) => {
        console.error('requestApplication error', err);
        set_data([]);
        set_editableData([]);
      });
  }, []);

  const filteredData = useMemo(() => {
    const baseData = isEditMode ? editableData : data;
    const lowercasedSearch = search.toLowerCase();
    return baseData.filter(application =>
      (application.name || '').toLowerCase().includes(lowercasedSearch)
    );
  }, [search, data, editableData, isEditMode]);

  const columnHelper = useMemo(() => createColumnHelper<ApplicationCheck>(), []);

  const displayGender = useCallback((gender?: string | null) => {
    if (!gender) return '';
    const lower = gender.toLowerCase();
    if (lower === 'female') return '여자';
    if (lower === 'male') return '남자';
    return gender;
  }, []);

  const handleCheckboxChange = useCallback((id: number, key: keyof ApplicationCheck) => {
    set_editableData((prev) => {
      const updated = prev.map((row) => row.id === id ? { ...row, [key]: !row[key] } : row);
      const original = data.find((row) => row.id === id);
      const edited = updated.find((row) => row.id === id);
      set_modifiedIds((prevIds) => {
        const next = new Set(prevIds);
        if (original && edited) {
          const hasDiff = ['isLeader', 'attended', 'feePaid'].some((field) => original[field] !== edited[field]);
          if (hasDiff) {
            next.add(id);
          } else {
            next.delete(id);
          }
        }
        return next;
      });
      return updated;
    });
  }, [data]);

  const renderBoolean = useCallback((row: ApplicationCheck, key: keyof ApplicationCheck) => {
    const checked = Boolean(row[key]);
    return (
      <BooleanCheckbox
        checked={checked}
        disabled={!isEditMode}
        onChange={() => isEditMode && handleCheckboxChange(row.id, key)}
      />
    );
  }, [handleCheckboxChange, isEditMode]);

  const columns = useMemo(() => ([
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("title", { header: "수련회 제목" }),
    columnHelper.accessor("name", { header: "이름" }),
    columnHelper.accessor("group", { header: "소그룹" }),
    columnHelper.accessor("gender", {
      header: "성별",
      cell: info => displayGender(info.getValue() as string)
    }),
    columnHelper.accessor("isLeader", {
      header: "리딩자",
      cell: info => renderBoolean(info.row.original, 'isLeader')
    }),
    columnHelper.accessor("attended", {
      header: "현장 등록 여부",
      cell: info => renderBoolean(info.row.original, 'attended')
    }),
    columnHelper.accessor("feePaid", {
      header: "회비 납부 여부",
      cell: info => renderBoolean(info.row.original, 'feePaid')
    }),
  ]), [columnHelper, renderBoolean]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => String(row.id),
    onPaginationChange: set_pagination,
    state: {
      pagination
    }
  });

  const handleToggleEditMode = () => {
    if (isEditMode) {
      set_editableData(data.map((item) => ({ ...item })));
      set_modifiedIds(new Set());
      set_isEditMode(false);
      return;
    }
    set_editableData(data.map((item) => ({ ...item })));
    set_isEditMode(true);
  };

  const handleApplyChanges = async () => {
    const originalMap = new Map(data.map((item) => [item.id, item]));
    const changes = editableData.filter((item) => {
      const original = originalMap.get(item.id);
      if (!original) return false;
      return ['isLeader', 'attended', 'feePaid'].some((field) => original[field] !== item[field]);
    });

    if (!changes.length) {
      alert("변경된 내용이 없습니다.");
      set_isEditMode(false);
      set_modifiedIds(new Set());
      return;
    }

    if (!window.confirm("수정사항을 적용하시겠습니까?")) {
      return;
    }

    set_isSaving(true);
    setIsLoading({ isLoading: true });
    try {
      for (const item of changes) {
        await requestApplicationUpdate(item.id, Boolean(item.attended), Boolean(item.feePaid), Boolean(item.isLeader));
      }
      alert("신청 정보가 업데이트되었습니다.");
      set_data(editableData.map((item) => ({ ...item })));
      set_isEditMode(false);
      set_modifiedIds(new Set());
    } catch (err) {
      console.error('requestApplicationUpdate error', err);
      alert("신청 정보를 수정하는 중 문제가 발생했습니다.");
    } finally {
      setIsLoading({ isLoading: false });
      set_isSaving(false);
    }
  };

  return (
    <Container>
      <HeaderView>
        <HeaderText>수련회 등록 현황</HeaderText>
        <BackTextInput placeHolder={'Search...'} getter={search} setter={set_search} />
        <HeaderActions>
          {isEditMode ? (
            <>
              <StyledButton onClick={handleApplyChanges} disabled={isSaving}>완료</StyledButton>
              <StyledButton onClick={handleToggleEditMode} disabled={isSaving}>취소</StyledButton>
            </>
          ) : (
            <StyledButton onClick={handleToggleEditMode}>편집 모드</StyledButton>
          )}
        </HeaderActions>
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
            <tr key={row.id} style={isEditMode && modifiedIds.has(row.original.id) ? { backgroundColor: '#fff8eb' } : undefined}>
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

export default ApplicationState;
