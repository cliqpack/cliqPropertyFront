import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Menu
import Menu from "./ACL/menu/reducer";

//Module
import Modules from "./ACL/Module/reducer";

//Roles
import Role from "./ACL/Role/reducer";

//user-role
import UserRole from "./ACL/User-role/reducer";
//Company
import company from "./Company/reducer";

import property from "./Properties/reducer";

//Contacts2
import Contacts2 from "./Contacts2/reducer";

//invoices
import invoices from "./invoices/reducer";

//tasks
import tasks from "./tasks/reducer";


//mails
import mails from "./mails/reducer";

//Dashboard
import Dashboard from "./dashboard/reducer";

// Inspections
import Inspections from "./Inspections/reducer";

//Listing
import Listing from "./Listings/reducer";

//Jobs
import Jobs from "./Jobs/reducer";

import Message from "./Messages/reducer";
//OTdashboard
import OTDashboard from "./OTDashboard/reducer";

//Activity
import Activity from "./Activity/reducer";

// Document
import Document from "./Document/reducer";

//Bills
import Bills from "./Accounts/Bills/reducer";

// Invoices
import AccountsInvoices from "./Accounts/AccountInvoice/reducer";

// Plan
import Plan from "./ACL/Plan/reducer";

// Banking
import Banking from "./Accounts/Banking/reducer";
//Transactions

import AccountsTransactions from "./Accounts/Transactions/reducer";

//Menu list
import MenuList from "./Menu/reducer";
//Menu Price
import MenuPrice from "./ACL/MenuPrice/reducer";
//Prm
import Prm from "./ACL/PrerequisiteMenu/reducer";
//UserPlan
import UserPlan from "./ACL/UserPlan/reducer";
// Reconciliations
import Reconciliations from "./Accounts/Reconciliation/reducer";
import Disbursement from "./Accounts/Disbursement/reducer";

//Settings

//Portfolio
//Company
import Portfolio from "./Settings/Portfolio/reducer";
import FeeSettings from "./Settings/Fee/reducer";

import Addon from "./ACL/Addon/reducer";

import Withdrawal from "./Accounts/Withdrawal/reducer";

//Supplier
import supplier from "./supplier/reducer";

// REPORT
import BillReportReducer from "./Report/FinancialReport/reducer";
import CashBookReducer from "./Report/FinancialReport/CashBook/reducer";
import FolioLedgerReducer from "./Report/FinancialReport/FolioLedger/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Menu,
  Modules,
  Role,
  UserRole,
  company,
  property,
  Profile,
  mails,
  invoices,
  tasks,
  Dashboard,
  Contacts2,
  Inspections,
  Listing,
  Jobs,
  Message,
  OTDashboard,
  Activity,
  Document,
  Bills,
  AccountsInvoices,
  Plan,
  Banking,
  AccountsTransactions,
  MenuList,
  MenuPrice,
  Prm,
  UserPlan,
  Reconciliations,
  Disbursement,
  Portfolio,
  Addon,
  Withdrawal,
  FeeSettings,
  supplier,
  BillReportReducer,
  CashBookReducer,
  FolioLedgerReducer
});

export default rootReducer;
