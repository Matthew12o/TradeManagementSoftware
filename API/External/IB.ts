import { rejects } from 'assert';
import axios from 'axios';
import https from 'https';
import { type } from 'os';
import { resolve } from 'path/posix';

const baseURL = 'https://127.0.0.1:8080/v1/api';

const agent = new https.Agent({
    rejectUnauthorized: false
});

// GET Request
const getRequest = (url: string, options = {}): any => {
    const default_payload = {httpsAgent: agent};
    const final_payload = {...default_payload, ...options}
    const returnPromise = new Promise((resolve, rejects) => {
        axios.get(url, final_payload)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            rejects(err);
        });
    });
    return returnPromise
}

// POST
const postRequest = (url: string, options = {}): any => {
    const default_payload = {httpsAgent: agent};
    const final_payload = {...default_payload, ...options}
    const returnPromise = new Promise((resolve, rejects) => {
        axios.post(url, final_payload)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            rejects(err);
        });
    });
    return returnPromise
}

//DELETE
const deleteRequest = (url: string): any => {
    const returnPromise = new Promise((resolve, rejects) => {
        axios.delete(url, {
            httpsAgent: agent
        })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            rejects(err);
        });
    });
    return returnPromise
}

class IB_API {
    PORT: number ;
    private baseURL: string;
    
    // Session
    Session: Session;    
    Account: Account;
    PnL: PnL;
    Trades: Trades;

    constructor(PORT=8080) {
        this.PORT = PORT;
        this.baseURL = `https://127.0.0.1:${this.PORT}/v1/api`;
        this.Session = new Session(this.baseURL);
        this.Account = new Account(this.baseURL);
        this.PnL = new PnL(this.baseURL);
        this.Trades = new Trades(this.baseURL);

    }

    // Session


    //
};

///////////////////////
// Session
///////////////////////
class Session {
    private static url_session_validate = `/sso/validaate`;
    private static url_session_authenticationStatus = `/iserver/auth/status`;
    private static url_session_reauthenticate = `/iserver/reauthenticate`;
    private static url_session_ping = `/tickle`;
    private static url_session_logout = `/logout`;

    url: string;
    constructor(baseURL: string) {
        this.url = baseURL;
    }

    Validate = async () => {
        return await getRequest(`${this.url}${Session.url_session_validate}`);
    };

    Status = async () => {
        return await postRequest(`${this.url}${Session.url_session_authenticationStatus}`);
    };

    Reauthenticate = async () => {
        return await postRequest(`${this.url}${Session. url_session_reauthenticate}`);
    };

    Ping = async () => {
        return await postRequest(`${this.url}${Session.url_session_ping}`);
    };

    Logout = async () => {
        return await postRequest(`${this.url}${Session.url_session_logout}`);
    };

}

/////////////////////
// Account
/////////////////////

class Account {
    private static url_account_portfolio_accounts = `/portfolio/accounts`;
    private static url_account_subaccounts = `/portfolio/subaccounts`;
    private static url_account_subaccounts2 = `/portfolio/subaccounts2`;

    private static url_accounts = `/iserver/accounts`;
    private static url_accounts_switch = `/iserver/account`; // POST
    private static url_accounts_pnl = `/iserver/account/pnl/partitioned`

    url: String;
    calledPortfolioAccounts: boolean;
    constructor(baseURL: string) {
        this.url = baseURL;
        this.calledPortfolioAccounts = false;
    }

    Accounts_List = async () => {
        const data = await getRequest(`${this.url}${Account.url_account_portfolio_accounts}`);
        this.calledPortfolioAccounts = true;
        return data;
    };

    SubAccounts = async() => {
        const data = await getRequest(`${this.url}${Account.url_account_subaccounts}`);
        this.calledPortfolioAccounts = true;
        return data;
    };

    SubAccounts_Larget = async() => {
        const data = await getRequest(`${this.url}${Account.url_account_subaccounts2}`);
        this.calledPortfolioAccounts = true; 
        return data;
    };

    Account_Information = async (accountID: string) => {
        if (!(this.calledPortfolioAccounts)) {
            this.Accounts_List();
        }
        const url_account_information = `/portfolio/${accountID}/meta`;
        return await getRequest(`${this.url}${url_account_information}`);
    };

    Account_Summary = async (accountID: string) => {
        if (!(this.calledPortfolioAccounts)) {
            this.Accounts_List();
        }
        const url_account_summary = `/portfolio/${accountID}/summary`;
        return await getRequest(`${this.url}${url_account_summary}`);
    };

    Account_Ledget = async (accountID: string) => {
        if (!(this.calledPortfolioAccounts)) {
            this.Accounts_List();
        }
        const url_account_ledger = `/portfolio/${accountID}/ledger`;
        return await getRequest(`${this.url}${url_account_ledger}`)
    };

    Accounts = async () => {
        return await getRequest(`${this.url}${Account.url_accounts}`);
    };
    
    Switch = async (accountID: string) => {
        const payload = { data: { 'acctId' : accountID }};
        return await postRequest(`${this.url}${Account.url_accounts_switch}`, payload);
    };

    PnL = async () => {
        return await getRequest(`${this.url}${Account.url_accounts_pnl}`);
    };

}


//////////////////
// PnL
//////////////////

class PnL {
    private static url_pnl = '/iserver/account/pnl/partitioned';

    url: string;
    constructor(baseURL: string) {
        this.url = baseURL;
    }

    PnL = async () => {
        return await getRequest(`${this.url}${PnL.url_pnl}`);
    };
}

//////////////////
// Trades
//////////////////
class Trades {
    private static url_trades = '/iserver/account/trades';

    url: string;
    constructor(baseURL: string) {
        this.url = baseURL;
    }

    Trades = async () => {
        return await getRequest(`${this.url}${Trades.url_trades}`);
    }
}


/////////////////
// Contract
/////////////////
class Contract {
    private static url_secdec_by_conid = '/trsrv/secdef';
    private static url_trading_schedule = '/trsrv/secdef/schedule';
    private static url_futures_by_symbol = '/trsrv/futures';
    private static url_stock_by_symbol = '/trsrv/stocks';
    private static url_search_symbol = '/iserver/secdef/search';
    private static url_search_strike = '/iserver/secdef/strikes';
    private static url_secdef_info = '/iserver/secdef/info';
    private static url_contract_rules = '/iserver/contract/rules';

    url: string;
    constructor(baseURL: string) {
        this.url = baseURL;
    }

    Secdef = async (contract_id: [any]) => {
        const payload = {body : {conids : contract_id}};
        return await postRequest(`${this.url}${Contract.url_secdec_by_conid}`, payload);
    };

    TradingSchedule = async (asset_class: string, symbol: string, exchange?: string, exchange_filter?: string) => {
        let initial_payload = {
            assetClass : asset_class,
            symbol : symbol
        };
        if (typeof exchange !== 'undefined') {
            initial_payload = {...initial_payload, ...{'exchange' : exchange}}
        }
        if (typeof exchange_filter !== 'undefined') {
            initial_payload = {...initial_payload, ...{'exchangeFilter' : exchange_filter}}
        }
        const payload = {'body' : initial_payload};
        return await getRequest(`${this.url}${Contract.url_trading_schedule}`, payload);
    };

    FuturesBySymbol = async (symbols: any) => {
        let single_string_symbol: string;
        if (symbols.isArray) {
            single_string_symbol = symbols.concat();
        } else {
            single_string_symbol = symbols;
        }
        const payload = { body: {symbols : single_string_symbol} };
        return await getRequest(`${this.url}${Contract.url_futures_by_symbol}`, payload);
    };

    StockBySymbol = async (symbols: any) => {
        let single_string_symbol: string;
        if (symbols.isArray) {
            single_string_symbol = symbols.concat();
        } else {
            single_string_symbol = symbols;
        }
        const payload = { body: {symbols : single_string_symbol}};
        return await getRequest(`${this.url}${Contract.url_stock_by_symbol}`, payload);
    }

    // dynamic url
    ContractDetails = async (contract_id: string) => {
        const url = `/iserver/contract/${contract_id}/info`;
        return await getRequest(`${this.url}${url}`);
    };

    SearchBySymbol = async (symbol: string, name?: boolean, secType?: string) => {
        let initial_payload = { symbol : symbol };
        if (typeof name !== 'undefined') {
            initial_payload = {...initial_payload, ...{name : name}};
        };
        if (typeof secType !== 'undefined') {
            initial_payload = {...initial_payload, ...{secType : secType}};
        };
        const payload = { body: initial_payload };
        return await postRequest(`${this.url}${Contract.url_search_symbol}`, payload);

    }

    SearchStrike = async (contract_id: string, sectype: string, month: string, exchange?: string) => {
        let initial_payload = {
            conid : contract_id,
            sectype : sectype,
            month : month
        }
        if (typeof exchange !== 'undefined') {
            initial_payload = {...initial_payload, ...{exchange: exchange}};
        }
        const payload = { body: initial_payload };
        return await getRequest(`${this.url}${Contract.url_search_strike}`);
    }

    SecdefInfo = async (contract_id: string, sectype: string, month?: string, exchange?: string, strike?: string, right?: string) => {
        let initial_payload = {
            conid: contract_id,
            sectype: sectype
        }
        if (typeof month !== 'undefined') {
            initial_payload = {...initial_payload, ...{month : month}};
        }
        if (typeof exchange !== 'undefined') {
            initial_payload = {...initial_payload, ...{exchange : exchange}};
        }
        if (typeof strike !== 'undefined') {
            initial_payload = {...initial_payload, ...{strike : strike}};
        }
        if (typeof right !== 'undefined') {
            initial_payload = {...initial_payload, ...{right : right}};
        }
        const payload = {body: initial_payload};
        return await getRequest(`${this.url}${Contract.url_secdef_info}`, payload);
    };

    IBAlgoParams = async (contract_id: string, algos?: string, addDescription?: string, addParams?: string) => {
        const url = `/iserver/contract/${contract_id}/algos`;
        let initial_payload = {};
        if (typeof algos !== 'undefined') {
            initial_payload = {...initial_payload, ...{algos : algos}}
        }
        if (typeof addDescription !== 'undefined') {
            initial_payload = {...initial_payload, ...{addDescription : addDescription}};
        }
        if (typeof addParams !== 'undefined') {
            initial_payload = {...initial_payload, ...{ addParams : addParams }};
        }
        const payload = {body: initial_payload};
        return await getRequest(`${this.url}${url}`, payload);
    };

    ContractRules = async (contract_id: string, isBuy: boolean) => {
        let initial_payload = {
            conid : contract_id,
            isBuy : isBuy
        }
        const payload = { body : initial_payload };
        return await postRequest(`${this.url}${Contract.url_contract_rules}`);
    };

    ContractInfoAndRules = async (contract_id: string, isBuy: boolean) => {
        const url = `/iserver/contract/${contract_id}/info-and-rules`;
        let initial_payload = {
            isBuy : isBuy
        }
        const payload = { body: initial_payload };
        return await getRequest(`${this.url}${url}`, payload);
    }

}

export {IB_API}