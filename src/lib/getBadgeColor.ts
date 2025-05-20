export const getBadgeColor = (status: string) =>{
    switch(status.toLowerCase()){
        case "paid":
            return "text-green-800 bg-green-100 w-24 text-center rounded-sm py-1 px-2 w-fit text-[.7rem]"
        case "pending":
            return "text-orange-800 bg-orange-100 w-24 text-center rounded-sm py-1 px-2 w-fit text-[.7rem]"
        case "overdue":
            return "text-red-800 bg-red-100 w-24 text-center rounded-sm py-1 px-2 w-fit text-[.7rem]"
    }
}