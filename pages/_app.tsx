import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="62366647663-573no4br5r6l08rul7es554ghpfd8fu9.apps.googleusercontent.com">
          <Component {...pageProps} />
          <Toaster />
          <ReactQueryDevtools />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
  );
}
