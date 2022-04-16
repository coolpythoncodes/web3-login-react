import React, { useEffect } from "react";
import Web3 from "web3";
import Button from "./component/input/button";
import Login from "./component/login";
import { useStoreContext } from "./store/store";
import { initialState } from "./utils/helpers/store/store.helpers";


const App = () => {
  const web3 = new Web3(window.ethereum)

  const { isConnected, balance, account, setStore } = useStoreContext()

  // @ts-ignore
  const logOut = () => setStore(initialState)

  if (!isConnected) {
    return <Login />

  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function listenWallet() {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", async (accounts: string[]) => {
          window.location.reload();
          // if (accounts.length > 0) {
          accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            console.log(accounts[0])
            const balance = await web3.eth.getBalance(accounts[0])
              .then((balance: string) => web3.utils.fromWei(balance, "ether"))
            // @ts-ignore
            setStore({
              isConnected: true,
              account: accounts[0],
              balance,
            })
          } else {
            // @ts-ignore
            setStore(initialState)
          }



        })
      }
    }

    listenWallet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="h-screen grid place-items-center bg-[#182e48]">
      <div className="flex items-center flex-col">
        <h2 className="text-6xl text-[#21bf96]">Wallet Connected! 🤝</h2>
        <h3 className="text-white mt-4 text-center">
          ETH Wallet Address:
          <span className="block rounded-[19px] p-2 mt-4 text-[#feba35] bg-black">{account}</span>
        </h3>
        <h3 className="text-white mt-4 mb-10 text-center">ETH Balance: <span className="block rounded-[19px] p-2 mt-4 text-[#feba35] bg-black">{balance}</span></h3>
        <Button title="🔐 Log out" className="bg-[#cc0000]" handleClick={logOut} />
      </div>
    </section >
  )
}

export default App;
