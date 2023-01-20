import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="h-screen w-screen bg-slate-900 flex">
      <div className="m-auto text-center">
        <p className="text-stone-200 text-9xl font-bold text-center mb-4">
          Sorry!
        </p>
        <p className="text-stone-200 text-2xl font-thin text-center mb-10">
          The page you were looking for was not found.
        </p>
        <Link
          className="text-xl text-stone-200 border p-3 rounded-sm font-semibold text-center hover:bg-indigo-800"
          href="/"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
