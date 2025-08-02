import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "../src/providers/CartProvider";
import { Theme } from "@radix-ui/themes";
import { useState, type PropsWithChildren } from "react";

const AllProviders = ({ children }: PropsWithChildren) => {
//   const client = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false,
//       },
//     },
//   });
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Theme>{children}</Theme>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default AllProviders;
