import moment from "moment";

export const formatDate= (date)=> {
    return moment(date).format('DD/MM/YYYY');
}

export const YMDFormat= (date)=> {
    return moment(date).format('YYYY-MM-DD');
}