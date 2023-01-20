import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConnectedRealm, setDungeonId } from "../slices/leaderBoardSlice";
import {
  selectDungeonId,
  selectConnectedRealm,
} from "../slices/leaderBoardSlice";

export default function Filters({ dungeons, realms }) {
  const [realmList, setRealmList] = useState([]);
  const [dungeonList, setDungeonList] = useState([]);

  const dispatch = useDispatch();

  const handleDungeonChange = (event) => {
    dispatch(setDungeonId(event.target.value));
  };

  const handleRealmChange = (event) => {
    dispatch(setConnectedRealm(event.target.value));
  };

  const selectedRealmId = useSelector(selectConnectedRealm);
  const selectedDungeonId = useSelector(selectDungeonId);

  const setDungeons = () => {
    const dungeonArr = [];

    dungeons.current_leaderboards.forEach((dungeon) => {
      dungeonArr.push({ name: dungeon.name, id: dungeon.id });
    });
    setDungeonList(dungeonArr);
  };

  const setRealms = () => {
    const connectedRealmArr = [];

    realms.results.forEach((realmGroup) => {
      connectedRealmArr.push({
        id: realmGroup.data.id,
        realms: realmGroup.data.realms,
      });
    });
    setRealmList(connectedRealmArr);
  };

  useEffect(() => {
    setDungeons();
    setRealms();
  }, [dungeons, realms]);

  useEffect(() => {
    const realmSelect = document.getElementById("realm-select");
    realmSelect.value = selectedRealmId;

    const dungeonSelect = document.getElementById("dungeon-select");
    dungeonSelect.value = selectedDungeonId;
  }, [dungeonList, realmList]);

  return (
    <div className="flex gap-8 mb-12 justify-center">
      <select
        id="realm-select"
        onChange={(event) => {
          handleRealmChange(event);
        }}
        className="block w-48 bg-indigo-800 text-stone-200 hover:bg-indigo-700 px-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {realmList.map((connectedRealm) =>
          connectedRealm.realms.map((singleRealm) => (
            <option key={singleRealm.id} value={connectedRealm.id}>
              {singleRealm.name.en_US}
            </option>
          ))
        )}
      </select>
      <select
        id="dungeon-select"
        onChange={(event) => {
          handleDungeonChange(event);
        }}
        className="block w-48 bg-indigo-800 text-stone-200 hover:bg-indigo-700 px-2 py-2 pr-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline truncate"
      >
        {dungeonList.map((dungeon) => (
          <option key={dungeon.id} value={dungeon.id}>
            {dungeon.name}
          </option>
        ))}
      </select>
    </div>
  );
}
