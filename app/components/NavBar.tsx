import Link from 'next/link'

export default function NavBar() {
  return (
    <div>
      <nav className="fixed z-50 flex w-full flex-row justify-between items-center bg-slate-500 shadow-lg f1 font-medium text-black h-16 px-5">
        <Link href="/">
          <p>Domů</p>
        </Link>
        <div className="flex flex-row space-x-8">
          <Link href="/production">
            <p>Výroba</p>
          </Link>
          <Link href="/products">
            <p>Produkty</p>
          </Link>
          <Link href="/users">
            <p>Uživatelé</p>
          </Link>
          <Link href="add-invoice">
            <p>Přidat fakturu</p>
          </Link>
          {/* <Link href="/history">
            <p>Historie</p>
          </Link> */}
        </div>
      </nav>
      <div className="h-16"></div>
    </div>
  )
}
