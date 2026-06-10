import { create } from "zustand";

interface TerminalStore {
  pendingCommand: string | null;
  executeCommand: (cmd: string) => void;
  clearPendingCommand: () => void;
}

export const useTerminalStore = create<TerminalStore>((set) => ({
  pendingCommand: null,
  executeCommand: (cmd) => set({ pendingCommand: cmd }),
  clearPendingCommand: () => set({ pendingCommand: null }),
}));
