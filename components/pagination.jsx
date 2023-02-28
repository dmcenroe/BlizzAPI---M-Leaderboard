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
      <table className="w-3/4 border-collapse m-auto">
        <thead>
          <tr className="flex mb-1 gap-4 text-stone-100">
            <th className=" w-2/12 font-light" scope="col">
              Rank
            </th>
            <th className="w-5/12 font-light" scope="col">
              Keystone Level
            </th>
            <th className="w-3/12 font-light" scope="col">
              Time
            </th>
            <th className="w-5/12 text-start font-light" scope="col">
              Party
            </th>
            <th className="w-5/12 text-start" scope="col"></th>
            <th className="w-5/12 text-start" scope="col"></th>
            <th className="w-5/12 text-start" scope="col"></th>
            <th className="w-5/12 text-start" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((group) => (
            <tr
              className="h-10 items-center flex bg-gray mb-2 gap-4 font-light cursor-pointer hover:bg-slate-700 bg-slate-800 rounded-sm text-indigo-200"
              key={group.ranking}
            >
              <td className="w-2/12 text-center">{group.ranking}</td>
              <td className="w-5/12 text-center">{group.keystone_level}</td>
              <td className="w-3/12">{msToTime(group.duration)}</td>

              {group.members.map((member) => (
                <td className="flex w-5/12 gap-1" key={member.profile.id}>
                  <img
                    className="w-5 h-5"
                    src={specMedia[member.specialization.id]}
                  ></img>
                  <Link
                    className=" hover:underline underline-offset-4 hover:text-white"
                    href={`/character/${
                      member.profile.realm.slug
                    }/${member.profile.name.toLowerCase()}`}
                  >
                    {member.profile.name}
                  </Link>
                </td>
              ))}
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
                } px-3 py-2 leading-tight  border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white`}
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
