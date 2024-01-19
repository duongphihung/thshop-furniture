'use client'

import { store, persistor } from "@/app/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loading from "../components/loading/Loading";

export function StoreProvider({ children }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading/>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}