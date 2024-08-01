import {useState} from 'react'
import {Text} from '@react-pdf/renderer'
import compose from '../styles/compose'

const EditableSelect = ({
                            className,
                            options,
                            value,
                            onChange,
                            pdfMode,
                            prefix
                        }) => {
    const [isEditing, setIsEditing] = useState(false)
    if (pdfMode) {
        // console.log("PDF " + prefix + value)
    } else {
        // console.log(prefix + value)
    }

    return (
        <>
            {pdfMode ? (
                <Text style={compose('span ' + (className ? className : ''))}>{prefix + value}</Text>
            ) : (
                <>
                    {isEditing ? (
                        <div className={'d-flex'}>
                        <span>{prefix}</span>
                            <select
                                className={'select ' + (className ? className : '')}
                                value={value}
                                onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                                onBlur={() => setIsEditing(false)}
                                autoFocus={true}
                            >
                                {options?.map((option) => (
                                    <option key={option.text} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <span
                            className={'input ' + (className ? className : '')}
                            onClick={() => setIsEditing(true)}
                        >{prefix + value}</span>
                    )}
                </>
            )}
        </>
    )
}

export default EditableSelect