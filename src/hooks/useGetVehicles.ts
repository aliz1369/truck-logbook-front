import { useQuery } from "@tanstack/react-query";
import { getVehicle } from "../api/apiService";
import { Vehicle } from "../types/globalTypes";

const useGetVehicles = () => {
  return useQuery<Vehicle[]>({
    queryKey: ["vehicles"],
    queryFn: getVehicle,
  });
};
export default useGetVehicles;
