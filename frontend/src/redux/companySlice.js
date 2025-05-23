// import { createSlice } from "@reduxjs/toolkit";

// const companySlice=createSlice({
//     name:'company',
//     initialState:{
//         singleCompany:null,
//         companies:[]
//     },
//     reducers:{
//         setSingleCompany:(state,action)=>{
//             state.singleCompany=action.payload;
//         },
//         setCompanies:(state,action)=>{
//             state.companies=action.payload
//         }
//     }
// })
// // export const {setSingleCompany}= companySlice.actions;
// // export default companySlice.reducer 
// export default companySlice.reducer;
// export const{setSingleCompany,setCompanies} =companySlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText:"",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText:(state,action)=>{
        state.searchCompanyByText=action.payload;
    }
  },
});

export const { setSingleCompany, setCompanies,setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;
