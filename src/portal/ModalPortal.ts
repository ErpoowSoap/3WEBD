import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

const modalRoot = document.getElementById('modal-root') as Element | DocumentFragment;

export function ModalPortal({ children }: { children: ReactNode }) {
    return ReactDOM.createPortal(
        children,
        modalRoot
    );
}
