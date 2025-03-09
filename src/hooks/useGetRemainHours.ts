import { useQuery } from "@tanstack/react-query";
import { getDriverRemainHour } from "../api/apiService";
import { RemainingHour } from "../types/globalTypes";

const useGetRemainHours = (id: number, date?: Date) => {
  return useQuery<RemainingHour>({
    queryKey: ["remainHours", id, date],
    queryFn: () => getDriverRemainHour(id, date),
    enabled: id !== 0 && !!date,
  });
};
export default useGetRemainHours;
