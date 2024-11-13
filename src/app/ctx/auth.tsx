import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSessionId, setSessionId } from "../actions";
import { errHandler, guid } from "@/utils/helpers";

interface AuthCtxValues {
  user: User | null;
  guestId: string | undefined;
  uid: string | undefined;
}
export const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [guestId, setGuestId] = useState<string>();
  const [user, setUser] = useState<User | null>(null);

  const authState = useCallback(() => {
    onAuthStateChanged(auth, (current) => {
      setUser(current);
    });
  }, []);

  useEffect(() => {
    authState();
  }, [authState]);

  // TODO: Must secure UID | Delete from cookie
  const createSessionCookie = useCallback(async () => {
    const sessionId = await getSessionId();
    if (!user) {
      const gid = guid();

      if (!sessionId) {
        await setSessionId(gid);
        setGuestId(gid);
      }
      setGuestId(sessionId);
    }
    if (user) {
      if (!sessionId) {
        await setSessionId(user.uid);
      }
    }
  }, [user]);

  useEffect(() => {
    createSessionCookie().catch(errHandler);
  }, [createSessionCookie]);

  const uid = useMemo(() => (user ? user.uid : guestId), [guestId, user]);

  // useEffect(() => {
  //   const setUserSession = async () => {
  //     if (user) {
  //       setCurrentUser(user);
  //     } else {
  //       if (!guestId) {
  //         try {
  //           const id = await getSessionId();
  //           setGuestId(`guest_${id}`);
  //           setCurrentUser({ uid: `guest_${id}` } as User); // Set guest user
  //         } catch (error) {
  //           console.error("Error generating guest ID:", error);
  //         }
  //       } else {
  //         setCurrentUser({ uid: guestId } as User);
  //       }
  //     }
  //   };

  //   return () => {
  //     setUserSession;
  //   };
  // }, [user, guestId]); // Dependencies to run effect when user or guestId changes

  return (
    <AuthCtx.Provider value={{ user, guestId, uid }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuthCtx = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error();
  return context;
};
