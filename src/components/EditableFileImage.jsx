import {Image} from '@react-pdf/renderer'
import compose from '../styles/compose'

const EditableFileImage = ({
                               className,
                               placeholder,
                               value,
                               width,
                               pdfMode,
                           }) => {
    if (pdfMode) {
        if (value) {
            return (
                <Image
                    style={{
                        ...compose(`image ${className ? className : ''}`),
                        maxWidth: `${width}%`,
                    }}
                    src={value}
                />
            )
        } else {
            return <></>
        }
    }

    return (
        <div className={`image ${value ? 'mb-5' : ''} ${className ? className : ''}`}>
            <img
                src={value}
                className="image__img"
                alt={placeholder}
                style={{maxWidth: `${width}%` || 100}}
            />
        </div>
    )
}

export default EditableFileImage