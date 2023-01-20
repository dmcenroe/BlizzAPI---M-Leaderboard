import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectRealms } from "../slices/realmSlice";

export default function SearchBar() {
  const router = useRouter();

  const realmList = useSelector(selectRealms);

  const [realmSearching, setRealmSearching] = useState(false);
  const [filteredRealms, setFilteredRealms] = useState([]);
  const [cleanRealmList, setCleanRealmList] = useState([]);
  const [charSearch, setCharSearch] = useState("");
  const [realmSearch, setRealmSearch] = useState("");

  const onClickAnywhere = (event) => {
    const realmDropDown = document.getElementById("realmDropDown");

    if (event.target != realmDropDown) {
      setRealmSearching(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickAnywhere);

    return () => document.removeEventListener("click", onClickAnywhere);
  }, []);

  const setRealms = () => {
    const realmArr = [];

    const newArr = realmList.results.map((realmGroup) => {
      realmGroup.data.realms.forEach((realm) => {
        realmArr.push({
          id: realm.id,
          name: realm.name.en_US,
          slug: realm.slug,
        });
      });
    });
    return realmArr;
  };

  useEffect(() => {
    if (realmList.results) {
      setCleanRealmList(setRealms());
    }
  }, [realmList]);

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
    const realmInput = document.getElementById("realm-input");
    realmInput.value = realm.name;
    setRealmSearch(realm.slug);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/character/${realmSearch}/${charSearch}`);
  };

  return (
    <div className="text-right">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="flex justify-end"
      >
        <div className="relative">
          <label htmlFor="realm-input"></label>
          <input
            id="realm-input"
            onChange={(event) => {
              handleRealmSearch(event);
            }}
            autoComplete="off"
            className="w-36 h-9 pl-2 rounded-l-sm text-slate-900 text-sm bg-slate-300 placeholder:text-slate-500 focus:outline-0"
            placeholder="realm..."
          ></input>
          {realmSearching && filteredRealms.length > 0 && realmSearch > "" ? (
            <ul
              id="realmDropDown"
              className="w-36 h-max bg-slate-300 text-slate-900 rounded-sm space-y-2 list-none text-left text-sm font-sans font-light pl-2 pt-1 pb-1 mt-1 absolute"
            >
              {filteredRealms.map((realm) => {
                return (
                  <li
                    onClick={() => {
                      handleRealmClick(realm);
                    }}
                    className="hover:underline underline-offset-4 cursor-pointer"
                  >
                    {realm.name}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        <label htmlFor="char-input"></label>

        <input
          id="char-input"
          onChange={(event) => {
            setCharSearch(event.target.value);
          }}
          autoComplete="off"
          className="w-1/3 h-9 pl-2 text-sm bg-slate-100 placeholder:text-slate-500 focus:outline-0"
          placeholder="character..."
        ></input>

        <button type="submit" className="h-9 w-9 bg-slate-800 rounded-r-sm">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400 m-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
