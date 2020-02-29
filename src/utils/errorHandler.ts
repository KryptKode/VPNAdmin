import { AxiosError } from "axios"
import ServerErrorWrapper from "../interfaces/ServerErrorWrapper";

export const errorHandler = (error: Error) =>{
    console.error(error);
    if(isAxiosError(error)){
        return axiosErrorHandler(error);
    }else {
        return "An error ocurred. Please try again!"
    }
}

export const axiosErrorHandler = (err: AxiosError) =>{
    if (err.response) {
        const error = err.response.data as ServerErrorWrapper
        console.error(error);
        if (error.error.statusCode === 401) {
            return "Operation could not complete. Please login again"
        } else {
            return error.error.message
        }
    }else{
        return "An error ocurred!"
    }
}

function isAxiosError(error: Error | AxiosError): error is AxiosError {
    return (error as AxiosError).response !== undefined;
}