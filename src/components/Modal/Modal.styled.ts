import { EColor } from '@styles/color';
import { body2, Title3 } from '@styles/font';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${EColor.TEXT_200};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  ${Title3};
  color: ${EColor.TEXT_900};
  margin-bottom: 10px;
`;

export const Body = styled.div`
  ${body2};
  color: ${EColor.TEXT_800};
  flex: 1;
  margin-bottom: 10px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;
