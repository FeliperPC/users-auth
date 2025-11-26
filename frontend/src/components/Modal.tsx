import { createPortal } from "react-dom";

export function Modal({isOpen, onClose, children}: {isOpen:boolean, onClose:()=>void, children:React.ReactNode}){
  if(!isOpen) return null
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  )
}