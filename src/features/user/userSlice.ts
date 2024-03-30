import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { StoreState } from "../../store";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddressThunk = createAsyncThunk(
  "user/fetchAddress",
  async () => {
    const positionObj = (await getPosition()) as {
      coords: { latitude: number; longitude: number };
    };
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  },
);

export type User = {
  username: string;
  status: string;
  address: string;
  position: {
    latitude: number;
    longitude: number;
  };
  error: string;
};

const initialState: User = {
  username: "",
  status: "idle",
  address: "",
  position: {
    latitude: 0,
    longitude: 0,
  },
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAddressThunk.rejected, (state, action) => {
        state.error = action?.error?.message || "";
        state.status = "error";
      })
      .addCase(fetchAddressThunk.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

export const getUserName = (state: StoreState) => {
  return state.user.username;
};

export const getUserData = (state: StoreState) => {
  return state.user;
};
