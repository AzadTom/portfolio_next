import { apiBaseUrl } from "../apiBaseUrl";
import { CreateBlogDto } from "./type";


export const  postBlogs  = async (payload: CreateBlogDto) =>{
    const response = await apiBaseUrl.post("/api/v1/blogs", payload);
    if(response.data){
        return true;
    }
    return false;
}