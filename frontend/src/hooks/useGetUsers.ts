import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/getUsers.service"

export const useGetUsers = () => {
    const {data, isError,  isFetching} = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        staleTime: 5 * 60 * 1000,
    }) 
    return {data, isError, isFetching}
}


