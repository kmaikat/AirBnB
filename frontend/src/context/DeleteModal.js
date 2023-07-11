import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './DeleteModal.css'
import { ModalContext } from "./Modal";

export function DeleteModal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
      <div id="delete-modal">
        <div id="delete-modal-background" onClick={onClose} />
        <div id="delete-modal-content">
          {children} 
        </div>
      </div>,
      modalNode
    );
}
