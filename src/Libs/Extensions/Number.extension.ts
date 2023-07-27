import { log } from "console"

///////////////////////////////
export enum OrderType {
    Asc = 'asc',
    Desc = 'desc',
}
//exports.OrderType = OrderType;

///// Sort /////
function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(orderType: OrderType, orderBy: string) {
    //"desc" || "asc"
    return orderType === OrderType.Desc
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy)
}

export var stableSort = function (
    array: any,
    orderType: OrderType,
    orderBy: string,
) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index])
    stabilizedThis.sort((a: any, b: any) => {
        const comparator = getComparator(orderType, orderBy)
        const new_order = comparator(a[0], b[0])
        if (new_order !== 0) return new_order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el: any) => el[0])
}
///////////////////////////////

/* export var matchStr = function (a: string, b: string) {
    a = a
        .toLowerCase()
        .replace(/ /g, '')
        .replace(/[\n\t\r]/g, '')
    b = b.toLowerCase().replace(/ /g, '')
    return a.localeCompare(b) === 0
} */
