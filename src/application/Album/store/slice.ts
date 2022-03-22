import { getAlbumDetailRequest } from "./../../../api/request";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type AlbumState = {
  currentAlbum: object;
  pullUpLoading: boolean;
  startIndex: number;
  loading: boolean;
};

type AlbumReducer = {
  saveCurrentAlbum: (state: AlbumState, action: PayloadAction<any>) => void;
  saveStartIndex: (state: AlbumState, action: PayloadAction<any>) => void;
  saveLoading: (state: AlbumState, action: PayloadAction<any>) => void;
  savePullUpLoading: (state: AlbumState, action: PayloadAction<any>) => void;
};

export interface AlbumDetailPayload {
  id: string;
}

const albumSlice = createSlice<AlbumState, AlbumReducer>({
  name: "album",
  initialState: {
    currentAlbum: {},
    pullUpLoading: false,
    loading: false,
    startIndex: 0,
  },
  reducers: {
    saveCurrentAlbum: (state, action) => {
      state.currentAlbum = action.payload;
    },
    saveLoading: (state, action) => {
      state.loading = action.payload;
    },
    savePullUpLoading: (state, action) => {
      state.pullUpLoading = action.payload;
    },
    saveStartIndex: (state, action) => {
      state.startIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumAsync.pending, (state, action) => {
        console.log("get album request: pending");
        state.loading = true;
      })
      .addCase(getAlbumAsync.fulfilled, (state, action) => {
        console.log("get album request: fulfilled");
        state.loading = false;
        state.currentAlbum = action.payload;
      })
      .addCase(getAlbumAsync.rejected, (state, action) => {
        console.log("获取album数据失败");
        state.loading = false;
      });
  },
});

export const getAlbumAsync = createAsyncThunk<object, AlbumDetailPayload>(
  "album/getAlbumAsync",
  async (payload, thunkApi) => {
    const { id } = payload;
    const res = await getAlbumDetailRequest(id);
    return res.playlist;
  }
);

export const { saveLoading, savePullUpLoading, saveStartIndex } =
  albumSlice.actions;

export default albumSlice.reducer;
