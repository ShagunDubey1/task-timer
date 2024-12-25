import { create } from 'zustand';

interface TaskRoomState {
  taskRoomId: string | null;
  setTaskRoomId: (id: string) => void;
  clearTaskRoomId: () => void;
}

export const useTaskRoomStore = create<TaskRoomState>((set) => ({
  taskRoomId: null,
  setTaskRoomId: (id: string) => set({ taskRoomId: id }),
  clearTaskRoomId: () => set({ taskRoomId: null }),
}));
