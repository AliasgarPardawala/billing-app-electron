import {useState, useEffect, useContext} from 'react'
import EditableInput from '../../components/EditableInput.jsx'
import Document from '../../components/Document.jsx'
import Page from '../../components/Page.jsx'
import View from '../../components/View.jsx'
import Text from '../../components/Text.jsx'
import {Font} from '@react-pdf/renderer'
import Download from '../../components/DownloadPDF.jsx'
import {initialInvoice} from "../../data/initialData.js";
import logo from "../../images/logo.png"
import EditableSelect from "../../components/EditableSelect.jsx";
import {AppContext} from "../../App.jsx";
import EditableTextarea from "../../components/EditableTextArea.jsx";
import EditableFileImage from "../../components/EditableFileImage.jsx";
import InvoiceItemsTable from "../../components/InvoiceItemsTable.jsx";
import Roboto from "../../assets/fonts/Roboto-Regular.ttf"
import RobotoBold from "../../assets/fonts/Roboto-Bold.ttf"
import RobotoThin from "../../assets/fonts/Roboto-Thin.ttf"
import {Button} from "@material-tailwind/react";


Font.register({
    family: 'Roboto',
    fonts: [
        {src: Roboto}
    ],
})

Font.register({
    family: 'Roboto-Bold',
    fonts: [
        {src: RobotoBold}
    ],
})

Font.register({
    family: 'Roboto-Thin',
    fonts: [
        {src: RobotoThin}
    ],
})


export const InvoicePage = ({data, pdfMode, navigation, location, param}) => {
    const {appState} = useContext(AppContext);

    const isEdit = !!param && !!param['*'] && !isNaN(param['*'])

    const companies = appState?.companies || []

    const [invoice, setInvoice] = useState(data ? {...data, company: {...data?.company}} : {...initialInvoice})

    const handleChange = (name, value) => {
        if (name !== 'invoice_items') {
            const newInvoice = {...invoice}

            if (name === 'logoWidth' && typeof value === 'number') {
                newInvoice[name] = value
            } else if (name === "company") {
                const company = appState.companies.find((company) => company.name === value)
                newInvoice['company'] = company
            } else if (name !== 'logoWidth' && typeof value === 'string') {
                newInvoice[name] = value
            }
            setInvoice(newInvoice)
        }
    }

    useEffect(() => {
        if (!!companies.length) {
            handleChange('company', companies[0].name)
        }
    }, [companies])


    const _getValue = (path, data) => {
        if (path.length === 0) {
            return data;
        }

        const [name, ...rest] = path;

        if (!(name in data)) {
            return ""
        }

        return _getValue(rest, data[name]);
    }

    const getCompanyDetails = (key) => {
        const companyData = pdfMode ? data : invoice

        return !companyData ? "" : _getValue(key.split("."), companyData)
    }

    const validateInvoice = () => {
    }

    return (
        <Document pdfMode={pdfMode}>
            <Page className="overflow-scroll" pdfMode={pdfMode}>
                <View className={'my-10 mx-20'} pdfMode={pdfMode}>
                    <View className="flex flex-row justify-between" pdfMode={pdfMode}>
                        <View pdfMode={pdfMode}>
                            <EditableFileImage
                                className="logo"
                                placeholder="Your Logo"
                                value={logo}
                                width={50}
                                pdfMode={pdfMode}
                            />
                            <Text pdfMode={pdfMode}
                                  className={'block fs-14 text-start font-bold text-xl'}>{"Murtaza Khuzaima General Trading L.L.C"}</Text>
                            <Text pdfMode={pdfMode}
                                  className={'block fs-12 text-start italic mt-4'}>{"QUALITY, TRANSPARENCY, AFFORDABILITY. "}</Text>
                        </View>
                        <View pdfMode={pdfMode}
                              className={'mt-20 w-45 flex flex-col justify-end content-end items-end text-end'}>
                            <Text pdfMode={pdfMode}
                                  className={'text-6xl text-gray-600 font-thin text-end mb-14'}>{"INVOICE."}</Text>
                            <EditableInput
                                className={'text-end'}
                                value={getCompanyDetails('invoice_date')}
                                onChange={(date) => handleChange('invoice_date', date)}
                                pdfMode={pdfMode}
                                prefix={`${invoice.invoiceDateLabel}: `}
                            />
                            <EditableInput
                                className={"text-end"}
                                value={getCompanyDetails('invoice_number')}
                                onChange={(value) => handleChange('invoice_number', value)}
                                pdfMode={pdfMode}
                                prefix={`${invoice.invoiceTitleLabel} `}
                            />
                            <View className={"flex flex-col content-end justify-end mt-10"} pdfMode={pdfMode}>
                                <EditableSelect
                                    className={"text-end"}
                                    options={companies.map((company) => {
                                        return {
                                            text: company.name,
                                            value: company.name
                                        }
                                    })}
                                    value={getCompanyDetails('company.name')}
                                    onChange={(value) => handleChange('company', value)}
                                    pdfMode={pdfMode}
                                    prefix={'COMPANY: '}
                                />
                                <Text pdfMode={pdfMode} className={'text-end'}>
                                    {`Address: ` + (getCompanyDetails('company.address'))}
                                </Text>
                                <Text pdfMode={pdfMode} className={"text-end"}>
                                    {'Contact: ' + getCompanyDetails('company.contact_person')}
                                </Text>
                                <Text pdfMode={pdfMode}
                                      className={"text-end"}>{getCompanyDetails('company.contact')}</Text>
                                <Text pdfMode={pdfMode}
                                      className={"text-end"}>{getCompanyDetails('company.email')}</Text>
                            </View>
                        </View>
                    </View>

                    <InvoiceItemsTable pdfMode={pdfMode} setInvoice={setInvoice}
                                       data={pdfMode ? data.invoice_items : invoice.invoice_items}
                                       invoice={pdfMode ? data : invoice} getCompanyDetails={getCompanyDetails}/>

                    <View className="mt-20 w-full" pdfMode={pdfMode}>
                        <EditableTextarea
                            className="w-full text-center"
                            rows={2}
                            value={invoice.notes}
                            onChange={(value) => handleChange('notes', value)}
                            pdfMode={pdfMode}
                        />
                    </View>
                </View>
            </Page>
            {!pdfMode &&
                <div className={'flex justify-center my-5 gap-4'}>
                    <Button onClick={() => navigation("/billing-app-electron/invoices")}>
                        Cancel
                    </Button>
                    <Download
                        data={invoice}
                        onClick={() => {
                            try {
                                validateInvoice()
                                appState.invoiceApi.create(invoice)
                            } catch (e) {
                                console.log(e)
                                return;
                            }

                            navigation(-1)
                    }}
                    />
                </div>
            }
        </Document>
    )
}