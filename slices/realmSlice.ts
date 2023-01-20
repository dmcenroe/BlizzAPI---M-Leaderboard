import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface RealmState {
  realms: object;
}

// Define the initial state using that type
const initialState: RealmState = {
  realms: {},
};

export const realmSlice = createSlice({
  name: "realms",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRealms: (state, action: PayloadAction<object>) => {
      state.realms = action.payload;
    },
  },
});

export const { setRealms } = realmSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRealms = (state: RootState) => state.realms.realms;

export default realmSlice.reducer;
