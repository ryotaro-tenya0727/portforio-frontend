import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/queryClient';
import { AuthGuardProvider } from './providers/AuthGuard';
import { Routers } from './route/Routers';

import { DefaultLayout } from './components/Layout';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuardProvider>
        <DefaultLayout>
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
        </DefaultLayout>
      </AuthGuardProvider>
    </QueryClientProvider>
  );
}

export default App;
