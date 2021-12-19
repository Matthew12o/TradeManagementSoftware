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
const getRequest = (url, options = {}) => {
    const default_payload = { httpsAgent: agent };
    const final_payload = Object.assign(Object.assign({}, default_payload), options);
    const returnPromise = new Promise((resolve, rejects) => {
        axios_1.default.get(url, final_payload)
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
    const default_payload = { httpsAgent: agent };
    const final_payload = Object.assign(Object.assign({}, default_payload), options);
    const returnPromise = new Promise((resolve, rejects) => {
        axios_1.default.post(url, final_payload)
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
        this.Contract = new Contract(this.baseURL);
        this.Order = new Order(this.baseURL);
        this.MarketData = new MarketData(this.baseURL);
        this.PortfolioAnalyst = new PortfolioAnalyst(this.baseURL);
    }
    ;
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
            const payload = { data: { 'acctId': accountID } };
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
//////////////////
// PnL
//////////////////
class PnL {
    constructor(baseURL) {
        this.PnL = () => __awaiter(this, void 0, void 0, function* () {
            return yield getRequest(`${this.url}${PnL.url_pnl}`);
        });
        this.url = baseURL;
    }
}
PnL.url_pnl = '/iserver/account/pnl/partitioned';
//////////////////
// Trades
//////////////////
class Trades {
    constructor(baseURL) {
        this.Trades = () => __awaiter(this, void 0, void 0, function* () {
            return yield getRequest(`${this.url}${Trades.url_trades}`);
        });
        this.url = baseURL;
    }
}
Trades.url_trades = '/iserver/account/trades';
/////////////////
// Contract
/////////////////
class Contract {
    constructor(baseURL) {
        this.Secdef = (contract_id) => __awaiter(this, void 0, void 0, function* () {
            const payload = { body: { conids: contract_id } };
            return yield postRequest(`${this.url}${Contract.url_secdec_by_conid}`, payload);
        });
        this.TradingSchedule = (asset_class, symbol, exchange, exchange_filter) => __awaiter(this, void 0, void 0, function* () {
            let initial_payload = {
                assetClass: asset_class,
                symbol: symbol
            };
            if (typeof exchange !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { 'exchange': exchange });
            }
            if (typeof exchange_filter !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { 'exchangeFilter': exchange_filter });
            }
            const payload = { 'body': initial_payload };
            return yield getRequest(`${this.url}${Contract.url_trading_schedule}`, payload);
        });
        this.FuturesBySymbol = (symbols) => __awaiter(this, void 0, void 0, function* () {
            let single_string_symbol;
            if (symbols.isArray) {
                single_string_symbol = symbols.concat();
            }
            else {
                single_string_symbol = symbols;
            }
            const payload = { body: { symbols: single_string_symbol } };
            return yield getRequest(`${this.url}${Contract.url_futures_by_symbol}`, payload);
        });
        this.StockBySymbol = (symbols) => __awaiter(this, void 0, void 0, function* () {
            let single_string_symbol;
            if (symbols.isArray) {
                single_string_symbol = symbols.concat();
            }
            else {
                single_string_symbol = symbols;
            }
            const payload = { body: { symbols: single_string_symbol } };
            return yield getRequest(`${this.url}${Contract.url_stock_by_symbol}`, payload);
        });
        // dynamic url
        this.ContractDetails = (contract_id) => __awaiter(this, void 0, void 0, function* () {
            const url = `/iserver/contract/${contract_id}/info`;
            return yield getRequest(`${this.url}${url}`);
        });
        this.SearchBySymbol = (symbol, name, secType) => __awaiter(this, void 0, void 0, function* () {
            let initial_payload = { symbol: symbol };
            if (typeof name !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { name: name });
            }
            ;
            if (typeof secType !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { secType: secType });
            }
            ;
            const payload = { body: initial_payload };
            return yield postRequest(`${this.url}${Contract.url_search_symbol}`, payload);
        });
        this.SearchStrike = (contract_id, sectype, month, exchange) => __awaiter(this, void 0, void 0, function* () {
            let initial_payload = {
                conid: contract_id,
                sectype: sectype,
                month: month
            };
            if (typeof exchange !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { exchange: exchange });
            }
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${Contract.url_search_strike}`);
        });
        this.SecdefInfo = (contract_id, sectype, month, exchange, strike, right) => __awaiter(this, void 0, void 0, function* () {
            let initial_payload = {
                conid: contract_id,
                sectype: sectype
            };
            if (typeof month !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { month: month });
            }
            if (typeof exchange !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { exchange: exchange });
            }
            if (typeof strike !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { strike: strike });
            }
            if (typeof right !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { right: right });
            }
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${Contract.url_secdef_info}`, payload);
        });
        this.IBAlgoParams = (contract_id, algos, addDescription, addParams) => __awaiter(this, void 0, void 0, function* () {
            const url = `/iserver/contract/${contract_id}/algos`;
            let initial_payload = {};
            if (typeof algos !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { algos: algos });
            }
            if (typeof addDescription !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { addDescription: addDescription });
            }
            if (typeof addParams !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { addParams: addParams });
            }
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${url}`, payload);
        });
        this.ContractRules = (contract_id, isBuy) => __awaiter(this, void 0, void 0, function* () {
            let initial_payload = {
                conid: contract_id,
                isBuy: isBuy
            };
            const payload = { body: initial_payload };
            return yield postRequest(`${this.url}${Contract.url_contract_rules}`);
        });
        this.ContractInfoAndRules = (contract_id, isBuy) => __awaiter(this, void 0, void 0, function* () {
            const url = `/iserver/contract/${contract_id}/info-and-rules`;
            let initial_payload = {
                isBuy: isBuy
            };
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${url}`, payload);
        });
        this.url = baseURL;
    }
}
Contract.url_secdec_by_conid = '/trsrv/secdef';
Contract.url_trading_schedule = '/trsrv/secdef/schedule';
Contract.url_futures_by_symbol = '/trsrv/futures';
Contract.url_stock_by_symbol = '/trsrv/stocks';
Contract.url_search_symbol = '/iserver/secdef/search';
Contract.url_search_strike = '/iserver/secdef/strikes';
Contract.url_secdef_info = '/iserver/secdef/info';
Contract.url_contract_rules = '/iserver/contract/rules';
class Order {
    constructor(baseURL) {
        this.LiveOrder = (filters) => __awaiter(this, void 0, void 0, function* () {
            // filters enum : inactive, pending_submit, pre_submitted, submitted, filled, pending_cancel, cancelled, warn_state, sort_by_time;
            let initial_payload = {};
            if (typeof filters !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { filters: filters });
            }
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${Order.url_order_live_order}`, payload);
        });
        this.PlaceOrders = (acccount_id, orders) => __awaiter(this, void 0, void 0, function* () {
            const url = `/iserver/account/${acccount_id}/orders`;
            let initial_payload = {};
            if (typeof orders !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { orders: orders });
            }
            const payload = { body: initial_payload };
            return yield postRequest(`${this.url}${url}`, payload);
        });
        // PlaceOrdersForFA - Not included
        this.PlaceOrderReply = (replyid, confirmed) => __awaiter(this, void 0, void 0, function* () {
            const url = `/iserver/reply/${replyid}`;
            let initial_payload = {};
            if (typeof confirmed !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { confirmed: confirmed });
            }
            const payload = { body: initial_payload };
            return yield postRequest(`${this.url}${url}`, payload);
        });
        this.PreviewOrders = (account_id, orders) => __awaiter(this, void 0, void 0, function* () {
            const url = `/iserver/account/${account_id}/orders/whatif`;
            let initial_payload = {};
            if (typeof orders !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { orders: orders });
            }
            const payload = { body: initial_payload };
            return yield postRequest(`${this.url}${url}`, payload);
        });
        this.OrderStatus = (order_id) => __awaiter(this, void 0, void 0, function* () {
            const url = `/iserver/account/order/status/${order_id}`;
            return yield getRequest(`${this.url}${url}`);
        });
        // ModifyOrder - skipped for now 
        this.DeleteOrder = (account_id, order_id) => __awaiter(this, void 0, void 0, function* () {
            const url = `/iserver/account/${account_id}/order/${order_id}`;
            return yield deleteRequest(`${this.url}${url}`);
        });
        this.url = baseURL;
    }
}
Order.url_order_live_order = '/iserver/account/orders';
class MarketData {
    constructor(baseURL) {
        // check api reference for contract_id
        this.Snapshot = (contract_ids, fields) => __awaiter(this, void 0, void 0, function* () {
            let initial_payload = { conids: contract_ids };
            if (typeof fields !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { fields: fields });
            }
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${MarketData.url_marketdata_snapshot}`, payload);
        });
        this.MarketData = (contract_ids, since, fields) => __awaiter(this, void 0, void 0, function* () {
            let single_string_conids;
            if (contract_ids.isArray) {
                single_string_conids = contract_ids.concat();
            }
            else {
                single_string_conids = contract_ids;
            }
            ;
            let initial_payload = { conids: single_string_conids };
            if (typeof since !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { since: since });
            }
            ;
            let single_string_fields;
            if (typeof fields !== 'undefined') {
                if (fields.isArray) {
                    single_string_fields = fields.concat();
                }
                else {
                    single_string_fields = fields;
                }
            }
            ;
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${MarketData.url_marketdata}`, payload);
        });
        this.MarketDataCancel = (contract_id) => __awaiter(this, void 0, void 0, function* () {
            const url = `/iserver/marketdata/${contract_id}/unsubscribe`;
            return yield getRequest(`${this.url}${url}`);
        });
        this.MarketDataCancel_All = () => __awaiter(this, void 0, void 0, function* () {
            return yield getRequest(`${this.url}${MarketData.url_unsubscribeall}`);
        });
        this.MarketDataHistory = (contract_id, period, exchange, bar, outsideRth) => __awaiter(this, void 0, void 0, function* () {
            let initial_payload = {
                conid: contract_id,
                period: period
            };
            if (typeof exchange !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { exchange: exchange });
            }
            ;
            if (typeof bar !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { bar: bar });
            }
            ;
            if (typeof outsideRth !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { outsideRth: outsideRth });
            }
            ;
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${MarketData.url_marketdata_history}`, payload);
        });
        this.url = baseURL;
    }
}
MarketData.url_marketdata_snapshot = '/md/snapshot';
MarketData.url_marketdata = '/iserver/marketdata/snapshot';
MarketData.url_unsubscribeall = '/iserver/marketdata/unsubscribeall';
MarketData.url_marketdata_history = '/iserver/marketdata/history';
;
class PortfolioAnalyst {
    constructor(baseURL) {
        this.AccountPerformance = (account_ids, freq = 'D') => __awaiter(this, void 0, void 0, function* () {
            if (typeof account_ids == 'string') {
                account_ids = [account_ids];
            }
            ;
            let initial_payload = {
                acctIds: account_ids,
                freq: freq
            };
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${PortfolioAnalyst.url_pa_account_performance}`, payload);
        });
        this.AccountSummary = (account_ids) => __awaiter(this, void 0, void 0, function* () {
            if (typeof account_ids == 'string') {
                account_ids = [account_ids];
            }
            ;
            const initial_payload = {
                acctIds: account_ids
            };
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${PortfolioAnalyst.url_pa_account_summary}`);
        });
        this.TransactionHistory = (account_ids, contract_ids, currency, days) => __awaiter(this, void 0, void 0, function* () {
            if (typeof account_ids == 'string') {
                account_ids = [account_ids];
            }
            ;
            if (typeof contract_ids == 'number') {
                contract_ids = [contract_ids];
            }
            ;
            let initial_payload = {
                acctIds: account_ids,
                conids: contract_ids
            };
            if (typeof currency !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { currency: currency });
            }
            ;
            if (typeof days !== 'undefined') {
                initial_payload = Object.assign(Object.assign({}, initial_payload), { days: days });
            }
            ;
            const payload = { body: initial_payload };
            return yield getRequest(`${this.url}${PortfolioAnalyst.url_pa_transactions}`);
        });
        this.url = baseURL;
    }
}
PortfolioAnalyst.url_pa_account_performance = '/pa/performance';
PortfolioAnalyst.url_pa_account_summary = '/pa/summary';
PortfolioAnalyst.url_pa_transactions = '/pa/transactions';
