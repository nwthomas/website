"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectWallet = void 0;
const React = __importStar(require("react"));
const checkIfWalletIsConnected = () => __awaiter(void 0, void 0, void 0, function* () {
    const { ethereum } = window;
    if (ethereum) {
        const accounts = yield ethereum.request({ method: "eth_accounts" });
        return accounts || [];
    }
    return [];
});
function connectToWallet() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                return {
                    error: true,
                    accounts: [],
                    message: "Please install MetaMask",
                };
            }
            const accounts = yield ethereum.request({
                method: "eth_requestAccounts",
            });
            return { error: false, accounts, message: "" };
        }
        catch (error) {
            return {
                error: true,
                accounts: [],
                message: "There was a problem connecting your accounts",
            };
        }
    });
}
function useConnectWallet() {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [currentAccount, setCurrentAccount] = React.useState("");
    const [walletAccounts, setWalletAccounts] = React.useState([]);
    const [walletErrorMessage, setWalletErrorMessage] = React.useState("");
    React.useEffect(() => {
        function handleCheckIfWalletIsConnected() {
            return __awaiter(this, void 0, void 0, function* () {
                const accounts = yield checkIfWalletIsConnected();
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                    setWalletAccounts(accounts);
                }
                setIsLoaded(true);
            });
        }
        handleCheckIfWalletIsConnected();
    }, []);
    function handleStartConnectionAttemptToWallet() {
        function handleConnectToWallet() {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield connectToWallet();
                if (!result.error && result.accounts.length) {
                    setCurrentAccount(result.accounts[0]);
                    setWalletAccounts(result.accounts);
                }
                else {
                    setWalletErrorMessage(result.message || "Your wallet could not be connected");
                }
                setIsLoaded(true);
            });
        }
        handleConnectToWallet();
    }
    return {
        accounts: walletAccounts,
        connectToWallet: handleStartConnectionAttemptToWallet,
        currentAccount,
        errorMessage: walletErrorMessage,
        isLoaded,
    };
}
exports.useConnectWallet = useConnectWallet;
//# sourceMappingURL=useConnectWallet.js.map