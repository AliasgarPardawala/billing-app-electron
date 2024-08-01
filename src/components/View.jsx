import { View as PdfView } from '@react-pdf/renderer'
import compose from '../styles/compose'

const View = ({ className, pdfMode, children }) => {
    return (
        <>
            {pdfMode ? (
                <PdfView style={compose('view ' + (className ? className : ''))}>{children}</PdfView>
            ) : (
                <div className={'' + (className ? className : '')}>{children}</div>
            )}
        </>
    )
}

export default View