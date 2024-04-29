import React from "react";
import {useLocation, useNavigate} from "react-router-dom"
import invoice from "../images/invoice.png"
import customer from "../images/customers.png"
import logo from "../images/logo.png"
import {Card, List, ListItem, ListItemPrefix} from "@material-tailwind/react";


export const SideNavigation = () => {
    const navOptions = [
        {
            img: invoice,
            name: "Invoice",
            path: "/invoices"
        },
        {
            img: invoice,
            name: "Quotation",
            path: "/quotations"
        },
        {
            img: invoice,
            name: "Purchase",
            path: "/purchases"
        },
        {
            img: customer,
            name: "Company",
            path: "/companies"
        },
    ]

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Card className="h-[calc(100vh)] max-w-[15rem] shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <img className={'max-w-[5rem]'} src={logo} alt={"logo"}/>
            </div>
            <List>
                {navOptions.map((navOption) => {
                    return (
                        <ListItem key={navOption.path} className={location.pathname.startsWith(navOption.path) ? 'bg-blue-gray-50' : ''} onClick={() => navigate(navOption.path)}>
                            <ListItemPrefix>
                                <img style={{color: 'black'}} width={'24px'} height={'24px'} src={navOption.img}
                                     alt={'Icon'}/>
                            </ListItemPrefix>
                            {navOption.name}
                        </ListItem>
                    )
                })}
            </List>
        </Card>
    )
}