import React, {useContext} from "react";
import {PencilIcon} from "@heroicons/react/24/solid";
import {
    PlusIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {AppContext} from "../../App.jsx";

export const InvoiceListing = () => {
    const {appState} = useContext(AppContext);

    const invoices = appState?.invoices || []

    const TABLE_HEAD = ["Company", "Invoice Date", "Amount", "Status", ""];

    const navigate = useNavigate()

    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Invoices
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <NavLink to={"new"}>
                                <Button
                                    className="flex items-center gap-3" size="sm"
                                    onClick={() => navigate("new")}
                                >
                                    <PlusIcon strokeWidth={2} className="h-4 w-4"/> New Invoice
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {invoices.map((invoice, index) => {
                                const isLast = index === invoices.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={invoice.invoice_id}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {invoice.company_name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {invoice.invoice_date}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {invoice.sub_total}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={invoice.payment_status}
                                                    color={
                                                        invoice.payment_status === "paid"
                                                            ? "green"
                                                            : invoice.payment_status === "advance paid"
                                                                ? "amber"
                                                                : "red"
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit User">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4"/>
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
            <Outlet/>
        </>
    );
}