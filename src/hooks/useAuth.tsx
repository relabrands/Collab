
import { useState, useEffect, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  user_type: "restaurant" | "creator";
  province: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
  const initAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    setUser(session?.user ?? null);

    if (session) {
      localStorage.setItem("supabase.auth.token", JSON.stringify(session));
    }

    if (session?.user) {
      await fetchProfile(session.user.id);
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session) {
        localStorage.setItem("supabase.auth.token", JSON.stringify(session));
      }

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    setLoading(false);
    return () => subscription.unsubscribe();
  };

  initAuth();
}, []);


  const signOut = async () => {
  await supabase.auth.signOut();
  setUser(null);
  setSession(null);
  setProfile(null);
};


  const value = {
    user,
    session,
    profile,
    loading,
    signOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
