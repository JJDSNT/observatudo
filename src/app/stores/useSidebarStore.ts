import { create } from 'zustand';
export enum BreakPoint {
    MD = 'md',
    ALL = 'all',
  }

interface SidebarStore {
    collapsed: boolean;
    toggled: boolean;
    activePage: string;
    breakPoint: BreakPoint;
    setCollapsed: (collapsed: boolean) => void;
    setToggled: (toggled: boolean) => void;
    setActivePage: (page: string) => void;//deprecated
    toggleBreakPoint: () => void;
    handleCollapsedChange: () => void;
    handleToggleSidebar: () => void;
    handleBackdropClick: () => void;
//    handleMenuItemClick: (item: string | number) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    collapsed: false,
    toggled: false,
    activePage: 'dashboard',//deprecated
    breakPoint: BreakPoint.ALL,
    setCollapsed: (collapsed) => set({ collapsed }),
    setToggled: (toggled) => set({ toggled }),
    setActivePage: (page) => set({ activePage: page }), //deprecated
    toggleBreakPoint: () =>
    set((state) => ({
      breakPoint: state.breakPoint === BreakPoint.ALL ? BreakPoint.MD : BreakPoint.ALL,
    })),
    handleCollapsedChange: () => set((state) => ({ collapsed: !state.collapsed })),
    handleToggleSidebar: () => set((state) => ({ toggled: !state.toggled })),
    handleBackdropClick: () => set(() => ({ toggled: false })),
    /*handleMenuItemClick: (item) => {
        if (typeof item === 'number') {
            setEixo(item);
        } else {
            set({ activePage: item });
        }  
    },*/

}));