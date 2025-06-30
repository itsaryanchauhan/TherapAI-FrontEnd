import { create } from 'zustand'



interface Store {
    Hovered : null | "Right" | "Left",
    setHovered : (hovered : "Right" | "Left" | null) => void,
    minicText : string,
    setMinicText : (minicText : string) => void,
    trendText : string,
    setTrendText : (trendText : string) => void,
    tone : string,
    setTone : (tone : string) => void,
}

const useStore = create<Store>((set) => ({
    Hovered : null,
    setHovered : (hovered : "Right" | "Left" | null) => set({ Hovered : hovered }),

    minicText : "",
    setMinicText : (minicText : string) => set({ minicText : minicText }),
    trendText : "",
    setTrendText : (trendText : string) => set({ trendText : trendText }),
    tone : "",
    setTone : (tone : string) => set({ tone : tone }),



}))




export default useStore;

