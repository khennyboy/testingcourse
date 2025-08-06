import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { PropsWithChildren } from "react";
import AuthProvider from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { LanguageProvider } from "./language/LanguageProvider";

const Providers = ({ children }: PropsWithChildren) => {
  
  return (
    <AuthProvider>
      <h1>Hello two</h1>
      <ReactQueryProvider>
          <CartProvider>
            <LanguageProvider language="en">
              <Theme>{children}</Theme>
            </LanguageProvider>
          </CartProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
};

export default Providers;
