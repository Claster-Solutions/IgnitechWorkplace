import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  items: CreateCurrentProductionDropdownItem[]
  setSelectedItem: Dispatch<SetStateAction<CreateCurrentProductionDropdownItem | null>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
}

export interface CreateCurrentProductionDropdownItem {
  id: string
  title: string
}

export default function CreateCurrentProductionDropdown(p: Props) {
  const onProductSelected = (item: CreateCurrentProductionDropdownItem) => {
    p.setSelectedItem(item)
    p.setInputValue(item.title)
    setIsDropdownOpen(false)
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMouseInDropdown, setIsMouseInDropdown] = useState(false)

  const onInputSelected = () => {
    setIsDropdownOpen(true)
  }
  const onInputEnded = () => {
    setIsDropdownOpen(false)
  }

  const filteredProducts = p.items.filter(containsQuery)

  function containsQuery(item: CreateCurrentProductionDropdownItem) {
    return item.title.toLocaleLowerCase().includes(p.query) || item.title.toLocaleUpperCase().includes(p.query)
  }

  return (
    <div className="relative inline-block">
      <input
        onClick={onInputSelected}
        onBlur={() => {
          if (isMouseInDropdown) {
            return
          }

          onInputEnded()
        }}
        onChange={(event) => {
          p.setQuery(event.target.value)
          p.setInputValue(event.target.value)
          p.setSelectedItem(null)
        }}
        value={p.inputValue}
        className="w-full rounded bg-slate-200 p-2 text-black"
      />
      <div
        className={`absolute z-10 flex flex-col ${
          isDropdownOpen ? 'block' : 'hidden'
        } mt-2 h-[11.2rem] w-full overflow-y-auto rounded-lg bg-slate-100`}
        onMouseEnter={() => {
          setIsMouseInDropdown(true)
        }}
        onMouseLeave={() => {
          setIsMouseInDropdown(false)
        }}
      >
        {filteredProducts.map((item) => {
          return (
            <button
              key={item.id}
              onClick={() => {
                onProductSelected(item)
              }}
              className="my-2 text-black"
            >
              {item.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
