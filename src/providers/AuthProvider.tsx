import { Session } from '@supabase/supabase-js';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';

type AuthData = {
  session: Session | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
      }

      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log(profile);

  const value = {
    session,
    loading,
    profile,
    isAdmin: profile?.group === 'ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
