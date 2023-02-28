import { useRouter } from "next/router";
import blizzAPI from "../../utils/blizzAPI";
import Head from "next/head";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import FadeIn from "../../components/fadeIn";
import Loading from "../../components/loading";
import { Navbar } from "../../components/navbar";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const realm = params.slug[0];
  const char = params.slug[1];
  if (params) {
    try {
      const charData = await blizzAPI.query(
        `/profile/wow/character/${realm}/${char}/mythic-keystone-profile/season/9?namespace=profile-us&locale=en_US`
      );

      const dungeonList = await blizzAPI.query(
        "/data/wow/connected-realm/11/mythic-leaderboard/index?namespace=dynamic-us&locale=en_US"
      );

      return {
        props: {
          charData,
          dungeonList,
        },
      };
    } catch (error) {
      return { redirect: { destination: "/404", permanent: false } };
    }
  }
}

const Character = ({ charData, dungeonList }) => {
  const router = useRouter();

  const [buttonPress, setButtonPress] = useState(false);
  const [bestRuns, setBestRuns] = useState([]);

  useEffect(() => {
    if (dungeonList) {
      const dungeons = dungeonList.current_leaderboards;

      const dungeonRuns = dungeons.map((dungeon) => {
        return charData.best_runs.filter((run) => {
          return run.dungeon.name === dungeon.name;
        });
      });

      const topRuns = dungeonRuns.map((runs) => {
        if (runs.length === 0) {
          return { keystone_level: 50, complete: false };
        }

        if (runs.length === 1) {
          return runs[0];
        }

        if (runs[0].mythic_rating.rating > runs[1].mythic_rating.rating) {
          return runs[0];
        } else return runs[1];
      });

      setBestRuns(
        topRuns.sort((a, b) => {
          if (a.keystone_level < b.keystone_level) {
            return -1;
          }

          if (a.keystone_level > b.keystone_level) {
            return 1;
          }

          return 0;
        })
      );
    }
  }, [charData]);

  if (router.isFallback) {
    return (
      <div className="h-screen w-screen flex items-center bg-slate-900">
        <Loading />
      </div>
    );
  }

  return (
    <div className=" w-screen h-screen min-h-screen bg-slate-900">
      <Head>
        <title>{charData.character.name} Mythic+ Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="m-4">
        <Link href={"/"}>
          <button
            className={`${
              buttonPress && "animate-buttonPress"
            } rounded-full h-16 w-16 bg-indigo-800 flex items-center justify-center text-7xl hover:scale-110 transition duration-500 ease-in-out`}
            onClick={() => {
              setButtonPress(true);
            }}
            onAnimationEnd={() => {
              setButtonPress(false);
            }}
          >
            <ArrowLeftIcon className="5-10 w-10 text-indigo-200"></ArrowLeftIcon>
          </button>
        </Link>
      </div>
      <div className=" bg-slate-900 flex flex-col items-center pb-8">
        <div className="text-7xl font-black tracking-wider text-stone-100 font-sans m-auto w-max mb-3 lg:pt-12 pt-8">
          {charData.character.name}
        </div>
        <div className="text-l mb-20 text-stone-100 w-max m-auto bg-indigo-800 pl-3 pr-3 p-1 rounded-lg">
          Mythic Rating: {charData.mythic_rating.rating.toFixed(2)}
        </div>

        <div className="text-stone-100 text-2xl font-semibold m-auto mb-3 w-max tracking-wider">
          Season Best Mythic Dungeons
        </div>
        <FadeIn delay={100} duration={800}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {bestRuns.map((run) => (
              <div>
                {run.complete === false ? null : (
                  <div
                    key={run.dungeon.name}
                    className="flex-col text-center h-72 w-auto relative border border-slate-900 rounded-sm cursor-pointer hover:scale-105 bg-gradient-to-b from-slate-800 hover:to-indigo-900 transition duration-500 ease-in-out"
                  >
                    <div className="text-base text-indigo-200 bg-indigo-800 w-10/12 rounded-lg p-1 tracking-wide font-medium m-auto mt-3 mb-3 mb-0.25">
                      {run.dungeon.name}
                    </div>
                    <div className="text-sm text-rose-400 font-light tracking-wider">
                      {run.keystone_affixes[0].name}
                    </div>
                    <div className="text-stone-100 text-7xl font-black top-1/2 left-1/2 transform -translate-y-1/4 -translate-x-1/2 absolute">
                      {run.keystone_level}
                    </div>
                    <div className="tracking-wide text-sm font-light text-amber-300 absolute bottom-2 left-1/2 transform -translate-x-1/2">
                      {run.mythic_rating.rating.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Character;
