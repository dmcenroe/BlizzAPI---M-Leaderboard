import SearchBar from "./searchbar";
import Link from "next/link";

export function Navbar({ realmList }) {
  return (
    <nav className="bg-indigo-900 w-screen h-20 grid grid-cols-3 items-center pl-8 pr-8">
      <div className="text-slate-200 font-sans text-3xl font-black">Mythx</div>
      <Link
        className="text-slate-200 font-sans text-xl font-semibold text-center hover:underline underline-offset-8"
        href={"/"}
      >
        Leaderboard
      </Link>
      <SearchBar realmList={realmList} />
    </nav>
  );
}
