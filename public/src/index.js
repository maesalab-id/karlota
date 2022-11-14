import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { router } from './Router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ClientProvider, FeathersProvider } from 'components/client';
import { MantineProvider } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LocalDBProvider } from 'components/localDB';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FeathersProvider>
      <ClientProvider>
        <LocalDBProvider>
          <QueryClientProvider client={queryClient}>
            <MantineProvider withNormalizeCSS>
              <RouterProvider router={router} />
            </MantineProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </LocalDBProvider>
      </ClientProvider>
    </FeathersProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
