import React, {useContext, useState} from "react";
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
    IconButton,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import {AppContext} from "../../App.jsx";

export const CompanyListing = () => {
    const {appState} = useContext(AppContext);

    const [open, setOpen] = useState(false);
    const [currentCompany, setCurrentCompany] = useState({})
    const handleOpen = () => {
        setOpen((cur) => !cur);
    }

    const companies = appState?.companies || []

    const TABLE_HEAD = ["Company Name", "Address", "Contact Person", "Email", "Contact Info", "Vat Number", ""];

    return (<>
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Clients
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        {/*<div className="w-full md:w-72">*/}
                        {/*    <Input*/}
                        {/*        label="Search"*/}
                        {/*        icon={<MagnifyingGlassIcon className="h-5 w-5"/>}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <Button className="flex items-center gap-3" size="sm" onClick={() => handleOpen()}>
                            <PlusIcon strokeWidth={2} className="h-4 w-4"/> New Client
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (<th
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
                        </th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {companies.map((company, index) => {
                        const isLast = index === companies.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (<tr key={company.company_id}>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                >
                                    {company.name}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {company.address}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {company.contact_person}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {company.email}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {company.contact}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {company.vat_no}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Tooltip content="Edit Company">
                                    <IconButton variant="text" onClick={async () => {
                                        await setCurrentCompany(company)
                                        await handleOpen()
                                    }}>
                                        <PencilIcon className="h-4 w-4"/>
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>);
                    },)}
                    </tbody>
                </table>
            </CardBody>
        </Card>
        <CreateCompanyModal open={open} handleOpen={handleOpen} company={currentCompany}/>
    </>);
}

export const CreateCompanyModal = ({open, handleOpen, company}) => {

    const {appState, setAppState} = useContext(AppContext);

    const isEdit = !!company.company_id

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget);
        const body = {};
        for (const [key, value] of form.entries()) {
            body[key] = value;
        }

        try {
            isEdit
                ? await appState.companyApi.update(company.company_id, body)
                : await appState.companyApi.create(body)

            const companies = await appState.companyApi.getAll()

            setAppState({...appState, companies: companies})
            handleOpen()

        } catch (e) {
            console.log(e)
        }
    }

    const FORM_FIELDS = [
        {
            label: "Company Name *",
            name: "name",
            type: "text",
            value: isEdit ? company.name : "",
            placeholder: "Company Name",
            required: true,
        },
        {
            label: "Address *",
            name: "address",
            type: "text",
            value: isEdit ? company.address : "",
            placeholder: "Address",
            required: true,
        },
        {
            label: "Company Info",
            name: "description",
            type: "text",
            value: isEdit ? company.description : "",
            placeholder: "Company Info",
            required: false
        },
        {
            label: "Contact Person *",
            name: "contact_person",
            type: "text",
            value: isEdit ? company.contact_person : "",
            placeholder: "Contact Person",
            required: true
        },
        {
            label: "Contact Number *",
            name: "contact",
            type: "number",
            value: isEdit ? company.contact : "",
            placeholder: "Contact Number",
            required: true
        },
        {
            label: "Email *",
            name: "email",
            type: "email",
            value: isEdit ? company.email : "",
            placeholder: "Email",
            required: true,
            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
            validationMessage: "Please enter a valid email address"
        },
        {
            label: "VAT Number",
            name: "vat_no",
            type: "text",
            value: isEdit ? company.vat_no : "",
            placeholder: "VAT Number",
            required: false
        },
    ]

    const renderInput = (label, name, type, value, placeHolder, pattern, validationMessage, required) => {
        const onInvalid = (e) => e.target.setCustomValidity('Cannot be empty')
        const onInput = (e) => e.target.setCustomValidity('')

        return (
            <label htmlFor={name} className="mb-5">
                <Typography className="-mb-2" variant="h6">
                    {label}
                </Typography>
                <input
                    type={type}
                    name={name}
                    id={name}
                    defaultValue={value}
                    className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    placeholder={placeHolder}
                    required={required}
                    pattern={pattern}
                    {...(required && {onInvalid})}
                    {...(required && {onInput})}
                />
                {!!pattern && !!validationMessage &&
                    <span
                        className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {validationMessage}
                    </span>
                }
            </label>
        )
    }


    return (
        <>
            <Dialog
                size="lg"
                open={open}
                handler={handleOpen}
                dismiss={{enabled: false}}
            >
                <DialogHeader className={"mx-auto max-w-[90%]"}>
                    <Typography variant="h4" color="blue-gray">
                        {isEdit ? "Edit Company" : "Create Company"}
                    </Typography>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="group">
                    <DialogBody className="h-[60vh] mx-auto max-w-[90%] flex flex-col gap-4 overflow-y-auto">
                        {FORM_FIELDS.map((field) => {
                            return (
                                <div key={field.name + field.label}>
                                    {renderInput(field.label, field.name, field.type, field.value, field.placeholder, field.pattern, field.validationMessage, field.required)}
                                </div>
                            )
                        })}
                    </DialogBody>
                    <DialogFooter className="flex flex-row gap-4 space-x-2 mx-auto max-w-[90%]">
                        <Button type="submit" color="black">
                            {isEdit ? "Update" : "Create"}
                        </Button>
                        <Button variant="text" color="blue-gray" onClick={handleOpen}>
                            cancel
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}