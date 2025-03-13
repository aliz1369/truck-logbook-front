import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { addTrip } from "../api/apiService";

const useAddTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["remainHours"] });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Failed to add trip";
        console.error("Error:", errorMessage);
        toast.error(`Error: ${errorMessage}`);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    },
  });
};

export default useAddTrip;
