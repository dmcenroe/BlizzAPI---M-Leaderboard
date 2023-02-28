import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConnectedRealm, setDungeonId } from "../slices/leaderBoardSlice";
import {
  selectDungeonId,
  selectConnectedRealm,
} from "../slices/leaderBoardSlice";
import {
  selectRealms,
  selectSingleRealmSelection,
  setSingleRealmSelection,
} from "../slices/realmSlice";

export default function Filters({ dungeons }) {
  const cleanRealmList = useSelector(selectRealms);
  const singleRealmSelection = useSelector(selectSingleRealmSelection);

  const [dungeonList, setDungeonList] = useState([]);
  const [realmSearching, setRealmSearching] = useState(false);
  const [filteredRealms, setFilteredRealms] = useState([]);
  const [realmSearch, setRealmSearch] = useState("");

  const dispatch = useDispatch();

  const handleDungeonChange = (event) => {
    dispatch(setDungeonId(event.target.value));
  };

  const selectedDungeonId = useSelector(selectDungeonId);

  const setDungeons = () => {
    const dungeonArr = [];

    dungeons.current_leaderboards.forEach((dungeon) => {
      dungeonArr.push({ name: dungeon.name, id: dungeon.id });
    });
    setDungeonList(dungeonArr);
  };

  useEffect(() => {
    setDungeons();
  }, [dungeons]);

  const onClickAnywhere = (event) => {
    const realmDropDown = document.getElementById("realm-leaderboard-dropdown");

    if (event.target != realmDropDown) {
      setRealmSearching(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickAnywhere);

    return () => {
      document.removeEventListener("click", onClickAnywhere);
    };
  }, []);

  const handleRealmSearch = (event) => {
    //tells the realm drop down to show
    setRealmSearching(true);

    //filters the realms to only consist of realms that include the text user inputs
    const searchVal = event.target.value.toLowerCase();
    const filterArr = cleanRealmList.filter((realm) => {
      return realm.name.toLowerCase().includes(searchVal.toLowerCase());
    });

    //sorts, and reduces the length of the results to show user.
    //puts it in state for the component to display
    setFilteredRealms(
      filterArr
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else return 1;
        })
        .slice(0, 8)
    );

    //if user search is an exact name match, search based on the slug.
    //if it's not, search will end up sending to 404 because slug is wrong
    //this would be a user error, they need to spell the realm correctly, or click on an option from dropdown
    const match = filterArr.filter((realm) => {
      return realm.name.toLowerCase() === searchVal.toLowerCase();
    });

    if (match.length > 0) {
      setRealmSearch(match[0].slug);
    } else {
      setRealmSearch(searchVal);
    }
  };

  const handleRealmClick = (realm) => {
    const realmInput = document.getElementById("realm-leaderboard");
    realmInput.value = realm.name;
    dispatch(setConnectedRealm(realm.connectedRealmId));
    dispatch(setSingleRealmSelection(realm.id));
  };

  useEffect(() => {
    if (cleanRealmList[0]) {
      const realmSelect = document.getElementById("realm-leaderboard");
      realmSelect.value = cleanRealmList.find((realm) => {
        return realm.id === singleRealmSelection;
      }).name;
    }

    const dungeonSelect = document.getElementById("dungeon-select");
    dungeonSelect.value = selectedDungeonId;
  }, [dungeonList, cleanRealmList]);

  return (
    <div className="flex flex-row gap-8 mb-12 mt-8 justify-center">
      <div className="relative">
        <label htmlFor="realm-leaderboard"></label>
        <input
          id="realm-leaderboard"
          onChange={(event) => {
            handleRealmSearch(event);
          }}
          autoComplete="off"
          className="block w-36 lg:w-48 bg-indigo-800 text-stone-200 hover:bg-indigo-700 px-2 py-2 pr-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline truncate"
          placeholder="realm..."
        ></input>
        {realmSearching && filteredRealms.length > 0 && realmSearch > "" ? (
          <ul
            id="realm-leaderboard-dropdown"
            className="block w-36 lg:w-48 bg-indigo-800 text-stone-200 hover:bg-indigo-700 px-2 py-2 pr-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline truncate space-y-2 list-none text-left pl-2 pt-1 pb-1 mt-1 absolute"
          >
            {filteredRealms.map((realm) => {
              return (
                <li
                  onClick={() => {
                    handleRealmClick(realm);
                  }}
                  className={`hover:underline underline-offset-4 cursor-pointer `}
                >
                  {realm.name}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <select
        id="dungeon-select"
        onChange={(event) => {
          handleDungeonChange(event);
        }}
        className="block w-36 lg:w-48 bg-indigo-800 text-stone-200 hover:bg-indigo-700 px-2 py-2 pr-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline truncate"
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
