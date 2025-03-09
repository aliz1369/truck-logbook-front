import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDriver } from "../api/apiService";

const useAddDriver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
};

export default useAddDriver;
