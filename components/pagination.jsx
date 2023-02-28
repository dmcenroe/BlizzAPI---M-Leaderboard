import FadeIn from "./fadeIn";
import { msToTime } from "../utils/helperFunctions";
import Link from "next/link";
import specMedia from "../utils/specMedia";
import { useState } from "react";

export default function Pagination({ currentLeaderBoard }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(25);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = currentLeaderBoard.leading_groups.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(
    currentLeaderBoard.leading_groups.length / recordsPerPage
  );

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const handlePageClick = (num) => {
    setCurrentPage(num);
  };

  const handleNextClick = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <FadeIn delay={100} duration={800}>
      <table className="w-11/12 lg:w-10/12 border-collapse m-auto h-full">
        <thead>
          <tr className="grid grid-cols-3 lg:grid-cols-8 mb-1 text-stone-100">
            <th className=" font-light text-center" scope="col">
              Rank
            </th>
            <th className="font-light" scope="col">
              Keystone
            </th>
            <th className="hidden lg:block font-light" scope="col">
              Time
            </th>
            <th className="font-light text-center lg:text-start" scope="col">
              Party
            </th>
            <th className="hidden lg:block" scope="col"></th>
            <th className="hidden lg:block" scope="col"></th>
            <th className="hidden lg:block" scope="col"></th>
            <th className="hidden lg:block" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((group) => (
            <tr
              className="py-1 lg:py-0 lg:h-10 items-center grid grid-cols-3 lg:grid-cols-8 bg-gray mb-2 font-light cursor-pointer hover:bg-slate-700 bg-slate-800 rounded-sm text-indigo-200"
              key={group.ranking}
            >
              <td className="text-center">{group.ranking}</td>
              <td className="text-center">{group.keystone_level}</td>
              <td className="hidden lg:block text-center">
                {msToTime(group.duration)}
              </td>
              <td className="grid grid-cols-1 lg:grid-cols-5 lg:col-span-5">
                {group.members.map((member) => (
                  <div className="flex flex-row gap-2 items-center">
                    <img
                      className="w-4 h-4 lg:w-5 lg:h-5"
                      src={specMedia[member.specialization.id]}
                    ></img>
                    <Link
                      className=" hover:underline underline-offset-4 text-xs lg:text-base hover:text-white truncate"
                      href={`/character/${
                        member.profile.realm.slug
                      }/${member.profile.name.toLowerCase()}`}
                    >
                      {member.profile.name}
                    </Link>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="text-center pt-2 pb-10">
        <ul className="inline-flex items-center">
          <li
            onClick={() => {
              handlePreviousClick();
            }}
          >
            <a
              href="#"
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          {pageNumbers.map((num) => (
            <li
              key={num}
              onClick={() => {
                handlePageClick(num);
              }}
            >
              <a
                href="#"
                className={` ${
                  currentPage === num ? "bg-gray-700 text-white" : "bg-gray-800"
                } px-3 py-2 leading-tight  border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white hidden lg:block`}
              >
                {num}
              </a>
            </li>
          ))}

          <li
            onClick={() => {
              handleNextClick();
            }}
          >
            <a
              href="#"
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </FadeIn>
  );
}
