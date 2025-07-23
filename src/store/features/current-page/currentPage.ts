import { createAppSlice } from '@/store/createAppSlice'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CurrentPage {
  page: string
}

const initialState: CurrentPage = {
  page: '',
}
export const currentPage = createAppSlice({
  name: 'current-page',
  initialState,
  reducers: (create) => ({
    changePage: create.reducer((state, action: PayloadAction<string>) => {
      state.page = action.payload
    }),
  }),
  selectors: {
    selectPage: (page) => page.page,
  },
})

export const { changePage } = currentPage.actions

export const { selectPage } = currentPage.selectors
