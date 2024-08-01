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
    const {appState, setAppState} = useContext(AppContext);

    const invoices = appState?.invoices || []

    const TABLE_HEAD = ["Company", "Invoice Number" ,"Invoice Date", "Amount", "Status", "", "", ""];

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
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head + index}
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
                                                {invoice.invoice_number}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {new Date(invoice.invoice_date).toLocaleDateString('en-GB')}
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
                                            <Typography
                                                className={'text-blue-400 font-bold cursor-pointer hover:text-blue-600'}>
                                                View
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit Invice">
                                                <IconButton variant="text">
                                                    <PencilIcon
                                                        className="h-4 w-4"
                                                        onClick={async () => {
                                                            const data = await appState.invoiceApi.get(invoice.invoice_id)
                                                            navigate(`/billing-app-electron/invoices/${invoice.invoice_number}`, {state: data})
                                                        }}/>
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Delete Invice">
                                                <Typography className={'text-red-500 font-bold cursor-pointer hover:text-red-600'} onClick={async () => {
                                                    await appState.invoiceApi.delete(invoice.invoice_id)
                                                    const invoices = await appState.invoiceApi.getAll();
                                                    setAppState({
                                                      ...appState,
                                                      invoices: invoices
                                                    })
                                                }}
                                                >
                                                    Delete
                                                </Typography>
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