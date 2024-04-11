import Link from 'next/link'

export default function Navbar() {
  return (
    <div>
      <nav className="f1 fixed z-50 flex h-16 w-full flex-row items-center justify-between bg-slate-500 px-5 font-medium text-black shadow-lg">
        <Link href="/">
          <p>Domů</p>
        </Link>
        <div className="flex flex-row space-x-8">
          <Link href="/production">
            <p>Výroba</p>
          </Link>
          <Link href="/products">
            <p>Produkty & Statusy</p>
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
