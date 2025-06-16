// DownloadButton.tsx
import React from 'react';
import { Downloadstyle } from './DownloadButton.styled';

interface DownloadButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean; // 버튼 비활성화 여부
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <Downloadstyle onClick={onClick} disabled={disabled}>
      {children}
    </Downloadstyle>
  );
};

export default DownloadButton;
