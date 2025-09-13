'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { config } from '@/lib/web3';
import '@rainbow-me/rainbowkit/styles.css';

export function Providers({ 
  children,
  session 
}: { 
  children: React.ReactNode;
  session?: any;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <SessionProvider session={session}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#81ff8a',
              accentColorForeground: '#0f172a',
              borderRadius: 'medium',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
            appInfo={{
              appName: 'Tunova',
              learnMoreUrl: 'https://tunova.io',
            }}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}