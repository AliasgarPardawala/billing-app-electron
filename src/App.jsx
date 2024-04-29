import './App.css';
import './index.css';
import {createContext, useEffect, useState} from "react";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {SideNavigation} from "./components/SideNavigation.jsx";
import {CompanyListing} from "./pages/company/CompanyListing.jsx";
import {Invoice} from "./pages/invoices/Invoice.jsx";
import {Quotation} from "./pages/quotations/Quotation.jsx";
import {Purchase} from "./pages/purchase/Purchase.jsx";
import HttpClient from "./api/HttpClient.js";
import ApiClient from "./api/ApiClient.js";
import CompanyApi from "./api/CompanyApi.js";
import InvoiceApi from "./api/InvoiceApi.js";
import PurchaseApi from "./api/PurchaseApi.js";
import QuotationApi from "./api/QuotationApi.js";


export const AppContext = createContext({})

function App() {
    const httpClient = new HttpClient()
    const apiClient = new ApiClient(httpClient)
    const companyApi = new CompanyApi(apiClient)
    const invoiceApi = new InvoiceApi(apiClient)
    const quotationApi = new QuotationApi(apiClient)
    const purchaseApi = new PurchaseApi(apiClient)


    const [appState, setAppState] = useState({httpClient, apiClient, companyApi})


    useEffect( () => {
        const getData = async () => {
            const companies = await companyApi.getAll()
            const invoices = await invoiceApi.getAll()
            const quotations = await quotationApi.getAll()
            const purchases = await purchaseApi.getAll()
            setAppState({
                ...appState,
                companies: companies,
                invoices: invoices,
                quotations: quotations,
                purchases: purchases
            })
        }
        getData();
        // Empty dependency array to prevent infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <AppContext.Provider value={{appState, setAppState}}>
            <BrowserRouter style={{width: "100%", height: "100%"}}>
                <div className={"flex flex-grow"}>
                    <SideNavigation/>
                    <div style={{flexGrow: 1, background: "#fefefe"}}>
                        <Routes>
                            <Route path={"/billing-app-electron"} element={<Invoice/>}></Route>
                            <Route path={"/billing-app-electron/invoices/*"} element={<Invoice/>}/>
                            <Route path={"/billing-app-electron/quotations/*"} element={<Quotation/>}/>
                            <Route path={"/billing-app-electron/purchases/*"} element={<Purchase/>}/>
                            <Route path={"/billing-app-electron/companies"} element={<CompanyListing/>}/>
                        </Routes>
                        <Outlet/>
                    </div>
                </div>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
