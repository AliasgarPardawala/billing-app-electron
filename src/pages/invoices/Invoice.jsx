import React from "react";
import {Route, Routes} from "react-router-dom";
import {InvoiceListing} from "./InvoiceListing.jsx";
import {CreateInvoice} from "./CreateInvoice.jsx";

export const Invoice = () => {

    return (
        <>
        <Routes>
            <Route path={"/"} element={<InvoiceListing/>}/>
            <Route path={"new"} element={<CreateInvoice/>}/>
            <Route path={":invoiceId"} element={<CreateInvoice/>}/>
        </Routes>
        </>
    );
}