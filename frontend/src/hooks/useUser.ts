import { useEffect, useState } from "react";

export type User = {
  id: string;
  username: string;
  email: string;
  role?: string;
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(parsedUser);
      } catch (error) {
        console.error("Fout bij parsen van user:", error);
        localStorage.removeItem("user");
      }
    }

    setIsLoading(false);
  }, []);

  const clearUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const saveUser = (newUser: User) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  return {
    user,
    isLoading,
    saveUser,
    clearUser,
  };
};