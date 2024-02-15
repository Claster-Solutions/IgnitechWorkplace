import { Dispatch, SetStateAction } from 'react'

export default function EditUserInput(
  value: string,
  isDisabled: boolean,
  set: Dispatch<SetStateAction<string>>
) {
  return (
    <input
      className={`p-2 ${isDisabled ? 'bg-slate-100' : 'bg-slate-300'} rounded`}
      type="text"
      value={value}
      disabled={isDisabled}
      onChange={(event) => {
        set(event.target.value)
      }}
    />
  )
}
