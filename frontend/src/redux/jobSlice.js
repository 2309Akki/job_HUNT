import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
       searchJobByText:"",
       allAppliedJobs:[],
       searchedQuery:""
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSingleJobs:(state,action)=>{
            state.singleJob=action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload;
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload;
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload;
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery=action.payload;
        }
    }
});
export const {setAllJobs,setSingleJobs, setSearchedQuery,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs}=jobSlice.actions;
export default jobSlice.reducer;