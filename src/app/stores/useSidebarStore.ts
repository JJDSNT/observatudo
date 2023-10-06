import { create } from 'zustand';

interface SidebarStore {
    collapsed: boolean;
    toggled: boolean;
    activePage: string;
    setCollapsed: (collapsed: boolean) => void;
    setToggled: (toggled: boolean) => void;
    setActivePage: (page: string) => void;
    handleCollapsedChange: () => void;
    handleToggleSidebar: () => void;
    handleBackdropClick: () => void;
    handleMenuItemClick: (page: string) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    collapsed: false,
    toggled: true,
    activePage: '',
    setCollapsed: (collapsed) => set({ collapsed }),
    setToggled: (toggled) => set({ toggled }),
    setActivePage: (page) => set({ activePage: page }),
    handleCollapsedChange: () => set((state) => ({ collapsed: !state.collapsed })),
    handleToggleSidebar: () => set((state) => ({ toggled: !state.toggled })),
    handleBackdropClick: () => set(() => ({ toggled: false })),
    handleMenuItemClick: (page) => {
        set({ activePage: page });
    },
}));