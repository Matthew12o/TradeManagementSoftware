"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IB_API = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const baseURL = 'https://127.0.0.1:8080/v1/api';
const agent = new https_1.default.Agent({
    rejectUnauthorized: false
});
// GET Request
const getRequest = (url) => {
    const returnPromise = new Promise((resolve, rejects) => {
        axios_1.default.get(url, {
            httpsAgent: agent
        })
            .then((res) => {
            resolve(res);
        })
            .catch((err) => {
            rejects(err);
        });
    });
    return returnPromise;
};
// POST
const postRequest = (url, options = {}) => {
    const default_load = { httpsAgent: agent };
    const final_load = Object.assign(Object.assign({}, default_load), options);
    const returnPromise = new Promise((resolve, rejects) => {
        axios_1.default.post(url, final_load)
            .then((res) => {
            resolve(res);
        })
            .catch((err) => {
            rejects(err);
        });
    });
    return returnPromise;
};
//DELETE
const deleteRequest = (url) => {
    const returnPromise = new Promise((resolve, rejects) => {
        axios_1.default.delete(url, {
            httpsAgent: agent
        })
            .then((res) => {
            resolve(res);
        })
            .catch((err) => {
            rejects(err);
        });
    });
    return returnPromise;
};
class IB_API {
    constructor(PORT = 8080) {
        this.PORT = PORT;
        this.baseURL = `https://127.0.0.1:${this.PORT}/v1/api`;
        this.Session = new Session(this.baseURL);
        this.Account = new Account(this.baseURL);
        this.PnL = new PnL(this.baseURL);
        this.Trades = new Trades(this.baseURL);
    }
}
exports.IB_API = IB_API;
;
///////////////////////
// Session
///////////////////////
class Session {
    constructor(baseURL) {
        this.Validate = () => __awaiter(this, void 0, void 0, function* () {
            return yield getRequest(`${this.url}${Session.url_session_validate}`);
        });
        this.Status = () => __awaiter(this, void 0, void 0, function* () {
            return yield postRequest(`${this.url}${Session.url_session_authenticationStatus}`);
        });
        this.Reauthenticate = () => __awaiter(this, void 0, void 0, function* () {
            return yield postRequest(`${this.url}${Session.url_session_reauthenticate}`);
        });
        this.Ping = () => __awaiter(this, void 0, void 0, function* () {
            return yield postRequest(`${this.url}${Session.url_session_ping}`);
        });
        this.Logout = () => __awaiter(this, void 0, void 0, function* () {
            return yield postRequest(`${this.url}${Session.url_session_logout}`);
        });
        this.url = baseURL;
    }
}
Session.url_session_validate = `/sso/validaate`;
Session.url_session_authenticationStatus = `/iserver/auth/status`;
Session.url_session_reauthenticate = `/iserver/reauthenticate`;
Session.url_session_ping = `/tickle`;
Session.url_session_logout = `/logout`;
/////////////////////
// Account
/////////////////////
class Account {
    constructor(baseURL) {
        this.Accounts_List = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield getRequest(`${this.url}${Account.url_account_portfolio_accounts}`);
            this.calledPortfolioAccounts = true;
            return data;
        });
        this.SubAccounts = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield getRequest(`${this.url}${Account.url_account_subaccounts}`);
            this.calledPortfolioAccounts = true;
            return data;
        });
        this.SubAccounts_Larget = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield getRequest(`${this.url}${Account.url_account_subaccounts2}`);
            this.calledPortfolioAccounts = true;
            return data;
        });
        this.Account_Information = (accountID) => __awaiter(this, void 0, void 0, function* () {
            if (!(this.calledPortfolioAccounts)) {
                this.Accounts_List();
            }
            const url_account_information = `/portfolio/${accountID}/meta`;
            return yield getRequest(`${this.url}${url_account_information}`);
        });
        this.Account_Summary = (accountID) => __awaiter(this, void 0, void 0, function* () {
            if (!(this.calledPortfolioAccounts)) {
                this.Accounts_List();
            }
            const url_account_summary = `/portfolio/${accountID}/summary`;
            return yield getRequest(`${this.url}${url_account_summary}`);
        });
        this.Account_Ledget = (accountID) => __awaiter(this, void 0, void 0, function* () {
            if (!(this.calledPortfolioAccounts)) {
                this.Accounts_List();
            }
            const url_account_ledger = `/portfolio/${accountID}/ledger`;
            return yield getRequest(`${this.url}${url_account_ledger}`);
        });
        this.Accounts = () => __awaiter(this, void 0, void 0, function* () {
            return yield getRequest(`${this.url}${Account.url_accounts}`);
        });
        this.Switch = (accountID) => __awaiter(this, void 0, void 0, function* () {
            const payload = { 'acctId': accountID };
            return yield postRequest(`${this.url}${Account.url_accounts_switch}`, payload);
        });
        this.PnL = () => __awaiter(this, void 0, void 0, function* () {
            return yield getRequest(`${this.url}${Account.url_accounts_pnl}`);
        });
        this.url = baseURL;
        this.calledPortfolioAccounts = false;
    }
}
Account.url_account_portfolio_accounts = `/portfolio/accounts`;
Account.url_account_subaccounts = `/portfolio/subaccounts`;
Account.url_account_subaccounts2 = `/portfolio/subaccounts2`;
Account.url_accounts = `/iserver/accounts`;
Account.url_accounts_switch = `/iserver/account`; // POST
Account.url_accounts_pnl = `/iserver/account/pnl/partitioned`;
class PnL {
    constructor(baseURL) {
        this.PnL = () => __awaiter(this, void 0, void 0, function* () {
            return yield getRequest(`${this.url}${PnL.url_pnl}`);
        });
        this.url = baseURL;
    }
}
PnL.url_pnl = '/iserver/account/pnl/partitioned';
class Trades {
    constructor(baseURL) {
        this.Trades = () => __awaiter(this, void 0, void 0, function* () {
            return yield getRequest(`${this.url}${Trades.url_trades}`);
        });
        this.url = baseURL;
    }
}
Trades.url_trades = '/iserver/account/trades';
