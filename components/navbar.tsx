import SearchBar from "./searchbar";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-indigo-900 w-full h-20 grid grid-cols-3 items-center pl-8 pr-8">
      <div className="text-slate-200 font-sans text-3xl font-black">Mythx</div>
      <div className="grid grid-flow-col w-full">
        <Link
          className="text-slate-200 font-sans text-xl font-semibold text-right hover:underline underline-offset-8 pr-2 border-r"
          href={"/"}
        >
          Leaderboard
        </Link>
        <Link
          className="text-slate-200 font-sans text-xl font-semibold text-left hover:underline underline-offset-8 pl-2"
          href={"/stats"}
        >
          Stats
        </Link>
      </div>
      <div className="">
        <SearchBar />
      </div>
    </nav>
  );
}
