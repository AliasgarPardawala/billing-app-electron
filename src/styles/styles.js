const colorDark = '#222'
const colorDark2 = '#666'
const colorGray = '#e3e3e3'
const colorWhite = '#fff'

const styles = {
    dark: {
        color: colorDark,
    },

    white: {
        color: colorWhite,
    },

    'bg-dark': {
        backgroundColor: colorDark2,
    },

    'bg-gray': {
        backgroundColor: colorGray,
    },

    flex: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },

    'flex-col': {
        flexDirection: 'column'
    },

    'justify-between': {
        justifyContent: 'space-between'
    },

    'justify-end': {
        justifyContent: 'end'
    },

    'content-end': {
        alignContent: 'end'
    },

    'items-end': {
        alignItems: 'end'
    },

    'w-auto': {
        flex: 1,
        paddingRight: '8px',
    },

    'ml-30': {
        flex: 1,
    },

    'w-100': {
        width: '100%',
    },

    'w-50': {
        width: '50%',
    },

    'w-55': {
        width: '55%',
    },

    'w-45': {
        width: '45%',
    },

    'w-60': {
        width: '60%',
    },

    'w-40': {
        width: '40%',
    },

    'w-48': {
        width: '48%',
    },

    'w-17': {
        width: '17%',
    },

    'w-18': {
        width: '18%',
    },

    'w-15': {
        width: '15%'
    },

    'w-10': {
        width: '10%'
    },

    'w-12': {
        width: '12%'
    },

    'w-83': {
      width: '75%'
    },

    row: {
        borderBottom: `1px solid ${colorGray}`,
    },

    'mt-40': {
        marginTop: '40px',
    },

    'mt-30': {
        marginTop: '30px',
    },

    'mt-20': {
        marginTop: '40px',
    },

    'mt-10': {
        marginTop: '10px',
    },

    'mb-5': {
        marginBottom: '5px',
    },

    'mb-14': {
        marginBottom: '14px'
    },

    'p-4-8': {
        padding: '4px 8px',
    },

    'p-5': {
        padding: '5px',
    },

    'pb-10': {
        paddingBottom: '10px',
    },

    right: {
        textAlign: 'right',
    },

    'text-start': {
        textAlign: 'left'
    },

    'text-center': {
        textAlign: 'center'
    },


    'text-end': {
        textAlign: 'right'
    },

    'font-bold': {
        fontFamily: 'Roboto-Bold',
        color: colorDark
    },

    'fs-10': {
        fontSize: '10px'
    },

    'fs-12': {
        fontSize: '12px'
    },

    'fs-14': {
        fontSize: '14px'
    },

    'fs-16': {
        fontSize: '16px'
    },

    'fs-20': {
        fontSize: '20px',
    },

    'fs-45': {
        fontSize: '45px',
    },

    page: {
        fontFamily: 'Roboto',
        fontSize: '13px',
        color: '#555',
        padding: '40px 35px',
    },

    span: {
        padding: '4px 12px 4px 0',
        fontSize: '10px',
        color: colorDark
    },

    logo: {
        display: 'block',
    },

    'text-gray-600': {
        color: "#757575"
    },

    'text-6xl': {
        fontSize: '40px'
    },

    border: {
        borderBottomWidth: '0.2px',
        borderRightWidth: '0.2px',
        borderColor: colorDark
    },

    'border-top': {
        borderTopWidth: '0.2px',
        borderTopColor: colorDark
    },

    'border-left': {
        borderLeftWidth: '0.2px',
        borderLeftColor: colorDark
    },

    'italic': {
        fontFamily: 'Roboto-Thin',
    }
}

export default styles