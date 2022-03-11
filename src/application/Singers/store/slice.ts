import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getHotSingersRequest, getSingersRequest } from "../../../api/request";
import { RootState } from "../../../store";

type SingerState = {
  type: number;
  area: number;
  initial: string;
  loading: boolean;
  pullUpLoading: boolean;
  pullDownLoading: boolean;
  listOffset: number;
  singerList: object[];
  category: string;
};

type SingerReducer = {
  saveType: (state: SingerState, action: PayloadAction<any>) => void;
  saveArea: (state: SingerState, action: PayloadAction<any>) => void;
  saveInitial: (state: SingerState, action: PayloadAction<any>) => void;
  saveLoading: (state: SingerState, action: PayloadAction<any>) => void;
  savePullUpLoading: (state: SingerState, action: PayloadAction<any>) => void;
  savePullDownLoading: (state: SingerState, action: PayloadAction<any>) => void;
  saveListOffset: (state: SingerState, action: PayloadAction<any>) => void;
  saveSingerList: (state: SingerState, action: PayloadAction<any>) => void;
  saveCategory: (state: SingerState, action: PayloadAction<any>) => void;
};

const singerSlice = createSlice<SingerState, SingerReducer>({
  name: "singer",
  initialState: {
    category: "",
    type: -1,
    area: -1,
    initial: "",
    loading: true,
    pullUpLoading: false,
    pullDownLoading: false,
    listOffset: 0,
    singerList: [],
  },
  reducers: {
    saveType: (state, action) => {
      state.type = action.payload;
    },
    saveArea: (state, action) => {
      state.area = action.payload;
    },
    saveInitial: (state, action) => {
      state.initial = action.payload;
    },
    saveLoading: (state, action) => {
      state.loading = action.payload;
    },
    savePullUpLoading: (state, action) => {
      state.pullUpLoading = action.payload;
    },
    savePullDownLoading: (state, action) => {
      state.pullDownLoading = action.payload;
    },
    saveListOffset: (state, action) => {
      state.listOffset = action.payload;
    },
    saveSingerList: (state, action) => {
      state.singerList = action.payload;
    },
    saveCategory: (state, action) => {
      state.category = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSingersAsync.pending, (state, action) => {
        //console.log("get singer request: pending");
        state.loading = true;
        state.listOffset = 0;
      })
      .addCase(getSingersAsync.fulfilled, (state, action) => {
        //console.log("get singer request: fulfilled");
        state.singerList = action.payload;
        state.listOffset = action.payload.length;
        state.loading = false;
        state.pullDownLoading = false;
      })
      .addCase(getSingersAsync.rejected, (state, action) => {
        console.log("获取歌手分类列表失败");
        state.loading = false;
        state.pullDownLoading = false;
      })
      .addCase(getHotSingersAsync.pending, (state, action) => {
        //console.log("get hot singer request: pending");
        state.loading = true;
        state.listOffset = 0;
      })
      .addCase(getHotSingersAsync.fulfilled, (state, action) => {
        //console.log("get hot singer request: fulfilled");
        state.singerList = action.payload;
        state.listOffset = action.payload.length;
        state.loading = false;
        state.pullDownLoading = false;
      })
      .addCase(getHotSingersAsync.rejected, (state, action) => {
        console.log("获取热门歌手列表失败");
        state.loading = false;
        state.pullDownLoading = false;
      })
      .addCase(refreshHotSingersAsync.pending, (state, action) => {
        //console.log("refresh hot singer request: pending");
        state.pullUpLoading = true;
      })
      .addCase(refreshHotSingersAsync.fulfilled, (state, action) => {
        //console.log("refresh hot singer request: fulfilled");
        const data = [...state.singerList, ...action.payload];
        state.singerList = data;
        state.listOffset = data.length;
        state.pullUpLoading = false;
      })
      .addCase(refreshHotSingersAsync.rejected, (state, action) => {
        console.log("获取更多热门歌手列表失败");
        state.pullUpLoading = false;
      })
      .addCase(refreshSingersAsync.pending, (state, action) => {
        //console.log("refresh singer request: pending");
        state.pullUpLoading = true;
      })
      .addCase(refreshSingersAsync.fulfilled, (state, action) => {
        const data = [...state.singerList, ...action.payload];
        state.singerList = data;
        state.listOffset = data.length;
        state.pullUpLoading = false;
        //console.log("refresh singer request: fulfilled: ", current(state));
      })
      .addCase(refreshSingersAsync.rejected, (state, action) => {
        console.log("获取更多分类歌手列表失败");
        state.pullUpLoading = false;
      });
  },
});

export const getHotSingersAsync = createAsyncThunk<object[], void>(
  "singer/getHotSingersAsync",
  async (payload, thunkApi) => {
    const appState = thunkApi.getState() as RootState;
    //console.log("--------------getHotSingersAsync: ", appState.singer);
    const { listOffset } = appState.singer;
    const res = await getHotSingersRequest(listOffset);
    return res.artists;
  }
);

export const getSingersAsync = createAsyncThunk(
  "singer/getSingersAsync",
  async (payload, thunkApi) => {
    const appState = thunkApi.getState() as RootState;
    //console.log("--------------getSingersAsync: ", appState.singer);
    const { type, area, initial, listOffset } = appState.singer;
    const res = await getSingersRequest(type, area, initial, listOffset);
    return res.artists;
  }
);

export const refreshHotSingersAsync = createAsyncThunk<object[], void>(
  "singer/refreshHotSingersAsync",
  async (payload, thunkApi) => {
    const appState = thunkApi.getState() as RootState;
    //console.log("--------------refreshHotSingersAsync: ", appState.singer);
    const { listOffset } = appState.singer;
    const res = await getHotSingersRequest(listOffset);
    return res.artists;
  }
);

export const refreshSingersAsync = createAsyncThunk<object[], void>(
  "singer/refreshSingersAsync",
  async (payload, thunkApi) => {
    const appState = thunkApi.getState() as RootState;
    //console.log("--------------refreshSingersAsync: ", appState.singer);
    const { type, area, initial, listOffset } = appState.singer;
    const res = await getSingersRequest(type, area, initial, listOffset);
    return res.artists;
  }
);

export const {
  saveType,
  saveArea,
  saveInitial,
  saveListOffset,
  savePullDownLoading,
  savePullUpLoading,
  saveLoading,
  saveSingerList,
  saveCategory,
} = singerSlice.actions;

export default singerSlice.reducer;
