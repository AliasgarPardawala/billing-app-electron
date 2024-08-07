export const initialInvoiceItems = {
    description: 'Test',
    quantity: 10,
    unit_price: '100.00',
    item_total: '1000.00',
    total_vat_amount: '100.00',
    unit_vat_percent: '10.00',
    unit: 'No.',
}

export const initialInvoice = {
    company_id: 1,
    invoice_number: 1001,
    invoice_date: "05/05/2024",
    invoice_items: [{...initialInvoiceItems}],
    additional_fees: {fee_type: "Test", fee_amount: 100},
    payment_status: "NOT_PAID",
    sub_total: "",
    advance_percent: "50",
    balance: "",
    purchase_order_number: "1",
    company: {},
    invoiceTitleLabel: 'Invoice No.',
    invoiceDateLabel: 'Date',
    invoiceItemDescription: 'Description',
    invoiceItemQuantity: 'Qty',
    invoiceItemQuantityRate: 'Unit Price',
    invoiceItemQuantityAmount: 'Line Total',
    invoiceItemVatPercent: "Vat",
    invoiceItemVatAmount: "Vat Amount",
    subTotalLabel: 'Sub Total',
    taxLabel: 'Sale Tax (10%)',
    totalLabel: 'TOTAL',
    notes: 'Thank you for your business',
}