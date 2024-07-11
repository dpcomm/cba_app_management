import { EColor } from "@styles/color";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 18px 24px;
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
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  td {
    padding: 12px 20px;
    border-top: 1px solid #ddd;
  }
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
