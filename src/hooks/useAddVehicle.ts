import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVehicle } from "../api/apiService";

const useAddVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
};
export default useAddVehicle;
