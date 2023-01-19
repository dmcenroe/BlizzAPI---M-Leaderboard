import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface LeaderBoardState {
	connectedRealm: null | number;
	dungeonId: null | number;
	leaderBoardData: object;
}

// Define the initial state using that type
const initialState: LeaderBoardState = {
	connectedRealm: 4,
	dungeonId: 2,
	leaderBoardData: {},
};

export const leaderBoardSlice = createSlice({
	name: "leaderBoard",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setConnectedRealm: (state, action: PayloadAction<number>) => {
			state.connectedRealm = action.payload;
		},
		setDungeonId: (state, action: PayloadAction<number>) => {
			state.dungeonId = action.payload;
		},
		setLeaderBoardData: (state, action: PayloadAction<object>) => {
			state.leaderBoardData = action.payload;
		},
	},
});

export const { setConnectedRealm, setDungeonId, setLeaderBoardData } =
	leaderBoardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDungeonId = (state: RootState) =>
	state.leaderBoard.dungeonId;
export const selectConnectedRealm = (state: RootState) =>
	state.leaderBoard.connectedRealm;
export const selectLeaderBoardData = (state: RootState) =>
	state.leaderBoard.leaderBoardData;

export default leaderBoardSlice.reducer;
