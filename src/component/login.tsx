import Web3 from "web3"
import { useStoreContext } from "../store/store"
import Button from "./input/button"

const Login = () => {

    const { setStore } = useStoreContext()
    const connect = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum)
                const selectedAccount = await window.ethereum.request({ method: "eth_requestAccounts" })
                    .then((accounts: string[]) => accounts[0])
                    .catch(() => { throw Error("No account selected") })
                const balance = await web3.eth.getBalance(selectedAccount)
                    .then((balance: string) => web3.utils.fromWei(balance, "ether"))
                // @ts-ignore
                setStore({
                    isConnected: true,
                    account: selectedAccount,
                    balance,
                })
            } catch (error) {
                alert(error)
            }
        }else {
            alert("Wallet not found")
        }
    }
    return (
        <section className="h-screen grid place-items-center bg-[#182e48]">
            <div className="flex flex-col items-center">
                <Button title="🔓 Log in with Web3" className="bg-[#21bf96]" handleClick={connect} />
                <p className="my-4 w-4/5 mx-auto text-[#feba35] text-center">Ensure to have an Ethereum based wallet installed i.e MetaMask</p>
            </div>
        </section>)
}

export default Login