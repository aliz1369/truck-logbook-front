import { useQuery } from "@tanstack/react-query";
import { getTripsById } from "../api/apiService";
import { Trip } from "../types/globalTypes";

const useGetTripsById = (id: number) => {
  return useQuery<Trip>({
    queryKey: ["trip", id],
    queryFn: () => getTripsById(id),
    enabled: !!id,
  });
};

export default useGetTripsById;
