import React from "react";
import { Redirect } from "react-router-dom";

// User profile
import UserProfile from "../pages/Authentication/UserProfile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import AdminRegister from "../pages/Authentication/AdminRegister";
import ForgetPwd from "../pages/Authentication/ForgetPassword";


// Dashboard
import Dashboard from "../pages/Dashboard/index";


// Charts
// import ChartApex from "../pages/Charts/Apexcharts";
// import ChartistChart from "../pages/Charts/ChartistChart";
// import ChartjsChart from "../pages/Charts/ChartjsChart";
// import EChart from "../pages/Charts/EChart";
// import SparklineChart from "../pages/Charts/SparklineChart";
// import ChartsKnob from "../pages/Charts/charts-knob";
// import ReCharts from "../pages/Charts/ReCharts";

//Icons
import IconBoxicons from "../pages/Icons/IconBoxicons";
import IconDripicons from "../pages/Icons/IconDripicons";
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";
import IconFontawesome from "../pages/Icons/IconFontawesome";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";
import DragDropTables from "../pages/Tables/DragDropTables";

//Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

// Reference
import ReferenceContact from "../pages/Contacts2/Reference/ReferenceContactAdd";

import Menu from "pages/ACL/Menus/Menu";
import Modules from "pages/ACL/Modules/Modules";
import Role from "pages/ACL/Role/Role";
import UserRole from "pages/ACL/User-role/User-role";
import Company from "pages/Company/Company";
import Properties from "pages/Properties/Properties";
import PropertyList from "pages/Properties/PropertyList";
import PropertyInfo from "pages/Properties/PropertyInfo";
import PropertyEdit from "pages/Properties/PropertyEdit";
//Contacts
import Contacts2 from "pages/Contacts2/ContactsList";
import Contacts from "pages/Contacts2/Contacts";
import MultipleContacts from "pages/Contacts2/MultipleReference/Contacts";
import ContactEdit from "pages/Contacts2/Edit/ContactEdit";
import SetContacts from "pages/Contacts2/SetContacts";
import Supplier from "pages/Contacts2/Supplier";
// import ContactsInfo from "pages/Contacts2/ContactsInfo";
import ContactsInfo2 from "pages/Contacts2/ContactsInfo2";
import OwnerInfo from "pages/Contacts2/OwnerInfo";
import TenantInfo from "pages/Contacts2/TenantInfo";
import ContactsInfoEdit from "pages/Contacts2/ContactsInfoEdit";
import PropertyOwnerAdd2 from "pages/Properties/PropertyOwnerAdd2";
// import PropertyTenantAdd from "pages/Properties/PropertyTenantAdd";
import PropertyTanentAdd2 from "pages/Properties/propertyTanentAdd2";
import setPropertyTenantAdd from "pages/Properties/setPropertyTenantAdd";
import setPropertyOwnerAdd from "pages/Properties/setPropertyOwnerAdd";
import TenantEdit from "pages/Properties/TenantEdit";
import OwnerEdit from "pages/Properties/OwnerEdit";
// import AddSupplier from "pages/Contacts2/AddSupplier";
import AddSupplier2 from "pages/Contacts2/AddSupplier2";
import SetAddSupplier from "pages/Contacts2/SetAddSupplier";
import SupplierInfo from "pages/Contacts2/SupplierInfo";
import EditSupplier from "pages/Contacts2/EditSupplier";
//inspections
import InspectionInfo from "pages/Inspection/InspectionInfo";
import InspectionList from "pages/Inspection/InspectionList";
import PlanInspection from "pages/Inspection/Planning/PlanInspection";

import InspectionEntryReport from "pages/Inspection/Report/InspectionEntryReport";
import InspectionRoutineReport from "pages/Inspection/Report/InspectionRoutineReport/InspectionRoutineReport";
import InspectionExitReport from "pages/Inspection/Report/InspectionExitReport/InspectionExitReport";
import InspectionDay from "pages/Inspection/InspectionDay";

//Listings
import Listings from "pages/Listings/Listings";
import ListingInfo from "pages/Listings/ListingInfo";
import InspectionDayEdit from "pages/Inspection/InspectionDayEdit";

// Task
import TaskList from "pages/Task/TaskList";
import TaskShow from "pages/Task/TaskShow";
import JobsTaskList from "pages/Jobs/JobsTaskList";
import JobInfo from "pages/Jobs/JobInfo";

import Messages from "pages/Communications/Messages";
import MessagesOwner from "pages/Communications/MessagesOwner";
import MessagesTenant from "pages/Communications/MessagesTenant";
import Home from "pages/Home/Home";

// Landing Page
import StarterPage from "pages/LandingPages/StarterPage";
import OwnerLogin from "pages/Authentication/OwnerLogin";
import OTDashboard from "pages/OwnerTenantDashboard/OTDashboard";

// Owner Tenant Login Register
import OwnerTenantLogin from "pages/Authentication/OwnerTenantLogin";
import Reg from "pages/Authentication/Register/Reg";
import JobInfoWorkOrderActionInvoice from "pages/Jobs/JobInfoWorkOrderActionInvoice";

// Activity
import AllActvity from "pages/Properties/Activity/AllActvity";
import AllActivity from "pages/Contacts2/Activity/AllActivity";
import TaskAllActivity from "pages/Task/Activity/TaskAllActivity";
import InspectionAllActivity from "pages/Inspection/Activity/InspectionAllActivity";
import JobAllActivity from "pages/Jobs/Activity/JobAllActivity";
import OTInspectionInfo from "pages/OwnerTenantDashboard/OTInspectionInfo";
import OTJobInfo from "pages/OwnerTenantDashboard/OTJobInfo";
import OTPropInfo from "pages/OwnerTenantDashboard/OTPropInfo";
import TenantDDetails from "pages/OwnerTenantDashboard/TenantDDetails";

import ViewOriginalTemplateData from "pages/Jobs/Activity/ViewOriginalTemplateData";

import PropertyAllDocument from "pages/Properties/Activity/PropertyAllDocument";
import AllDocument from "pages/Contacts2/Activity/AllDocument";
import JobAllDocument from "pages/Jobs/Activity/JobAllDocument";
import TaskAllDocument from "pages/Task/Activity/TaskAllDocument";
import InspectionAllDocument from "pages/Inspection/Activity/InspectionAllDocument";
import SaleAgreement from "pages/Properties/SaleAgreement";
import SaleInfo from "pages/Properties/SaleInfo";
import AddBuyer from "pages/Properties/AddBuyer";
import EditSaleAgreement from "pages/Properties/EditSaleAgreement";
import BillsList from "pages/Accounts/Bills/BillsList";
import InvoiceList from "pages/Accounts/Invoice/InvoiceList";
import TransactionList from "pages/Accounts/Transactions/TransactionList";

import UploadInvoice from "pages/Accounts/Invoice/UploadInvoice";

import CreateAddons from "pages/ACL/Plan/CreateAddons";

import BankingList from "pages/Accounts/Banking/BankingList";
import BankingReceiptList from "pages/Accounts/Banking/BankingReceiptList";
import BankingListData from "pages/Accounts/Banking/BankingListData";
import DisbursementList from "pages/Accounts/Disbursement/DisbursementList";
import CreatePlan from "pages/ACL/Plan/CreatePlan";
import MenuPrice from "pages/ACL/MenuPrice/MenuPrice";
import PrerequisiteMenu from "pages/ACL/PrerequisiteMenu/PrerequisiteMenu";
import UserPlan from "pages/ACL/UserPlan/UserPlan";
import UploadBillsList from "pages/Accounts/Bills/UploadBillsList";
import ApprovalBillList from "pages/Accounts/Bills/ApprovalBillList";
import ReconciliationsList from "pages/Accounts/Reconciliations/ReconciliationsList";
import Reconciliation from "pages/Accounts/Reconciliations/Reconciliation";
import UnreconciledDeposits from "pages/Accounts/Reconciliations/UnreconciledDeposits";
// import UnreconciledWithdrawals from "pages/Accounts/Reconciliations/UnreconciledWithdrawals";
import Adjustments from "pages/Accounts/Reconciliations/Adjustments/Adjustments";
import Banking from "pages/Accounts/Reconciliations/Banking";
import ReceipctsList from "pages/Accounts/Reconciliations/Receipts/ReceipctsList";
import Withdrawals from "pages/Accounts/Reconciliations/Withdrawals";
import ReconciliationReport from "pages/Accounts/Reconciliations/Reports/ReconciliationReport";
import UnreconcileItems from "pages/Accounts/Reconciliations/Reports/UnreconcileItems";
import FolioLedger from "pages/Accounts/Reconciliations/Reports/FolioLedger";
import TrialBalance from "pages/Accounts/Reconciliations/Reports/TrialBalance";
import TransactionAuditReport from "pages/Accounts/Reconciliations/Reports/TransactionAuditReport";
import CashBookReport from "pages/Accounts/Reconciliations/Reports/CashBookReport";
import JournalsReport from "pages/Accounts/Reconciliations/Reports/JournalsReport";
import UnreconciledWithdrawals2 from "pages/Accounts/Reconciliations/UnreconciledWithdrawals2";
import AllWithdrawalsList from "pages/Accounts/Reconciliations/Withdrawals/AllWithdrawalsList";
import PrintRecieptInvoice from "pages/Accounts/Transactions/PrintRecieptInvoice";
import TenantFolio from "pages/Properties/Tenant/TenantFolio";
import ManageTenants from "pages/Properties/Tenant/ManageTenants";
import CashBookReportReceipt from "pages/Accounts/Reconciliations/Receipts/CashBookReportReceipt";

// IMPORT BANK FILE
import ImportedBankFile from "pages/Accounts/Transactions/ImportedBankFile";
import TransactionProcess from "pages/Accounts/Transactions/TransactionProcess";
import OwnerFolio from "pages/Properties/Owner/OwnerFolio";
import NewWithdrawalsReport from "pages/Accounts/Reconciliations/Reports/NewWithdrawalsReport";
import PortfolioEdit from "pages/Settings/Portfolio/Company/PortfolioEdit";
import PortfolioBanking from "pages/Settings/Portfolio/Banking/PortfolioBanking";
import BankFeeds from "pages/Settings/Portfolio/BankFeeds/BankFeeds";
import Fees from "pages/Settings/Portfolio/Fees/Fees";
import PortfolioLabels from "pages/Settings/Portfolio/Labels/PortfolioLabels";
import GainOrLostReasons from "pages/Settings/Portfolio/GainOrLostReasons/GainOrLostReasons";
import Reminders from "pages/Settings/Portfolio/Reminders/Reminders";
import ChartOfAccounts from "pages/Settings/Portfolio/ChartOfAccounts/ChartOfAccounts";
import Log from "pages/Settings/Activity/Log";
import Documents from "pages/Settings/Activity/Documents";
import Statements from "pages/Settings/Statements/Statements";

import AddonList from "pages/ACL/Addons/AddonList";
import Integrations from "pages/Settings/Integrations/Integrations";
import ListingAllActivity from "pages/Listings/Activity/ListingAllActivity";
import TenantDDetailsActivity from "pages/OwnerTenantDashboard/TenantDDetailsActivity";
import EditPropertyPage from "pages/Listings/EditPropertyPage";
import TenantDocuments from "pages/OwnerTenantDashboard/TenantDocuments";
import TenantTransactions from "pages/OwnerTenantDashboard/TenantTransactions";
import ManageOwner from "pages/Properties/Owner/ManageOwner";
import DummyPage from "pages/Communications/DummyPage";
import SellerInfo from "pages/Contacts2/SellerInfo";
import PropertyReminders from "pages/Properties/Reminders/PropertyReminders";
import AllReminder from "pages/Dashboard/Reminder/AllReminder";
import MessagesInfo from "pages/Communications/MessagesInfo";
import AllNotification from "components/CommonForBoth/TopbarDropdown/AllNotification";
import Options from "pages/Settings/Messages/Options";
import Email from "pages/Settings/Brand/Email";
import User from "pages/Authentication/User";
import KeyManagement from "pages/Dashboard/Management/KeyManagement";
import RentManagement from "pages/Properties/Tenant/Rent/RentManagement";
import Address from "common/Address/Address";
import SellerFolio from "pages/Properties/Seller/SellerFolio";
import SaleReceipt from "pages/Accounts/Transactions/Sale/SaleReceipt";
import SupplierFolio from "pages/Contacts2/Supplier/SupplierFolio";
import ProviderSettings from "pages/Settings/Integrations/ProviderSettings";
import ProviderSettingsForCompany from "pages/Settings/Integrations/ProviderSettingsForCompany";
import AddProvider from "pages/Settings/Integrations/AddProvider";
import ListingAllDocs from "pages/Listings/Activity/ListingAllDocs";
import MainReport from "pages/Reports/MainReport";
import BillsReport from "pages/Reports/FinancialReport/BillsReport";
import LettingFeeBills from "pages/Reports/FinancialReport/LettingFeeBills";
import LettingFeeLastMonthBills from "pages/Reports/FinancialReport/LettingFeeLastMonthBills";
import LettingFeeThisMonthBills from "pages/Reports/FinancialReport/LettingFeeThisMonthBills";
import UnpaidBills from "pages/Reports/FinancialReport/UnpaidBills";
// import CashBook from "pages/Reports/FinancialReport/CashBook/CashBookReport";
import CashBookApiReport from "pages/Reports/FinancialReport/CashBook/CashBookApiReport";
import FolioLedgerApiReport from "pages/Reports/FinancialReport/FolioLedger/FolioLedgerApiReport";
import TransactionAuditApiReport from "pages/Reports/FinancialReport/TransactionAudit/TransactionAuditApiReport";

///////////////////starts from here////////////////////////////////////////

const authProtectedRoutes = [
  {
    path: "/",
    exact: true,
    component: () => {
      if (localStorage.getItem("authUser") != null) {
        var authUser = JSON.parse(localStorage.getItem("authUser"));
        if (authUser?.user?.user_type == "Property Manager") {
          return <Redirect to="/dashboard" />;
        } else if (
          authUser?.user?.user_type == "Owner" ||
          authUser?.user?.user_type == "Tenant"
        ) {
          return <Redirect to="/owner-tenant-dashboard" />;
        } else if (authUser?.data == null) {
          return <Redirect to="/login" />;
        }
      } else {
        return <Redirect to="/login" />;
      }
    },
  },
  { path: "/dashboard", component: Dashboard },
  { path: "/allReminders", component: AllReminder },
  { path: "/users", component: User },
  { path: "/manageKeys", component: KeyManagement },


  // RegisterContact
  { path: "/admin-register", component: AdminRegister, settings: true },

  //Contacts2
  { path: "/contactList", component: Contacts2 },
  { path: "/contact", component: Contacts },
  { path: "/contact/new", component: MultipleContacts },
  { path: "/contact/edit/:id", component: ContactEdit },
  { path: "/contact/set", component: SetContacts },
  { path: "/addSupplier", component: AddSupplier2 },
  // { path: "/supplier/edit/:id", component: EditSupplier },
  { path: "/supplier/edit/:id/:tId", component: EditSupplier },
  { path: "/set/setAddSupplier/:id", component: SetAddSupplier },
  { path: "/contactsInfo/:id", component: ContactsInfo2 },
  { path: "/contactsInfo/owner/:id", component: OwnerInfo },
  { path: "/contactsInfo/tenant/:id", component: TenantInfo },
  { path: "/contactsInfo/supplier/:id", component: SupplierInfo },
  { path: "/contactsInfo/seller/:id", component: SellerInfo },
  { path: "/contactsInfoEdit", component: ContactsInfoEdit },
  //Folio
  { path: "/tenantFolio/:propertyId/:contactId/:id/:folioId", component: TenantFolio },
  { path: "/rent-management/:propertyId/:contactId", component: RentManagement },
  { path: "/ownerFolio/:propertyId/:fId", component: OwnerFolio },
  { path: "/sellerFolio/:propertyId/:fId", component: SellerFolio },
  { path: "/supplierFolio/:folio_id", component: SupplierFolio },

  // Inspections
  { path: "/inspectionInfo/:id", component: InspectionInfo },
  { path: "/inspections", component: InspectionList },
  {
    path: "/inspectionEntryReport/:insID/:propID",
    component: InspectionEntryReport,
  },
  { path: "/inspectionDay/:InsDate", component: InspectionDay },
  { path: "/inspectionDayEdit/:InsDate", component: InspectionDayEdit },

  {
    path: "/inspectionRoutineReport/:insID/:propID",
    component: InspectionRoutineReport,
  },
  {
    path: "/inspectionRoutineReportPrint/:insID",
    component: InspectionRoutineReport,
  },
  {
    path: "/inspectionExitReport/:insID/:propID",
    component: InspectionExitReport,
  },

  { path: "/planinspections", component: PlanInspection },

  // ACL 2
  { path: "/pre-menu-set", component: PrerequisiteMenu },
  { path: "/addon-list", component: AddonList, expand: true },
  { path: "/menu-price", component: MenuPrice },
  { path: "/acl-plan", component: CreatePlan },
  { path: "/user-plan", component: UserPlan },


  //profile
  { path: "/profile", component: UserProfile },


  // Reference Contact Add
  { path: "/contact/new", component: ReferenceContact },

  //Charts
  // { path: "/apex-charts", component: ChartApex },
  // { path: "/chartist-charts", component: ChartistChart },
  // { path: "/chartjs-charts", component: ChartjsChart },
  // { path: "/e-charts", component: EChart },
  // { path: "/sparkline-charts", component: SparklineChart },
  // { path: "/charts-knob", component: ChartsKnob },
  // { path: "/re-charts", component: ReCharts },

  // Icons
  { path: "/icons-boxicons", component: IconBoxicons },
  { path: "/icons-dripicons", component: IconDripicons },
  { path: "/icons-materialdesign", component: IconMaterialdesign },
  { path: "/icons-fontawesome", component: IconFontawesome },

  // Tables
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },
  { path: "/tables-dragndrop", component: DragDropTables },




  //Utility
  { path: "/pages-starter", component: PagesStarter },

  //starts from here
  { path: "/menus", component: Menu },
  { path: "/modules", component: Modules },
  { path: "/roles", component: Role },
  { path: "/user-role", component: UserRole },
  { path: "/companies", component: Company },
  //Properties
  { path: "/properties", component: Properties },
  { path: "/propertylist", component: PropertyList },
  { path: "/propertyInfo/:id", component: PropertyInfo },
  { path: "/propertyReminders/:id", component: PropertyReminders },
  { path: "/propertyEdit/:id", component: PropertyEdit },
  { path: "/propertyOwnerAdd/:id", component: PropertyOwnerAdd2 },
  { path: "/propertyTenantAdd/:id", component: PropertyTanentAdd2 },
  //Notification
  { path: "/allNotifications", component: AllNotification },
  {
    path: "/set/setPropertyTenantAdd/:id/:propertyId",
    component: setPropertyTenantAdd,
  },
  //Manage tenants
  { path: "/manageTenant/:id", component: ManageTenants },
  { path: "/manageOwner/:id", component: ManageOwner },

  {
    path: "/set/setPropertyOwnerAdd/:id/:propertyId",
    component: setPropertyOwnerAdd,
  },
  { path: "/tenant/edit/:id/:tabId", component: TenantEdit },
  { path: "/owner/edit/:id/:ownerFolioId/:tabId", component: OwnerEdit },
  //Seller
  { path: "/addSaleAgreement/:id", component: SaleAgreement },
  {
    path: "/editSaleAgreement/:id/:saleId/:tabId",
    component: EditSaleAgreement,
  },
  { path: "/saleInfo/:id", component: SaleInfo },
  //Buyer
  { path: "/addBuyer/:id/:saleId", component: AddBuyer },

  //Listings
  { path: "/listing", component: Listings },
  { path: "/listingInfo/:id", component: ListingInfo },
  { path: "/editPropertyListing/:p_id/:l_id", component: EditPropertyPage },

  //Jobs
  { path: "/maintenance", component: JobsTaskList },
  { path: "/maintenanceInfo/:id", component: JobInfo },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name

  // Task
  { path: "/tasks", component: TaskList },
  { path: "/task/show/:id", component: TaskShow },

  // Task
  { path: "/messages", component: Messages },
  { path: "/messages-details/:id", component: MessagesInfo },
  { path: "/messages-owner", component: Messages },//MessagesOwner
  { path: "/messages-tenant", component: Messages },//MessagesTenant
  { path: "/dummy", component: DummyPage },

  // Accounts
  { path: "/bills", component: BillsList },
  { path: "/upload-bills", component: UploadBillsList },
  { path: "/approval-bill-list", component: ApprovalBillList },
  { path: "/invoices", component: InvoiceList },
  { path: "/transactions", component: TransactionList },
  { path: "/saleReceipt", component: SaleReceipt },

  { path: "/upload-invoices", component: UploadInvoice },
  { path: "/banking-list", component: BankingList },
  { path: "/banking-list-data/:id", component: BankingListData },
  { path: "/banking/receipt/list/:month/:year", component: BankingReceiptList },
  { path: "/disbursement/list", component: DisbursementList },
  // { path: "/AddBills", component: AddBills },

  // IMPORT BANK FILE
  { path: "/import/bank/file", component: ImportedBankFile },
  { path: "/transaction/process", component: TransactionProcess },

  //Reconciliations
  { path: "/reconciliationsList", component: ReconciliationsList },
  { path: "/reconciliation/:id", component: Reconciliation },
  { path: "/unreconciledDeposits/:date", component: UnreconciledDeposits },

  { path: "/adjustments/:id/:year/:month", component: Adjustments },
  { path: "/banking", component: Banking },
  {
    path: "/unreconciledWithdrawals/:year/:month",
    component: UnreconciledWithdrawals2,
  },
  // { path: "/adjustments/:date/:id", component: Adjustments },
  { path: "/withdrawalsList/:month/:year", component: AllWithdrawalsList },
  { path: "/receiptsList/:date", component: ReceipctsList },
  { path: "/withDrawals/:month/:year", component: Withdrawals },

  // Activity
  { path: "/all-property-activity/:id", component: AllActvity },
  { path: "/all-contact-activity/:id", component: AllActivity },
  { path: "/all-task-activity/:id", component: TaskAllActivity },
  { path: "/all-inspection-activity/:id", component: InspectionAllActivity },
  { path: "/all-job-activity/:id", component: JobAllActivity },
  { path: "/all-listing-activity/:id", component: ListingAllActivity },

  // Document
  { path: "/all-property-document/:id", component: PropertyAllDocument },
  { path: "/all-contact-document/:id", component: AllDocument },
  { path: "/all-job-document/:id", component: JobAllDocument },
  { path: "/all-task-document/:id", component: TaskAllDocument },
  { path: "/all-listing-document/:id", component: ListingAllDocs },
  { path: "/all-inspection-document/:id", component: InspectionAllDocument },

  // ACL 2
  { path: "/acl-create-plan", component: CreatePlan },
  { path: "/acl-create-addons", component: CreateAddons },

  //Settings
  { path: "/portfolioEditCompany", component: PortfolioEdit, settings: true },
  { path: "/portfolioBanking", component: PortfolioBanking, settings: true },
  { path: "/bankFeeds", component: BankFeeds, settings: true },
  { path: "/portfolioFees", component: Fees, settings: true },
  { path: "/portfolioLabels", component: PortfolioLabels, settings: true },
  { path: "/portfolioAccounts", component: ChartOfAccounts, settings: true },
  { path: "/portfolioReasons", component: GainOrLostReasons, settings: true },
  { path: "/portfolioReminders", component: Reminders, settings: true },
  { path: "/activityLog", component: Log, settings: true },
  { path: "/activityDocuments", component: Documents, settings: true },
  { path: "/brandStatement", component: Statements, settings: true },
  { path: "/integrations", component: Integrations, settings: true },
  { path: "/providerSettings", component: ProviderSettings, settings: true },
  { path: "/addProvider", component: AddProvider, settings: true },
  { path: "/providerSettingsForCompany/:id", component: ProviderSettingsForCompany, settings: true },
  { path: "/messageOptions", component: Options, settings: true },
  { path: "/emailSettings", component: Email, settings: true },
  //address
  { path: "/address", component: Address, settings: true },
  // REPORTS
  { path: "/reports", component: MainReport },

];

const publicRoutes = [
  { path: "/home", component: Home },
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/owner-tenant-login", component: OwnerLogin },
  { path: "/check-email", component: OwnerTenantLogin },
  { path: "/my-day", component: StarterPage },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/register-owner-tenant/:id", component: Reg },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  //Owner and tenant dashboard
  { path: "/owner-tenant-dashboard", component: OTDashboard },
  { path: "/info/:id", component: OTPropInfo },
  { path: "/DashboardTenantInfo/:id", component: TenantDDetails },
  { path: "/tenantActivity/:id", component: TenantDDetailsActivity },
  { path: "/tenantDocuments/:id", component: TenantDocuments },
  { path: "/tenantTransactions/:id", component: TenantTransactions },
  { path: "/ot-jobInfo/:id", component: OTJobInfo },
  { path: "/ot-inspectionInfo/:id", component: OTInspectionInfo },
  { path: "/workOrderInvoice/:id", component: JobInfoWorkOrderActionInvoice },

  // Mail Template original views
  { path: "/view-original", component: ViewOriginalTemplateData },

  //Reconciliations invoice
  { path: "/reconciliationReport/:id", component: ReconciliationReport },
  { path: "/unreconcileItems/:date/:id", component: UnreconcileItems },
  { path: "/folioLedger/:year/:month/:day", component: FolioLedger },
  { path: "/trialBalance/:year/:month/:day", component: TrialBalance },
  {
    path: "/transactionAuditReport/:year/:month",
    component: TransactionAuditReport,
  },
  { path: "/cashBookReport/:year/:month", component: CashBookReport },
  {
    path: "/cashBookReportReceipt/:year/:month",
    component: CashBookReportReceipt,
  },
  { path: "/journalsReport/:year/:month", component: JournalsReport },
  {
    path: "/newWithDrawalsReport/:year/:month",
    component: NewWithdrawalsReport,
  },
  { path: "/printRecieptTransaction/:id", component: PrintRecieptInvoice },
  
  // REPORT
  { path: "/reports/bills", component: BillsReport },
  { path: "/reports/unpaid-bills", component: UnpaidBills },
  { path: "/reports/letting/fee", component: LettingFeeBills },
  { path: "/reports/letting/fee/last-month", component: LettingFeeLastMonthBills },
  { path: "/reports/letting/fee/this-month", component: LettingFeeThisMonthBills },
  { path: "/reports/cashbook", component: CashBookApiReport },
  { path: "/reports/folioledger", component: FolioLedgerApiReport },
  { path: "/reports/transactionaudit", component: TransactionAuditApiReport },
];

export { authProtectedRoutes, publicRoutes };
