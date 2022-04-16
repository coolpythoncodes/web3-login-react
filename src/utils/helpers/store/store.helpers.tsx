import { useEffect } from "react"

const initialState = {
	account: null,
    balance: null,
	isConnected: false,
}

const useSetPersistStore = (store:{}) => {
	useEffect(() => {
		localStorage.setItem("persist-web3-login", JSON.stringify(store))
		//eslint-disable-next-line
	}, [store])
}

const useGetPersistedStore = () =>
	JSON.parse(localStorage.getItem("persist-web3-login")!) || initialState

export { useSetPersistStore, useGetPersistedStore, initialState }