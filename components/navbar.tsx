import SearchBar from "./searchbar";
import Link from "next/link";
import Hamburber from "./Hamburger";

export function Navbar() {
  return (
    <nav className="bg-indigo-900 w-full lg:flex lg:justify-between lg:items-center lg:h-20 gap-2 px-4 py-4 lg:py-0 lg:px-8">
      <Hamburber />
      <div className="hidden w-full lg:grid lg:grid-cols-3">
        <div className="text-slate-200 font-sans text-3xl font-black">
          Mythx
        </div>
        <div className="grid grid-flow-col w-full">
          <Link
            className="text-slate-200 font-sans text-xl font-semibold flex items-center justify-end hover:underline underline-offset-8 pr-2 border-r"
            href={"/"}
          >
            Leaderboard
          </Link>
          <Link
            className="text-slate-200 font-sans text-xl font-semibold flex items-center justify-start hover:underline underline-offset-8 pl-2"
            href={"/stats"}
          >
            Stats
          </Link>
        </div>
        <div className="">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
