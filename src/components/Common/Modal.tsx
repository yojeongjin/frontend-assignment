import { useEffect, useRef } from 'react';
import styled from 'styled-components';
// typte
import { LayoutProps } from '@/type/common';

interface ModalProps extends LayoutProps {
  onCloseModal: () => void;
}

export default function Modal({ children, onCloseModal }: ModalProps) {
  useEffect(() => {
    // 외부화면 스크롤방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalBase
      onClick={(e) => {
        e.stopPropagation();
        onCloseModal();
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <ModalInner
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {children}
      </ModalInner>
    </ModalBase>
  );
}

const ModalBase = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  z-index: 999;
`;

const ModalInner = styled.div`
  // background: #fff;
  width: 100%;
  max-width: 720px;
  border-radius: 8px;
`;
