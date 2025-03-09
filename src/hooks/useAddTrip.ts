import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTrip } from "../api/apiService";

const useAddTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["remainHours"] });
    },
  });
};

export default useAddTrip;
