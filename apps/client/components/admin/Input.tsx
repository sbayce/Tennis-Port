/* eslint-disable */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  register: any,
  direction: "row" | "col"
}

const Input = ({ label, register, direction, ...props }: InputProps) => {
  return (
    <div className={`flex ${direction === "col" && 'flex-col'} gap-2 justify-between`}>
      <label className="text-lg" htmlFor={props.id || props.name}>{label}</label>
      <input {...props} {...register(props.id)} className={`focus:outline-none border-b-2 border-opacity-30 
        focus:border-b-[#202223] transition-colors duration-300`} />
    </div>
  )
}

export default Input
