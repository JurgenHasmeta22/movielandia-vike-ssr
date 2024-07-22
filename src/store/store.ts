import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import AppStoreState from "~/types/IStore";

export const useStore = create<AppStoreState>()(
    devtools(
        persist(
            (set): AppStoreState => ({
                user: null,
                setUser: (data) => {
                    set({ user: data });
                },
            }),
            {
                name: "appStore-localStorage",
            },
        ),
    ),
);
