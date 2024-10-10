export const GetFunctionHalls = "http://192.168.0.2:4000/api/getFunctionHalls"
export const GetBookingDateDetails = "http://192.168.0.2:4000/api/getBookingDateDetails"
export const SupervisorIdPostingBackend = "http://192.168.0.2:4000/api/postSupervisorUserId"
export const getFunctionHallsBySupervisorUserId = "http://192.168.0.2:4000/api/getFunctionHallsBySupervisorUserId"
export const PostUserDetails =  "http://192.168.0.2:4000/api/postUserDetails"
export const PostBookingDatesDetails =  "http://192.168.0.2:4000/api/postUserDetails"
export const PostUserPhoneNumber = "http://192.168.0.2:4000/api/userPhoneNumber"
export const getAllUserBookings =  "http://192.168.0.2:4000/api/getAllUserBookings"
export const postBookingDate =  "http://192.168.0.2:4000/api/postBookingDate"


// Define the base URL
export const BASE_URL = "http://192.168.0.2:4000/api/updateRequestById/";

// Create a function to generate the full URL
export const getUpdateBookingRequestUrl = (itemId) => `${BASE_URL}${itemId}`;
