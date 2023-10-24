
import { create } from 'zustand';

interface UserStore {
    role: string;
    user: string;
    profile: string;
    setRole: (role: string) => void;
    setUser: (user: string) => void;
    setProfile: (profile: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    role: 'user',
    user: 'user test',
    profile: "profile test",
    setRole: (role) => set({ role }),
    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile })
}));

//loadOrCreateUser(email)