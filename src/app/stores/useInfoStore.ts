import { create } from 'zustand';

interface InfoStore {
  eixoSelecionado: number | null;
  estadoSelecionado: number | null;
  cidadeSelecionada: number | null;
  setEixo: (eixo: number | null) => void;
  setEstado: (estado: number | null) => void;
  setCidade: (cidade: number | null) => void;
}

export const useInfoStore = create<InfoStore>((set) => ({
  eixoSelecionado: null,
  estadoSelecionado: null,
  cidadeSelecionada: null,
  setEixo: (eixo) => set({ eixoSelecionado: eixo }),
  setEstado: (estado) => set({ estadoSelecionado: estado }),
  setCidade: (cidade) => set({ cidadeSelecionada: cidade }),
}));
