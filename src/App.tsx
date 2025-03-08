import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;
