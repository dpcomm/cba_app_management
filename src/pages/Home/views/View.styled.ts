import { EColor } from "@styles/color";
import { Title3,  body1, body2 } from "@styles/font";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 18px 24px;
`;

export const HeaderView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HeaderText = styled.div`
  width: 144px;
  justify-content: center;
  ${Title3}
  color: ${EColor.TEXT_800};
  user-select: none;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

export const StyledThead = styled.thead`
  background-color: ${EColor.COLOR_PRIMARY_SUB1};
  color: white;

  th {
    padding: 15px 20px;
    text-align: left;
    font-weight: bold;
  }
`;

export const StyledTbody = styled.tbody`
  tr {
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: #eaeaea; // 호버 시 배경색 변경
    }

    &:nth-child(even) {
      background-color: #f2f2f2;
    }

    &:nth-child(even):hover {
      background-color: #eaeaea;
    }
  }

  td {
  padding: 12px 20px;
  border-top: 1px solid #ddd;
  }
`;

export const TableInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  color: ${EColor.TEXT_900};
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${EColor.COLOR_PRIMARY_SUB1};
    box-shadow: 0 0 0 2px rgba(45, 128, 246, 0.2);
    background-color: #f7fbff;
  }
`;

export const BooleanCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid ${EColor.COLOR_PRIMARY};
  background-color: #fff;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:checked {
    background-color: ${EColor.COLOR_PRIMARY};
    border-color: ${EColor.COLOR_PRIMARY};
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 6px;
    width: 4px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &:disabled {
    cursor: default;
    opacity: 1;
    box-shadow: none;
  }
`;

export const ToggleGroup = styled.div`
  display: inline-flex;
  gap: 6px;
`;

export const ToggleButton = styled.button<{ $active?: boolean }>`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid ${props => (props.$active ? EColor.COLOR_PRIMARY : EColor.TEXT_500)};
  background-color: ${props => (props.$active ? EColor.COLOR_PRIMARY_SUB2 : '#fff')};
  color: ${props => (props.$active ? EColor.TEXT_900 : EColor.TEXT_700)};
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${EColor.COLOR_PRIMARY};
    color: ${EColor.TEXT_900};
  }

  &:disabled {
    cursor: default;
    opacity: 0.8;
  }
`;

export const DownloadButtonView = styled.div`
  display: flex;
  justify-content: center; /* 버튼을 가로로 중앙 정렬 */
  align-items: center; /* 버튼을 세로로 중앙 정렬 */
  margin-top: 20px; /* 상단 간격 추가 */
  text-align: center; /* 텍스트 중앙 정렬 */
`;

export const ButtonView = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  bottom: 18px;
`;

export const PageNumber = styled.span`
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${EColor.TEXT_600};
`;

export const StyledButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  background-color: ${EColor.COLOR_PRIMARY_SUB1};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${EColor.TEXT_600}; // 조금 더 어두운 색상으로 변경
  }

  &:disabled {
    background-color: ${EColor.TEXT_500};
    cursor: not-allowed;
  }
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  background-color: white;
  color: ${EColor.COLOR_PRIMARY_SUB1};
  border: 2px solid ${EColor.COLOR_PRIMARY_SUB1};
  border-radius: 5px;
  font-size: 16px;
  margin: 0 5px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover {
    border-color: ${EColor.COLOR_PRIMARY};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    border-color: ${EColor.COLOR_PRIMARY};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
`;


export const EditPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  gap: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

export const EditPageHeader = styled.h2`
  text-align: center;
  color: ${EColor.COLOR_PRIMARY};
  margin-bottom: 20px;
  user-select: none;
`;

export const EditPageItemView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid ${EColor.COLOR_PRIMARY_SUB1};
  border-radius: 5px;
  background-color: #f9f9f9;
`;

export const EditPageLabel = styled.div`
  ${body1}
  color: ${EColor.TEXT_600};
`;

export const EditPageValue = styled.div`
  ${body1}
  color: ${EColor.TEXT_700};
`;

export const TextInput = styled.input`
  ${body2};
  width: 256px;
  height: 32px;
  padding: 10px;
  border: 1px solid ${EColor.TEXT_500};
  border-radius: 4px;
  color: ${EColor.TEXT_900};
  background-color: ${EColor.TEXT_200};

  &:focus {
    border-color: ${EColor.COLOR_PRIMARY};
    outline: none;
  }

  &::placeholder {
    color: ${EColor.TEXT_600};
  }
`;
