import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const mainInitial = {
  tgl: "",
  grup: "",
  setting: "",
  nosetting: "",
  total: null,
  krat: 0,
  sisa: null,
  keterangan: "",
  mesin: [],
};

const mainSlice = createSlice({
  name: "field",
  initialState: mainInitial,
  reducers: {
    addMesin(state, actions) {
      state.mesin.push(actions.payload);
    },
    updateField(state, action) {
      const { id, updatedInputFields } = action.payload;
      state.mesin = state.mesin.map((mesin) => {
        if (mesin.inputFields.some((field) => field.id === id)) {
          return {
            ...mesin,
            inputFields: mesin.inputFields.map((field) =>
              field.id === id ? { ...field, ...updatedInputFields } : field
            ),
          };
        }
        return mesin;
      });
    },
  },
});

export const { addMesin, updateField } = mainSlice.actions;
export default mainSlice.reducer;
