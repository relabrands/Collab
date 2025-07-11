import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { supabase } from './integrations/supabase/client';
import { AuthProvider } from './hooks/useAuth';

supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    localStorage.setItem("supabase.auth.token", JSON.stringify(session)); // ⬅️ guarda explícitamente
  }

  createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
});
