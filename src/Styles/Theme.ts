import { createTheme } from '@mui/material/styles'

export const primary = '#FF6B38';
export const secondary = '#395AAD';


export const Theme = createTheme({
    palette: {
        primary: {
            main: '#FF6B38', contrastText: '#fff'
        },
        secondary: {
            main: '#395AAD', contrastText: '#fff'
        },
        text: {
            primary: "#FF6B38",
            secondary: "#8E8E8E",
        },
        error: {
            main: '#E14745'
        }
    },
    typography: {
        fontFamily: ['THSarabun', 'MyriadPro', 'Open Sans', 'sans-serif', '-apple-system',].join(','),
        h4: { fontFamily: 'THSarabun', fontWeight: "500" },
        h5: { fontFamily: 'THSarabunBold', fontWeight: "900" }, //HInfo
        h6: { fontFamily: 'THSarabun', fontWeight: "900" }, //AppBar  //1.25rem
        subtitle1: { fontFamily: 'THSarabun', fontWeight: "600" },
        body1: { fontFamily: 'THSarabun', fontWeight: "600" },
        body2: { fontFamily: 'THSarabun', fontWeight: "600" },
        button: {
            fontFamily: 'THSarabun', fontWeight: "600",
            fontSize: '1rem'
        },
    },

    components: {
        MuiOutlinedInput: {
            defaultProps: {
                style: {
                    backgroundColor: 'white',
                    //fontFamily: 'THSarabun', fontWeight: "900",
                    fontSize: '1.25rem',
                }
            },
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        color: "#8E8E8E"
                    },
                }
            }
        },
        ////// Table /////
        MuiTableCell: {
            defaultProps: {
                style: {
                    fontSize: '1.25rem',
                    fontFamily: 'THSarabun',
                    color: '#8E8E8E',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-child(even)': {
                        backgroundColor: '#FFF',
                    },
                    '&:nth-child(odd)': {
                        backgroundColor: '#F4F4F4',
                    },
                },
            },
        },

        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: '1.25rem',
                    fontFamily: 'THSarabun',

                }
            },

        }

    }
});