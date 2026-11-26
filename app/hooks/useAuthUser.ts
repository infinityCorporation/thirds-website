import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth";
import auth from "../../firebase";

/** Tracks the signed-in Firebase user. `loading` is true until Firebase has checked. */
export function useAuthUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
    }, []);

    return { user, loading, signOut: () => firebaseSignOut(auth) };
}