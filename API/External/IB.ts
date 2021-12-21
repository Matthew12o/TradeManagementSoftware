import { rejects } from 'assert';
import axios from 'axios';
import { response } from 'express';
import https from 'https';
import { type } from 'os';
import { resolve } from 'path/posix';
import { initParams } from 'request';

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
    private PORT: number ;
    private baseURL: string;
    
    // Session
    Session: Session;    
    Account: Account;
    PnL: PnL;
    Trades: Trades;
    Contract: Contract;
    Order: Order;
    MarketData: MarketData;
    PortfolioAnalyst: PortfolioAnalyst;
    isActive: boolean;
    constructor(PORT=8080) {
        this.PORT = PORT;
        this.baseURL = `https://127.0.0.1:${this.PORT}/v1/api`;
        this.Session = new Session(this.baseURL);
        this.Account = new Account(this.baseURL);
        this.PnL = new PnL(this.baseURL);
        this.Trades = new Trades(this.baseURL);
        this.Contract = new Contract(this.baseURL);
        this.Order = new Order(this.baseURL);
        this.MarketData = new MarketData(this.baseURL);
        this.PortfolioAnalyst = new PortfolioAnalyst(this.baseURL);
        this.isActive = false;
        this.checkIfActive();
    };

    checkIfActive(): void {
        const session_response = this.Session.Status();
        session_response.then((res) => {
            const data = res.data;
            if (data.authenticated && data.connected && !(data.competing)) {
                this.isActive = true;
            } else {
                this.isActive = false;
            };
        }).catch((err) => {
            console.error(err);
            this.isActive = false;
        });
    };

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
// Portfolio
/////////////////////

class Portfolio {
    private static url_portfolio_accounts = '/portfolio/accounts';
    private static url_portfolio_subaccounts = '/portfolio/subaccounts';
    private static url_portfolio_allocations = '/portfolio/allocations';
    
    url: string;
    calledSubAccounts: boolean;
    constructor(baseURL: string) {
        this.url = baseURL;
        this.calledSubAccounts = false;
    }

    Accounts = async () => {
        return await getRequest(`${this.url}${Portfolio.url_portfolio_accounts}`);
    };

    Subaccounts = async () => {
        this.calledSubAccounts = true;
        return await getRequest(`${this.url}${Portfolio.url_portfolio_subaccounts}`);
    };

    AccountInformation = async (account_id: string) => {
        const url = `/portfolio/${account_id}/meta`;
        return await getRequest(`${this.url}${url}`);
    };

    AccountAllocation = async (account_id: string) => {

        const url = `/portfolio/${account_id}/allocations`;
        return await getRequest(`${this.url}${url}`);
    };

    AccountAllocation_All = async (account_ids?: any) => {
        if (typeof account_ids !== 'undefined') {
            const payload = { body: { acctIds : account_ids }};
            return await getRequest(`${this.url}${Portfolio.url_portfolio_allocations}`);
        } else {
            return await getRequest(`${this.url}${Portfolio.url_portfolio_allocations}`);
        };
    };

    Positions = async (account_id: string, page_id="0", model?: string, sort?: string, direction?: string, period?: string) => {
        const url = `/portfolio/${account_id}/positions/${page_id}`;
        let initial_payload = {};
        if (typeof model !== 'undefined') {
            initial_payload = {...initial_payload, ...{ model : model }};
        };
        if (typeof sort !== 'undefined') {
            initial_payload = {...initial_payload, ...{ sort : sort }};
        };
        if (typeof direction !== 'undefined') {
            initial_payload = {...initial_payload, ...{ direction : direction }};
        };
        if (typeof period !== 'undefined') {
            initial_payload = {...initial_payload, ...{ period : period }};
        };
        const payload = { body: initial_payload }
        return await postRequest(`${this.url}${url}`, payload);
    };

    PositionByContractID = async (account_id: string, contract_id: string) => {
        const url = `/portfolio/${account_id}/position/${contract_id}`;
        return await getRequest(`${this.url}${url}`);
    };

    Account_Summary = async (account_id: string) => {
        if (!(this.calledSubAccounts)) {
            this.Subaccounts();
        }
        const url_account_summary = `/portfolio/${account_id}/summary`;
        return await getRequest(`${this.url}${url_account_summary}`);
    };

    Account_Ledger = async (account_id: string) => {
        if (!(this.calledSubAccounts)) {
            this.Subaccounts();
        }
        const url_account_ledger = `/portfolio/${account_id}/ledger`;
        return await getRequest(`${this.url}${url_account_ledger}`)
    };

    PositionByContractID_AllAccount = async (contract_id: string) => {
        const url = `/portfolio/positions/${contract_id}`;
        return await getRequest(`${this.url}${url}`);
    }
};

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

    private url: String;
    private calledPortfolioAccounts: boolean;
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

    Account_Ledger = async (accountID: string) => {
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

class Order {
    private static url_order_live_order = '/iserver/account/orders';

    private url: string;
    constructor(baseURL: string) {
        this.url = baseURL;
    }

    LiveOrder = async (filters?: string) => {
        // filters enum : inactive, pending_submit, pre_submitted, submitted, filled, pending_cancel, cancelled, warn_state, sort_by_time;
        let initial_payload = {};
        if (typeof filters !== 'undefined') {
            initial_payload = {...initial_payload, ...{filters : filters}};
        }
        const payload = { body: initial_payload };
        return await getRequest(`${this.url}${Order.url_order_live_order}`, payload);
    };

    PlaceOrders = async (acccount_id: string, orders?: any) => {
        const url = `/iserver/account/${acccount_id}/orders`;
        let initial_payload = {};
        if (typeof orders !== 'undefined') {
            initial_payload = {...initial_payload, ...{orders: orders}};
        }
        const payload = { body: initial_payload};
        return await postRequest(`${this.url}${url}`, payload);
    };

    // PlaceOrdersForFA - Not included

    PlaceOrderReply = async (replyid: string, confirmed?: boolean) => {
        const url = `/iserver/reply/${replyid}`;
        let initial_payload = {};
        if (typeof confirmed !== 'undefined') {
            initial_payload = {...initial_payload, ...{ confirmed: confirmed }};
        }
        const payload = { body: initial_payload}
        return await postRequest(`${this.url}${url}`, payload);
    };

    PreviewOrders = async (account_id: string, orders?: any) => {
        const url = `/iserver/account/${account_id}/orders/whatif`;
        let initial_payload = {};
        if (typeof orders !== 'undefined') {
            initial_payload = {...initial_payload, ...{ orders: orders }};
        }
        const payload = { body : initial_payload };
        return await postRequest(`${this.url}${url}`, payload);
    };

    OrderStatus = async (order_id: string) => {
        const url = `/iserver/account/order/status/${order_id}`;
        return await getRequest(`${this.url}${url}`);
    };

    // ModifyOrder - skipped for now 

    DeleteOrder = async (account_id: string, order_id: string) => {
        const url = `/iserver/account/${account_id}/order/${order_id}`;
        return await deleteRequest(`${this.url}${url}`);
    };
}

class MarketData {
    private static url_marketdata_snapshot = '/md/snapshot';
    private static url_marketdata = '/iserver/marketdata/snapshot';
    private static url_unsubscribeall = '/iserver/marketdata/unsubscribeall';
    private static url_marketdata_history = '/iserver/marketdata/history';

    url: string;
    constructor(baseURL: string) {
        this.url = baseURL;
    }

    // check api reference for contract_id
    Snapshot = async (contract_ids: string, fields?: string) => {
        let initial_payload = { conids : contract_ids };
        if (typeof fields !== 'undefined') {
            initial_payload = {...initial_payload, ...{fields: fields}};
        }
        const payload = { body: initial_payload};
        return await getRequest(`${this.url}${MarketData.url_marketdata_snapshot}`, payload);
    };

    MarketData = async (contract_ids: any, since?: number, fields?: any) => {
        let single_string_conids: string;
        if (contract_ids.isArray) {
            single_string_conids=contract_ids.concat();
        } else {
            single_string_conids = contract_ids;
        };

        let initial_payload = { conids : single_string_conids};
        if (typeof since !== 'undefined') {
            initial_payload = {...initial_payload, ...{since : since}};
        };

        let single_string_fields: string;
        if (typeof fields !== 'undefined') {
            if (fields.isArray) {
                single_string_fields = fields.concat();
            } else {
                single_string_fields = fields;
            }
        };

        const payload = { body : initial_payload };
        return await getRequest(`${this.url}${MarketData.url_marketdata}`, payload);
    };

    MarketDataCancel = async (contract_id: string) => {
        const url = `/iserver/marketdata/${contract_id}/unsubscribe`;
        return await getRequest(`${this.url}${url}`);
    };

    MarketDataCancel_All = async () => {
        return await getRequest(`${this.url}${MarketData.url_unsubscribeall}`);
    };

    MarketDataHistory = async (contract_id: string, period: string, exchange?: string, bar?: string, outsideRth?: boolean) => {
        let initial_payload = {
            conid : contract_id,
            period : period
        };
        if (typeof exchange !== 'undefined') {
            initial_payload = {...initial_payload, ...{exchange: exchange}};
        };
        if (typeof bar !== 'undefined') {
            initial_payload = {...initial_payload, ...{bar: bar}};
        };
        if (typeof outsideRth !== 'undefined') {
            initial_payload = {...initial_payload, ...{outsideRth : outsideRth}};
        };
        const payload = { body : initial_payload};
        return await getRequest(`${this.url}${MarketData.url_marketdata_history}`, payload);
    };

};

class PortfolioAnalyst {
    private static url_pa_account_performance = '/pa/performance';
    private static url_pa_account_summary = '/pa/summary';
    private static url_pa_transactions = '/pa/transactions';

    url: string;
    constructor(baseURL: string) {
        this.url = baseURL;
    }

    AccountPerformance = async (account_ids: any, freq = 'D') => {
        if (typeof account_ids == 'string') {
            account_ids = [account_ids];
        };
        let initial_payload = { 
            acctIds: account_ids,
            freq : freq
        };
        const payload = { body : initial_payload};
        return await getRequest(`${this.url}${PortfolioAnalyst.url_pa_account_performance}`, payload);
    };

    AccountSummary = async (account_ids: any) => {
        if (typeof account_ids == 'string') {
            account_ids = [account_ids];
        };
        const initial_payload = {
            acctIds: account_ids
        };
        const payload = { body: initial_payload};
        return await getRequest(`${this.url}${PortfolioAnalyst.url_pa_account_summary}`);
    }

    TransactionHistory = async (account_ids: any, contract_ids: any, currency?:string, days?:number) => {
        if (typeof account_ids == 'string') {
            account_ids = [account_ids];
        };
        if (typeof contract_ids == 'number') {
            contract_ids = [contract_ids];
        };
        let initial_payload = {
            acctIds : account_ids,
            conids : contract_ids
        };

        if (typeof currency !== 'undefined') {
            initial_payload = {...initial_payload, ...{ currency : currency }};
        };
        if (typeof days !== 'undefined') {
            initial_payload = {...initial_payload, ...{ days : days }};
        };

        const payload = { body : initial_payload };
        return await getRequest(`${this.url}${PortfolioAnalyst.url_pa_transactions}`);
    };

}
export {IB_API}