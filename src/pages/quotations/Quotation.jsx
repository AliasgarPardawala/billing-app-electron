import React from "react";
import {Route, Routes} from "react-router-dom";
import {QuotationListing} from "./QuotationListing.jsx";
import {CreateQuotation} from "./CreateQuotation.jsx";

export const Quotation = () => {

    return (
        <>
            <Routes>
                <Route path={"/"} element={<QuotationListing/>}/>
                <Route path={"new"} element={<CreateQuotation/>}/>
                <Route path={":invoiceId"} element={<CreateQuotation/>}/>
            </Routes>
        </>
    );
}