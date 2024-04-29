import React from "react";
import {Route, Routes} from "react-router-dom";
import {PurchaseListing} from "./PurchaseListing.jsx";
import {CreatePurchase} from "./CreatePurchase.jsx";

export const Purchase = () => {

    return (
        <>
            <Routes>
                <Route path={"/"} element={<PurchaseListing/>}/>
                <Route path={"new"} element={<CreatePurchase/>}/>
                <Route path={":invoiceId"} element={<CreatePurchase/>}/>
            </Routes>
        </>
    );
}