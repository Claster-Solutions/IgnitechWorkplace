export default function NavBar() {
  return (
    <div>
      <nav className="fixed z-50 flex w-full flex-row justify-between items-center bg-slate-500 shadow-lg f1 font-medium h-16 px-4">
        <p>Domů</p>
        <div className="flex flex-row">
          <p>Výroba</p>
        </div>
      </nav>
      <div className="h-16"></div>
    </div>
  )
}
