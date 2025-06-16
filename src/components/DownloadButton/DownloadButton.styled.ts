import styled from 'styled-components';

export interface StyledButtonProps {
  $backgroundcolor?: string; // 배경색
  color?: string; // 텍스트 색상
  borderradius?: string; // 둥근 테두리
  $borderwidth?: string; // 테두리 두께
  tintcolor?: string; // 테두리 색상
  padding?: string; // 패딩
  width?: string; // 너비
  height?: string; // 높이
  hoverbackground?: string; // 호버 배경색
  hovercolor?: string; // 호버 텍스트 색상
}

export const Downloadstyle = styled.button<StyledButtonProps>`
    display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff9800; /* 기본 배경색 (주황색 계열) */
  color: white; /* 텍스트 색상 */
  border: none; /* 테두리 없음 */
  border-radius: 8px; /* 둥근 테두리 */
  padding: 10px 20px; /* 내부 여백 */
  font-size: 16px; /* 글꼴 크기 */
  cursor: pointer; /* 클릭 가능한 커서 */
  transition: background-color 0.3s ease, transform 0.2s ease; /* 전환 효과 */

  &:hover {
    background-color: #fb8c00; /* 호버 시 배경색 (더 어두운 주황색) */
    transform: scale(1.05); /* 살짝 확대 */
  }

  &:active {
    background-color: #f57c00; /* 클릭 시 배경색 (더 어두운 주황색) */
    transform: scale(0.95); /* 살짝 축소 */
  }

  &:disabled {
    background-color: #ccc; /* 비활성화 상태 배경색 */
    color: #666; /* 비활성화 상태 텍스트 색상 */
    cursor: not-allowed; /* 비활성화 상태 커서 */
  }
`;
