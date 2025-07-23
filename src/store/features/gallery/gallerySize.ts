import { createAppSlice } from '@/store/createAppSlice'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GallerySize {
  height: number
  width: number
}

const initialState: GallerySize = {
  height: 0,
  width: 0,
}
export const gallerySize = createAppSlice({
  name: 'gallery size',
  initialState,
  reducers: (create) => ({
    changeGallerySize: create.reducer((state, action: PayloadAction<{ height: number; width: number }>) => {
      state.height = action.payload.height
      state.width = action.payload.width
    }),
  }),
  selectors: {
    selectGallerySize: (state) => state,
  },
})

export const { changeGallerySize } = gallerySize.actions

export const { selectGallerySize } = gallerySize.selectors
