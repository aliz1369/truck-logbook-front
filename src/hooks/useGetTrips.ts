import { useQuery } from "@tanstack/react-query";
import { getTrips } from "../api/apiService";
import { Trip } from "../types/globalTypes";

const useGetTrips = () => {
  return useQuery<Trip[]>({
    queryKey: ["trips"],
    queryFn: getTrips,
  });
};

export default useGetTrips;
