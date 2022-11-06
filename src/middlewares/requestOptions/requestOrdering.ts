import {Request} from "express";

/**
 * Prepare request ordering
 * Default pagination to id: ASC
 * @param req
 */
const getOrdering = (req: Request): Object => {
    const { query: { order } } = req
    if(order){
        const keys = order.toString().split(',')
        let orderPattern: any = {}
        keys.map(key => {
            if(key.charAt(0) == '-'){
                orderPattern[key.substring(1)] = "DESC"
            } else {
                orderPattern[key] = "ASC"
            }
        })
        return orderPattern
    } else {
        return { id: "ASC"}
    }
}

export default getOrdering;