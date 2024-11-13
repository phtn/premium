import { auth } from "@/lib/firebase/config";
import { useAuthState } from "@/utils/hooks/authState";
import { type User } from "firebase/auth";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSessionId } from "../actions";

export const AuthCtx = createContext<{ user: User | null } | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [guestId, setGuestId] = useState<string | undefined>();
  const { user } = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const setUserSession = async () => {
      if (user) {
        setCurrentUser(user);
      } else {
        if (!guestId) {
          try {
            const id = await getSessionId();
            setGuestId(`guest_${id}`);
            setCurrentUser({ uid: `guest_${id}` } as User); // Set guest user
          } catch (error) {
            console.error("Error generating guest ID:", error);
          }
        } else {
          setCurrentUser({ uid: guestId } as User);
        }
      }
    };

    return () => {
      setUserSession;
    };
  }, [user, guestId]); // Dependencies to run effect when user or guestId changes

  return (
    <AuthCtx.Provider value={{ user: currentUser }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuthCtx = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error();
  return context;
};
