import { useQuery } from "@tanstack/react-query";
import { getDrivers } from "../api/apiService";
import { DriverType } from "../types/globalTypes";

const useGetDrivers = () => {
  return useQuery<DriverType[]>({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });
};
export default useGetDrivers;
