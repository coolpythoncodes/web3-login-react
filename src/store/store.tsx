import { createContext, useContext, useState } from "react"
import { useGetPersistedStore, useSetPersistStore } from "../utils/helpers/store/store.helpers"

const StoreContext = createContext(null)

type StoreContextProviderProps = {
    children: React.ReactNode
}

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {

    const [store, setStore] = useState(useGetPersistedStore())
    useSetPersistStore(store)
    return (
        <StoreContext.Provider value={{ store, setStore, ...store }}>
            {children}
        </StoreContext.Provider>

    )
}

const useStoreContext = () => useContext(StoreContext)!

export { StoreContextProvider, useStoreContext };