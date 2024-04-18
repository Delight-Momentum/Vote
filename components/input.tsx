export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ type, className, ...props }: InputProps): JSX.Element {
  return (
    <input
      type={type}
      className={`flex flex-1 items-center rounded-lg px-24pxr py-16pxr ${className}`}
      {...props}
    />
  )
}

export default Input
