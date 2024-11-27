
interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Overlay = ({ children, onClick }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50 z-40" onClick={onClick}></div>
      {children}
    </div>
  )
} 