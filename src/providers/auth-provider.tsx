import { Session } from "@supabase/supabase-js";
import { 
    createContext,
     PropsWithChildren, 
     useContext, 
     useEffect, 
     useState } from "react";
import { supabase } from "../lib/supabase";
import { create } from "zustand";
import { email, string } from "zod/v4-mini";

type AuthData = {
        session: Session | null;
        mounting: boolean;
        user: any;
    };

    const AuthContext = createContext<AuthData>({
        session: null,
        mounting: true,
        user: null,
    });


export default function AuthProvider({children}: PropsWithChildren) {

    const [session, setSession] = useState<Session | null>(null); 

     const [user, setUser] = useState<{
    avatar_url: string;
    created_at: string | null;
    email: string;
    expo_notification_token: string | null;
    id: string;
    stripe_customer_id: string | null;
    type: string | null;
  } | null>(null);
  
    const [mounting, setMounting] = useState(true);


    


    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session); 

            // if (session) {
            //     const {} = await supabase.from('users')
            //     .select('*')
            //     .eq('id', session.user.id)
            //     .single();

            //     if (Error) {
            //         console.log('error', Error);
            //     } else {
            //         setUser(user);
            //     }
            // }

            if (session) {
  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.log('error', error.message);
  } else {
    setUser(userData); // Now this works
  }
}


            setMounting(false);
        };

        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session); 
        });
    }, []);

    return (
        <AuthContext.Provider value={{session, mounting, user }}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);