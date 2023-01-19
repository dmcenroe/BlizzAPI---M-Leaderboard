import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import blizzAPI from "../utils/blizzAPI";
import type { blizzApiMythicPlusLeaderBoard } from "../utils/types";
import specMedia from "../utils/specMedia";
import { useEffect, useState, useRef } from "react";
import Filters from "../components/filters";
import { setLeaderBoardData } from "../slices/leaderBoardSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDungeonId,
  selectConnectedRealm,
  selectLeaderBoardData,
} from "../slices/leaderBoardSlice";
import Loading from "../components/loading";
import { msToTime } from "../utils/helperFunctions";
import FadeIn from "../components/fadeIn";
import { createSelector } from "@reduxjs/toolkit";

// export async function getStaticProps() {
// 	console.log("static props");
// 	const mPlusData = await blizzAPI.query(
// 		"/data/wow/connected-realm/4/mythic-leaderboard/2/period/887?namespace=dynamic-us&locale=en_US"
// 	);

// 	return {
// 		props: {
// 			mPlusData,
// 		},
// 	};
// }

export async function getStaticProps() {
  console.log("static props");
  const dungeonList = await blizzAPI.query(
    "/data/wow/connected-realm/11/mythic-leaderboard/index?namespace=dynamic-us&locale=en_US"
  );
  const realmList = await blizzAPI.query(
    "/data/wow/search/connected-realm?namespace=dynamic-us&orderby=id"
  );
  return {
    props: {
      dungeonList,
      realmList,
    },
  };
}

const Home: NextPage = ({ dungeonList, realmList }) => {
  const dispatch = useDispatch();

  const initialRender = useRef(true);

  const [currentLeaderBoard, setCurrentLeaderBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedDungeonId = useSelector(selectDungeonId);
  const selectedRealmId = useSelector(selectConnectedRealm);
  const storedLeaderBoard = useSelector(selectLeaderBoardData);

  const getLeaderBoard = async () => {
    const response = await fetch(
      `/api/leaderboard/${selectedRealmId}/${selectedDungeonId}`
    );
    const data = await response.json();

    setCurrentLeaderBoard(data);
    dispatch(setLeaderBoardData(data));
    setLoading(false);
  };

  useEffect(() => {
    //not registering initial drop down change when app loads
    //trying to make it bring in stored leaderboard when I hit "back", otherwise, fetch fresh data.
    if (initialRender.current && storedLeaderBoard.name) {
      initialRender.current = false;
      setLoading(false);
      setCurrentLeaderBoard(storedLeaderBoard);
    } else {
      initialRender.current = false;
      setLoading(true);
      getLeaderBoard();
    }
  }, [selectedDungeonId, selectedRealmId]);

  return (
    <>
      <Head>
        <title>Mythic+ Leaderboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-slate-900 w-screen h-full">
        <div className="p-20 text-center">
          <div className="text-6xl font-black tracking-wider text-stone-100">
            M+ Weekly Leaderboard
          </div>
        </div>
        <Filters dungeons={dungeonList} realms={realmList} />
        {loading ? (
          <Loading />
        ) : (
          <FadeIn delay={100} duration={800}>
            <table className="w-3/4 border-collapse m-auto ">
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
                {currentLeaderBoard.leading_groups.map((group) => (
                  <tr
                    className="h-10 items-center flex bg-gray mb-2 gap-4 font-light rounded-sm cursor-pointer hover:bg-slate-700 bg-slate-800 rounded-sm text-indigo-200"
                    key={group.ranking}
                  >
                    <td className="w-2/12 text-center">{group.ranking}</td>
                    <td className="w-5/12 text-center">
                      {group.keystone_level}
                    </td>
                    <td className="w-3/12">{msToTime(group.duration)}</td>

                    {group.members.map((member) => (
                      <td className="flex w-5/12 gap-1" key={member.profile.id}>
                        <img
                          className="w-5 h-5"
                          src={specMedia[member.specialization.id]}
                        ></img>
                        <Link
                          className="hover:scale-105 hover:text-white"
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
          </FadeIn>
        )}
      </main>
    </>
  );
};

export default Home;
