import { Text } from '@react-pdf/renderer'
import compose from '../styles/compose'


const EditableInput = ({ className, placeholder, value, onChange, pdfMode, prefix = "", readOnly = false }) => {
    return (
        <>
            {pdfMode ? (
                <Text style={compose('span ' + (className ? className : ''))}>{prefix + value}</Text>
            ) : (
                <div className={'flex'}>
                    <span>{prefix}</span>
                <input
                    type="text"
                    className={'input ' + (className ? className : '')}
                    placeholder={placeholder || ''}
                    value={value || ''}
                    readOnly={readOnly}
                    onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                />
                </div>

            )}
        </>
    )
}

export default EditableInput