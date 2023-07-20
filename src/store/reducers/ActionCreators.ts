import axios from "axios";
// import { AppDispatch } from "../store";
import { IUser } from "../../models/IUser";
// import { userSlice } from "./UserSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUsers1 = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.usersFetching())
//     const response = await axios.get<IUser>(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     dispatch(userSlice.actions.usersFetchingSuccess(response.data as any))
//   } catch (e) {
//     console.log((e as Error).message)
//     dispatch(userSlice.actions.usersFetchingError((e as Error).message))
//   }
// };

export const fetchUsers = createAsyncThunk(
  "user/fetchAll",

  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue((e as Error).message);
    }
  }
);
