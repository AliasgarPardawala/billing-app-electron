import React from "react";
import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {InvoiceListing} from "./InvoiceListing.jsx";
import {InvoicePage} from "./InvoicePage.jsx"

export const Invoice = () => {

    const location = useLocation()
    const param = useParams()
    const navigation = useNavigate()


    return (
        <>
        <Routes>
            <Route path={"/"} element={<InvoiceListing/>}/>
            <Route path={"new"} element={<InvoicePage pdfMode={false} navigation={navigation} param={param} location={location}/>}/>
            <Route path={":invoiceId"} element={<InvoicePage pdfMode={false} navigation={navigation} param={param} location={location}/>}/>
        </Routes>
        </>
    );
}