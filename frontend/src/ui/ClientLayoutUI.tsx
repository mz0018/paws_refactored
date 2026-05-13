import type { ReactNode } from 'react'

type MainLayoutUIProps = {
  children: ReactNode
  className?: string
};

export const ClientLayoutUI = ({ children, className }: MainLayoutUIProps) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};