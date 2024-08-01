// eslint-disable-next-line no-unused-vars
import React from 'react'
import {BlobProvider} from '@react-pdf/renderer'
import {InvoicePage} from '../pages/invoices/InvoicePage.jsx'
import {Button} from "@material-tailwind/react";
import {InvoicePdf} from "../pdf/InvoicePdf.jsx";

// eslint-disable-next-line react/prop-types
const Download = ({data, onClick}) => {
    return (
        <div className={'download-pdf'}>
            <BlobProvider
                key={'pdf'}
                document={<InvoicePdf data={data}/>}>
                {({blob, url, loading, error}) => (
                    <Button onClick={async () => {
                        const buffer = await blob.arrayBuffer()
                        const data = {title: "Test", type: 'Invoices', document: buffer}
                        await window.electron.ipcRenderer.sendMessage('save-pdf', data)
                        onClick && onClick()
                    }}>Save</Button>
                )}
            </BlobProvider>
            {/*<PDFDownloadLink*/}
            {/*    key="pdf"*/}
            {/*    document={<InvoicePage pdfMode={true} data={data}/>}*/}
            {/*    fileName={`invoice.pdf`}*/}
            {/*    aria-label="Save PDF"*/}
            {/*    title="Save PDF"*/}
            {/*    className="download-pdf__pdf"*/}
            {/*>*/}
            {/*    {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Download now!')}*/}
            {/*</PDFDownloadLink>*/}
        </div>
    )
}

export default Download