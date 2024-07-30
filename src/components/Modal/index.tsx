import React from 'react';
import { Container, ModalContent, Header, Body, Footer } from './Modal.styled';

interface ModalComponentProps {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const Modal = ({ title, children, footer }: ModalComponentProps) => {
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <ModalContent>
        <Header>{title}</Header>
        <Body>{children}</Body>
        <Footer>{footer}</Footer>
      </ModalContent>
    </Container>
  );
};

export default Modal;
