import type { NextPage } from "next";
import { Navbar } from "../components/navbar";
import Filters from "../components/filters";
import blizzAPI from "../utils/blizzAPI";
import {
  selectDungeonId,
  selectConnectedRealm,
  setLeaderBoardData,
} from "../slices/leaderBoardSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import specMedia from "../utils/specMedia";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";
import Loading from "../components/loading";

export async function getStaticProps() {
  console.log("static props");
  const dungeonList = await blizzAPI.query(
    "/data/wow/connected-realm/11/mythic-leaderboard/index?namespace=dynamic-us&locale=en_US"
  );
  return {
    props: {
      dungeonList,
    },
  };
}

const Stats: NextPage = ({ dungeonList }) => {
  const dispatch = useDispatch();
  const selectedRealmId = useSelector(selectConnectedRealm);
  const selectedDungeonId = useSelector(selectDungeonId);

  const [currentLeaderBoard, setCurrentLeaderBoard] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    getLeaderBoard();
  }, [selectedRealmId, selectedDungeonId]);

  useEffect(() => {
    if (currentLeaderBoard.period) {
      makeChartData();
    }
  }, [currentLeaderBoard]);

  const makeChartData = () => {
    const specData = {};
    let totalChars = 0;

    currentLeaderBoard.leading_groups.forEach((run) => {
      run.members.forEach((member) => {
        totalChars += 1;
        if (specData[member.specialization.id]) {
          specData[member.specialization.id] += 1;
        } else {
          specData[member.specialization.id] = 1;
        }
      });
    });

    let dataForChart = [];

    for (const key in specData) {
      dataForChart.push({ name: key, uv: (specData[key] / totalChars) * 100 });
    }

    setChartData(dataForChart);
  };

  const CustomIcon = ({ x, y, text }) => {
    return (
      <foreignObject x={x - 6} y={y - 8} width={12} height={12}>
        <img className="rounded-md" src={`${specMedia[text]}`}></img>
      </foreignObject>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="p-12">
        <div className="text-5xl font-sans text-stone-200 font-extrabold text-center mb-20">
          Specialization Popularity
        </div>
        <Filters dungeons={dungeonList} />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="text-xl font-sans text-stone-200 font-light text-center mt-24 -mb-12">
              % Mythic+ Spec Frequency
            </div>
            <VictoryChart domainPadding={20} width={650}>
              <VictoryBar
                style={{ data: { fill: "#3730A3" } }}
                data={chartData}
                barWidth={8}
                animate={{
                  duration: 1000,
                  onLoad: { duration: 0 },
                }}
                x="name"
                y="uv"
                labels={({ datum }) => `${datum.uv.toFixed(1)}`}
                labelComponent={
                  <VictoryLabel style={[{ fill: "white", fontSize: 8 }]} />
                }
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onMouseEnter: () => {
                        return [
                          {
                            target: "data",
                            mutation: (props) => {
                              const fill = props.style && props.style.fill;
                              return fill === "#4338CA"
                                ? null
                                : { style: { fill: "#4338CA" } };
                            },
                          },
                        ];
                      },
                      onMouseLeave: () => {
                        return [
                          {
                            target: "data",
                            mutation: (props) => {
                              const fill = props.style && props.style.fill;
                              return fill === "#3730A3"
                                ? null
                                : { style: { fill: "#3730A3" } };
                            },
                          },
                        ];
                      },
                    },
                  },
                ]}
              />
              <VictoryAxis tickLabelComponent={<CustomIcon />} />
            </VictoryChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
