
const PreferenceButton = ({ option, isActive, onClick }: { option: string, isActive: boolean, onClick: (option: string) => void }) => {
  return (
    <button onClick={() => onClick(option)}
        className={`py-1 md:py-2 px-3 md:px-5 text-sm border border-zinc-300 rounded-2xl ${isActive? "bg-[#202223] border-none text-white" : undefined}`}>
            {option}
    </button>
  )
}

export default PreferenceButton