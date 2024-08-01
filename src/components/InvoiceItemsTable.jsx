import View from "./View.jsx";
import Text from "./Text.jsx";
import EditableInput from "./EditableInput.jsx";
import EditableTextarea from "./EditableTextArea.jsx";
import {PlusCircleIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";
import {initialInvoiceItems} from "../data/initialData.js";
import {useEffect} from "react";

// eslint-disable-next-line react/prop-types
const InvoiceItemsTable = ({data, pdfMode, getCompanyDetails, setInvoice, invoice}) => {

    useEffect(() => {
        const subTotal = invoice.invoice_items.reduce((total, it) => Number(total + it.item_total), 0).toFixed(2)

        const advanceAmount =  (invoice.advance_percent / 100 * subTotal).toFixed(2)

        const balanceAmount = (subTotal - advanceAmount).toFixed(2) ?? 1
        console.log(balanceAmount)

        const newInvoice = {...invoice, sub_total: subTotal, balance: balanceAmount}
        setInvoice(newInvoice)

    }, [data, setInvoice])

    const handleInvoiceItemChange = (index, name, value) => {
        // eslint-disable-next-line react/prop-types
        const invoice_items = invoice.invoice_items.map((invoiceItem, i) => {
            if (i === index) {
                const newInvoiceItem = {...invoiceItem}

                if (name === 'description' || name === 'quantity') {
                    newInvoiceItem[name] = value
                } else {
                    if (
                        value[value.length - 1] === '.' ||
                        (value[value.length - 1] === '0' && value.includes('.'))
                    ) {
                        newInvoiceItem[name] = value
                    } else {
                        const n = parseFloat(value)

                        newInvoiceItem[name] = (n ? n : 0).toString()
                    }
                }
                const totals = calculateAmount(newInvoiceItem.quantity, newInvoiceItem.unit_price, newInvoiceItem.unit_vat_percent)

                newInvoiceItem['item_total'] = totals.totalAmount
                newInvoiceItem['total_vat_amount'] = totals.vatAmount

                return newInvoiceItem
            }

            return {...invoiceItem}
        })

        setInvoice({...invoice, invoice_items})
    }

    const handleRemove = (i) => {
        const invoiceItems = invoice.invoice_items.filter((_, index) => index !== i)

        setInvoice({...invoice, invoiceItems})
    }

    const handleAdd = () => {
        const invoice_items = [...invoice.invoice_items, {...initialInvoiceItems}]

        setInvoice({...invoice, invoice_items})
    }

    const calculateAmount = (quantity, rate, unitVatPercent) => {
        const quantityNumber = parseFloat(quantity)
        const rateNumber = parseFloat(rate)
        const vatPercent = parseFloat(unitVatPercent)

        const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0
        const vatAmount = amount && vatPercent ? amount / vatPercent : 0
        const totalAmount = amount + vatAmount

        return {vatAmount: vatAmount.toFixed(2), totalAmount: totalAmount.toFixed(2)}
    }

    const subTotal = () => invoice.invoice_items.reduce((total, it) => Number(total + it.item_total), 0).toFixed(2)

    const advanceAmount = () => (invoice.advance_percent / 100 * subTotal()).toFixed(2)

    const balanceAmount = () => (subTotal() - advanceAmount()).toFixed(2)


    return (
        <>
            <View className="flex mt-20" pdfMode={pdfMode}>
                <View className="w-15 w-[15%] fs-12 text-start" pdfMode={pdfMode}>
                    <Text pdfMode={pdfMode} className={''}>{invoice.invoiceItemQuantity}</Text>
                </View>
                <View className="w-[45%] w-45 fs-12 text-start" pdfMode={pdfMode}>
                    <Text pdfMode={pdfMode} className={''}>{invoice.invoiceItemDescription}</Text>
                </View>
                <View className="w-[15%] w-15 fs-12 text-start" pdfMode={pdfMode}>
                    <Text pdfMode={pdfMode} className={''}>{invoice.invoiceItemQuantityRate}</Text>
                </View>
                <View className="w-[15%] w-15 fs-12 text-start" pdfMode={pdfMode}>
                    <Text pdfMode={pdfMode} className={''}>{invoice.invoiceItemVatPercent}</Text>
                </View>
                <View className="w-[15%] w-15 fs-12 text-start" pdfMode={pdfMode}>
                    <Text pdfMode={pdfMode} className={''}>{invoice.invoiceItemVatAmount}</Text>
                </View>
                <View className="w-[15%] w-15 fs-12 text-start" pdfMode={pdfMode}>
                    <Text pdfMode={pdfMode} className={''}>{invoice.invoiceItemQuantityAmount}</Text>
                </View>
                <View pdfMode={pdfMode} className={'w-[5%]'}/>
            </View>
            {data?.map((productLine, index) => {
                return (
                    <View key={index} className={`flex ${index === 0 ? 'border-top' : ''}`} pdfMode={pdfMode}>
                        <View className={`w-15 w-[15%] border border-left flex`} pdfMode={pdfMode}>
                            <EditableInput
                                className="dark text-end w-full"
                                value={getCompanyDetails(`invoice_items.${index}.quantity`)}
                                onChange={(value) => handleInvoiceItemChange(index, 'quantity', value)}
                                pdfMode={pdfMode}
                            />
                            <EditableInput
                                className="dark text-start w-full"
                                value={getCompanyDetails(`invoice_items.${index}.unit`)}
                                onChange={(value) => handleInvoiceItemChange(index, 'unit', value)}
                                pdfMode={pdfMode}
                            />
                        </View>
                        <View className="w-[45%] w-45 border" pdfMode={pdfMode}>
                            <EditableTextarea
                                className="mt-2 dark text-start w-full"
                                rows={2}
                                placeholder="Enter item name/description"
                                value={getCompanyDetails(`invoice_items.${index}.description`)}
                                onChange={(value) => handleInvoiceItemChange(index, 'description', value)}
                                pdfMode={pdfMode}
                            />
                        </View>
                        <View className="w-[15%] w-15 border" pdfMode={pdfMode}>
                            <EditableInput
                                className="mt-2 dark text-center w-full"
                                value={getCompanyDetails(`invoice_items.${index}.unit_price`)}
                                onChange={(value) => handleInvoiceItemChange(index, 'unit_price', value)}
                                pdfMode={pdfMode}
                            />
                        </View>
                        <View className="w-[15%] w-15 border" pdfMode={pdfMode}>
                            <EditableInput
                                className="mt-2 dark text-center w-full"
                                value={getCompanyDetails(`invoice_items.${index}.unit_vat_percent`)}
                                onChange={(value) => handleInvoiceItemChange(index, 'unit_vat_percent', value)}
                                pdfMode={pdfMode}
                            />
                        </View>
                        <View className="w-[15%] w-15 border" pdfMode={pdfMode}>
                            <EditableInput
                                className="mt-2 dark text-center w-full"
                                value={getCompanyDetails(`invoice_items.${index}.total_vat_amount`)}
                                onChange={(value) => handleInvoiceItemChange(index, 'total_vat_amount', value)}
                                pdfMode={pdfMode}
                            />
                        </View>
                        <View className="pt-2 w-[15%] w-15 border" pdfMode={pdfMode}>
                            <Text className="dark text-center w-full" pdfMode={pdfMode}>
                                {productLine.item_total}
                            </Text>
                        </View>
                        {!pdfMode && (
                            <span
                                className={'w-[5%] m-auto ml-2'}
                                aria-label="Remove Row"
                                title="Remove Row"
                                onClick={() => handleRemove(index)}
                            >
                                <TrashIcon className={'h-5'}/>
                            </span>
                        )}
                    </View>
                )
            })}
                <View className={'flex'}>
                    <View className="w-83 w-[83.3%] pr-8 fs-12 text-end" pdfMode={pdfMode}>
                        <Text pdfMode={pdfMode} className={'mt-2'}>{'SubTotal'}</Text>
                    </View>
                    <View className="w-[12%] w-12 fs-12 text-star border border-left" pdfMode={pdfMode}>
                        <Text pdfMode={pdfMode} className={'mt-2 align-middle'}>{invoice.sub_total}</Text>
                    </View>
                </View>
                <View className={'flex'}>
                    <View className="w-80 w-[83.3%] pr-8 fs-12 text-end flex justify-end" pdfMode={pdfMode}>
                        <EditableInput
                            className="mt-2 dark text-center w-[40px]"
                            value={getCompanyDetails(`advance_percent`)}
                            onChange={(value) => {
                                if (!isNaN(value)) {
                                    setInvoice({...invoice, advance_percent: value})
                                }
                            }}
                            pdfMode={pdfMode}
                        />
                        <Text pdfMode={pdfMode} className={'mt-2 align-middle'}>{`% Advance`}</Text>
                    </View>
                    <View className="w-[12%] w-12 fs-12 text-star border border-left" pdfMode={pdfMode}>
                        <Text pdfMode={pdfMode} className={'mt-2 align-middle'}>{(invoice.advance_percent / 100 * invoice.sub_total).toFixed(2)}</Text>
                    </View>
                </View>
                <View className={'flex'}>
                    <View className="w-80 w-[83.3%] pr-8 fs-12 text-end" pdfMode={pdfMode}>
                        <Text pdfMode={pdfMode} className={'mt-2 align-middle'}>{`Balance`}</Text>
                    </View>
                    <View className="w-[12%] w-12 fs-12 text-star border border-left" pdfMode={pdfMode}>
                        <Text pdfMode={pdfMode} className={'mt-2 align-middle'}>{invoice.balance}</Text>
                    </View>
                </View>


            {!pdfMode &&
                <View className="flex justify-end content-center mt-4" pdfMode={pdfMode}>
                    <button className="flex" onClick={handleAdd}>
                        <PlusCircleIcon className={'h-5 mr-1 mt-0.5'}/>Add Item
                    </button>
                </View>
            }
        </>
    )
}

export default InvoiceItemsTable