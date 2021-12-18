import { rejects } from 'assert';
import axios from 'axios';
import https from 'https';
import { resolve } from 'path/posix';

const baseURL = 'https://127.0.0.1:8080/v1/api';

const agent = new https.Agent({
    rejectUnauthorized: false
});

// GET Request
const getRequest = (url: string): any => {
    const returnPromise = new Promise((resolve, rejects) => {
        axios.get(url, {
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

// POST
const postRequest = (url: string, options = {}): any => {
    const default_load = {httpsAgent: agent};
    const final_load = {...default_load, ...options}
    const returnPromise = new Promise((resolve, rejects) => {
        axios.post(url, final_load)
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
        const payload = { 'acctId' : accountID };
        return await postRequest(`${this.url}${Account.url_accounts_switch}`, payload);
    };

    PnL = async () => {
        return await getRequest(`${this.url}${Account.url_accounts_pnl}`);
    };


}

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
export {IB_API}