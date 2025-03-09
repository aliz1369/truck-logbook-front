import { useQuery } from "@tanstack/react-query";
import { getDriverRemainHour } from "../api/apiService";
import { RemainingHour } from "../types/globalTypes";

const useGetRemainHours = (id: number) => {
  return useQuery<RemainingHour>({
    queryKey: ["remainHours"],
    queryFn: () => getDriverRemainHour(id),
    enabled: id !== 0,
  });
};
export default useGetRemainHours;
