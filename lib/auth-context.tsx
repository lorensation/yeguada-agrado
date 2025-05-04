"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { supabase, signIn as supabaseSignIn } from "@/lib/supabase/client";

interface User {
  id: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error: Error | null }>;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loadUserFromSupabase() {
      try {
        setLoading(true);
        
        // Get session directly from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            role: session.user.role || "user"
          });
          setIsLoggedIn(true);
          
          // Store the session token in a cookie via our API
          await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: session.access_token })
          });
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUserFromSupabase();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            role: session.user.role || "user"
          });
          setIsLoggedIn(true);
          
          // Update session cookie when auth state changes
          await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: session.access_token })
          });
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabaseSignIn(email, password);
      
      if (error) throw error;
      
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          role: data.user.role || "user"
        });
        setIsLoggedIn(true);
        
        if (data.session) {
          // Store the session token in a cookie
          await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: data.session.access_token })
          });
        }
        
        return { success: true, error: null };
      }
      
      return { success: false, error: new Error("No se pudo iniciar sesión") };
    } catch (error) {
      console.error("Error signing in:", error);
      return { success: false, error: error as Error };
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // Clear cookie via API
      await fetch('/api/auth/session/clear', {
        method: 'POST',
      });
      
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const authContextValue: AuthContextType = {
    user,
    loading,
    isLoggedIn,
    signIn,
    setUser,
    signOut: handleSignOut
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}