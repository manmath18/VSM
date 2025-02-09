import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchUserProfile = async (userid)=>{
    const response=await fetch(`${BackendURL}/user/${userid}`);
    const data = await response.json()
    return (data.user)
}
export default fetchUserProfile;
