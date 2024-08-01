import React from "react";
import {Document, Image} from '@react-pdf/renderer'
import {Page} from '@react-pdf/renderer'
import {View} from '@react-pdf/renderer'
import {Text} from '@react-pdf/renderer'
import compose from "../styles/compose.js";
import logo from "../images/logo.png";


// eslint-disable-next-line react/prop-types
export const InvoicePdf = ({data}) => {

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
        const companyData = data

        return !companyData ? "" : _getValue(key.split("."), companyData)
    }

    return (
        <Document>
            <Page size="A4" style={compose('page overflow-scroll')}>
                <View style={compose('view my-10 mx-20')}>
                    <View style={compose("view flex flex-row justify-between")}>
                        <View>
                            <Image
                                style={{...compose(`image logo`), maxWidth: `${50}%`}}
                                src={logo}
                            />
                            <Text style={compose('block fs-14 text-start font-bold text-xl')}>
                                {"Murtaza Khuzaima General Trading L.L.C"}
                            </Text>
                            <Text style={compose('block fs-12 text-start italic mt-4')}>
                                {"QUALITY, TRANSPARENCY, AFFORDABILITY. "}
                            </Text>
                        </View>
                        <View
                            style={compose(' view mt-20 w-45 flex flex-col justify-end content-end items-end text-end')}>
                            <Text style={compose('text-6xl text-gray-600 font-thin text-end mb-14')}>
                                {"INVOICE."}
                            </Text>
                            <Text style={compose('span text-end')}>
                                {`${data.invoiceDateLabel}: ${getCompanyDetails('invoice_date')}`}
                            </Text>
                            <Text style={compose('span text-end')}>
                                {`${data.invoiceTitleLabel}: ${getCompanyDetails('invoice_number')}`}
                            </Text>
                            <View style={compose("view flex flex-col content-end justify-end mt-10")}>
                                <Text style={compose('span text-end')}>
                                    {`COMPANY: ${getCompanyDetails('company.name')}`}
                                </Text>
                                <Text style={compose('span text-end')}>
                                    {`Address: ` + (getCompanyDetails('company.address'))}
                                </Text>
                                <Text style={compose('span text-end')}>
                                    {'Contact: ' + getCompanyDetails('company.contact_person')}
                                </Text>
                                <Text style={compose('span text-end')}>
                                    {getCompanyDetails('company.contact')}
                                </Text>
                                <Text style={compose('span text-end')}>
                                    {getCompanyDetails('company.email')}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <InvoiceItemsTablePdf data={data} getCompanyDetails={getCompanyDetails}/>

                    <View style={compose("view mt-20 w-full")}>
                        <Text style={compose('span w-full text-center')}>{data.notes}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}


const InvoiceItemsTablePdf = ({data, getCompanyDetails}) => {

    return (
        <>
            <View style={compose("view flex mt-20")}>
                <View style={compose("w-15 w-[15%] fs-12 text-start")}>
                    <Text>{data.invoiceItemQuantity}</Text>
                </View>
                <View style={compose("view w-[45%] w-45 fs-12 text-start")}>
                    <Text>{data.invoiceItemDescription}</Text>
                </View>
                <View style={compose("view w-[15%] w-15 fs-12 text-start")}>
                    <Text>{data.invoiceItemQuantityRate}</Text>
                </View>
                <View style={compose("view w-[15%] w-15 fs-12 text-start")}>
                    <Text>{data.invoiceItemVatPercent}</Text>
                </View>
                <View style={compose("view w-[15%] w-15 fs-12 text-start")}>
                    <Text>{data.invoiceItemVatAmount}</Text>
                </View>
                <View style={compose("view w-[15%] w-15 fs-12 text-start")}>
                    <Text>{data.invoiceItemQuantityAmount}</Text>
                </View>
                <View style={compose('view w-[5%]')}/>
            </View>
            {data.invoice_items?.map((productLine, index) => {
                return (
                    <View key={index} style={compose(`view flex ${index === 0 ? 'border-top' : ''}`)}>
                        <View style={compose(`view w-15 w-[15%] border border-left flex`)}>
                            <Text style={compose('span mt-2 dark text-center w-full')}>
                                {getCompanyDetails(`invoice_items.${index}.quantity`) + getCompanyDetails(`invoice_items.${index}.unit`)}
                            </Text>
                        </View>
                        <View style={compose("view w-[45%] w-45 border")}>
                            <Text style={compose('span mt-2 dark text-start w-full')}>
                                {getCompanyDetails(`invoice_items.${index}.description`)}
                            </Text>
                        </View>
                        <View style={compose("view w-[15%] w-15 border")}>
                            <Text style={compose('span mt-2 dark text-center w-full')}>
                                {getCompanyDetails(`invoice_items.${index}.unit_price`)}
                            </Text>
                        </View>
                        <View style={compose("view w-[15%] w-15 border")}>
                            <Text style={compose('span mt-2 dark text-center w-full')}>
                                {getCompanyDetails(`invoice_items.${index}.unit_vat_percent`)}
                            </Text>
                        </View>
                        <View style={compose("view w-[15%] w-15 border")}>
                            <Text style={compose('span mt-2 dark text-center w-full')}>
                                {getCompanyDetails(`invoice_items.${index}.total_vat_amount`)}
                            </Text>
                        </View>
                        <View style={compose("view pt-2 w-[15%] w-15 border")}>
                            <Text style={compose("span dark text-center w-full")}>
                                {productLine.item_total}
                            </Text>
                        </View>
                    </View>
                )
            })}
            <View style={compose('view flex')}>
                <View style={compose("view w-83 w-[83.3%] pr-8 fs-12 text-end")}>
                    <Text style={compose('span mt-2')}>
                        {'SubTotal'}
                    </Text>
                </View>
                <View style={compose("view w-[12%] w-12 fs-12 text-star border border-left")}>
                    <Text style={compose('span mt-2 align-middle')}>
                        {data.sub_total}
                    </Text>
                </View>
            </View>
            <View style={compose('view flex')}>
                <View style={compose("view w-80 w-[83.3%] pr-8 fs-12 text-end flex justify-end")}>
                    <Text style={compose('span mt-2 align-middle')}>
                        {`${getCompanyDetails(`advance_percent`)} % Advance`}
                    </Text>
                </View>
                <View style={compose("view w-[12%] w-12 fs-12 text-star border border-left")}>
                    <Text style={compose('span mt-2 align-middle')}>
                        {(data.advance_percent / 100 * data.sub_total).toFixed(2)}
                    </Text>
                </View>
            </View>
            <View style={compose('view flex')}>
                <View style={compose("view w-80 w-[83.3%] pr-8 fs-12 text-end")}>
                    <Text style={compose('span mt-2 align-middle')}>
                        {`Balance`}
                    </Text>
                </View>
                <View style={compose("view w-[12%] w-12 fs-12 text-star border border-left")}>
                    <Text style={compose('span mt-2 align-middle')}>
                        {data.balance}
                    </Text>
                </View>
            </View>
        </>
    )

}