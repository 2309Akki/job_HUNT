import { Job } from "../models/job.model.js";

export const postJob=async(req,res)=>{
    try {
        const {title,description,salary,location,experience,requirements,jobType,position,companyId}=req.body;
        const userId=req.id;
        if(!title || !description || !salary || !location || !experience || !requirements || !jobType || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        const job=await Job.create({
            title,
            description,
            salary,
            location,
            experienceLevel:experience,
            requirements,
            jobType,
            position,
            company:companyId,
            created_by:userId
        })
        return res.status(200).json({
            message:"New Job created successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllJobs=async(req,res)=>{
    try {
        const keyword=req.query.keyword ||"";
        const query={
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        const jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Jobs are",
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById=async(req,res)=>{
    
    try {
        const jobId=req.params.id;
        const job= await Job.findById(jobId).populate({
            path:"application",
        });
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        } 
        return res.status(200).json({
            message:"Jobs are",
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAdminJobs=async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId}).populate({
            path:"company",
            createdAt:-1

        });
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found ",
                success:false
            })
        }
        return res.status(200).json({
            message:"Jobs are",
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}