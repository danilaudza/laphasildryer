import { configureStore } from '@reduxjs/toolkit'
import fieldReducer from './Slices/FieldSlices'

export default configureStore({
    reducer: {
        fieldSlice: fieldReducer
    }
})