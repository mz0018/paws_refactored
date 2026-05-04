import React from 'react'

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  closeOnBackdrop?: boolean
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  className = '',
  closeOnBackdrop = true,
  ...props
}: ModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        {...props}
        className={`bg-white rounded-md p-4 ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  )
}