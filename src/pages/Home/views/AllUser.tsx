import BackTextInput from '@components/BackTextinput';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonView, Container, HeaderActions, HeaderText, HeaderView, PageNumber, StyledButton, StyledSelect, StyledTable, StyledTbody, StyledThead, TableInput, ToggleButton, ToggleGroup } from './View.styled';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { User } from '@type/states';
import { requestUser, updateUserInfo } from '@apis/index';
import { useSetRecoilState } from 'recoil';
import { isLoadingState } from '@modules/atoms';

const AllUser = () => {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const [search, set_search] = useState("");
  const [data, set_data] = useState<User[]>([]);
  const [editableData, set_editableData] = useState<User[]>([]);
  const [isEditMode, set_isEditMode] = useState(false);
  const [modifiedUserIds, set_modifiedUserIds] = useState<Set<string>>(new Set());
  const [isSaving, set_isSaving] = useState(false);
  const [pagination, set_pagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    requestUser().then((res) => {
      const payload = res?.data?.data ?? res?.data ?? res;
      const users = payload?.user ?? [];
      set_data(users);
      set_editableData(users.map(user => ({ ...user })));
    }).catch((err) => {
      console.error('requestUser error', err);
      set_data([]);
      set_editableData([]);
    });
  }, []);

  const filteredData = useMemo(() => {
    const baseData = isEditMode ? editableData : data;
    const lowercasedSearch = search.toLowerCase();
    return baseData.filter(user =>
      (user.name || '').toLowerCase().includes(lowercasedSearch) ||
      (user.userId || '').toLowerCase().includes(lowercasedSearch) ||
      (user.rank || '').toLowerCase().includes(lowercasedSearch) ||
      (user.group || '').toLowerCase().includes(lowercasedSearch) ||
      (user.phone || '').includes(search)
    );
  }, [search, data, editableData, isEditMode]);

  const columnHelper = useMemo(() => createColumnHelper<User>(), []);

  const formatBirthDate = useCallback((birth?: string | null) => {
    if (!birth) return '';
    const date = new Date(birth);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  }, []);

  const displayGender = useCallback((gender?: string | null) => {
    if (!gender) return '';
    const lower = gender.toLowerCase();
    if (lower === 'female') return '여자';
    if (lower === 'male') return '남자';
    return gender;
  }, []);

  const handleGenderToggle = useCallback((userId: string, value: 'male' | 'female') => {
    handleCellChange(userId, 'gender', value);
  }, [handleCellChange]);

  const editableFields: Array<keyof User> = useMemo(
    () => ['name', 'group', 'phone', 'birth', 'gender'],
    []
  );

  const handleCellChange = useCallback((userId: string, key: keyof User, value: string) => {
    set_editableData((prev) => {
      const updated = prev.map((user) => user.userId === userId ? { ...user, [key]: value } : user);
      const original = data.find((user) => user.userId === userId);
      const edited = updated.find((user) => user.userId === userId);
      set_modifiedUserIds((prevIds) => {
        const next = new Set(prevIds);
        if (original && edited) {
          const hasDiff = editableFields.some((field) => (edited[field] ?? '') !== (original[field] ?? ''));
          if (hasDiff) {
            next.add(userId);
          } else {
            next.delete(userId);
          }
        }
        return next;
      });
      return updated;
    });
  }, [data, editableFields]);

  const renderCell = useCallback((user: User, key: keyof User, type: 'text' | 'date' = 'text') => {
    if (!isEditMode || !editableFields.includes(key)) {
      if (key === 'birth') {
        return formatBirthDate(user.birth);
      }
      if (key === 'gender') {
        return displayGender(user.gender);
      }
      return user[key as keyof User];
    }
    const value =
      key === 'birth'
        ? (user.birth && user.birth.length > 10 ? formatBirthDate(user.birth) : user.birth) ?? ''
        : (user[key] as string) ?? '';
    if (key === 'gender') {
      const current = (user.gender || '').toLowerCase();
      return (
        <ToggleGroup>
          <ToggleButton
            type="button"
            $active={current === 'male'}
            onClick={() => handleGenderToggle(user.userId, 'male')}
          >
            남자
          </ToggleButton>
          <ToggleButton
            type="button"
            $active={current === 'female'}
            onClick={() => handleGenderToggle(user.userId, 'female')}
          >
            여자
          </ToggleButton>
        </ToggleGroup>
      );
    }
    return (
      <TableInput
        type={type}
        value={value ?? ''}
        onChange={(e) => handleCellChange(user.userId, key, e.target.value)}
      />
    );
  }, [displayGender, editableFields, formatBirthDate, handleCellChange, handleGenderToggle, isEditMode]);

  const columns = useMemo(() => ([
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("userId", {
      header: "아이디",
      cell: info => info.getValue()
    }),
    columnHelper.accessor("name", {
      header: "이름",
      cell: info => renderCell(info.row.original, 'name')
    }),
    columnHelper.accessor("rank", {
      header: "등급",
      cell: info => info.getValue()
    }),
    columnHelper.accessor("group", {
      header: "그룹",
      cell: info => renderCell(info.row.original, 'group')
    }),
    columnHelper.accessor("phone", {
      header: "전화번호",
      cell: info => renderCell(info.row.original, 'phone')
    }),
    columnHelper.accessor("birth", {
      header: "생년월일",
      cell: info => renderCell(info.row.original, 'birth', 'date')
    }),
    columnHelper.accessor("gender", {
      header: "성별",
      cell: info => renderCell(info.row.original, 'gender')
    }),
  ]), [columnHelper, renderCell]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.userId || String(row.id),
    onPaginationChange: set_pagination,
    state: {
      pagination
    }
  });

  const handleToggleEditMode = () => {
    if (isEditMode) {
      set_editableData(data.map((user) => ({ ...user })));
      set_modifiedUserIds(new Set());
      set_isEditMode(false);
      return;
    }
    set_editableData(data.map((user) => ({ ...user })));
    set_isEditMode(true);
  };

  const handleApplyChanges = async () => {
    const originalMap = new Map(data.map((user) => [user.userId, user]));
    const changes = editableData.filter((user) => {
      const original = originalMap.get(user.userId);
      if (!original) return false;
      return editableFields.some((field) => (user[field] ?? '') !== (original[field] ?? ''));
    });

    if (!changes.length) {
      alert("변경된 내용이 없습니다.");
      set_isEditMode(false);
      set_modifiedUserIds(new Set());
      return;
    }

    set_isSaving(true);
    setIsLoading({ isLoading: true });
    try {
      for (const user of changes) {
        const birthValue = user.birth;
        await updateUserInfo(
          user.userId,
          user.name,
          user.gender,
          user.phone,
          user.group,
          birthValue
        );
      }
      alert("사용자 정보가 업데이트되었습니다.");
      set_data(editableData.map((user) => ({ ...user })));
      set_isEditMode(false);
      set_modifiedUserIds(new Set());
    } catch (err) {
      console.error('updateUserInfo error', err);
      alert("사용자 정보를 수정하는 중 문제가 발생했습니다.");
    } finally {
      setIsLoading({ isLoading: false });
      set_isSaving(false);
    }
  };

  const isRowModified = (userId: string) => modifiedUserIds.has(userId);

  return (
    <Container>
      <HeaderView>
        <HeaderText>전체 계정 정보</HeaderText>
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
            <tr key={row.id} style={isEditMode && isRowModified(row.original.userId) ? { backgroundColor: '#fff8eb' } : undefined}>
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
