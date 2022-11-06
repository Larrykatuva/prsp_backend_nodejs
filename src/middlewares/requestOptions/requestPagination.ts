import {Request} from "express";

/**
 * Prepare request pagination
 * default pagination limit = 10 and offset = 0
 * @param req
 */
const getPagination = (req: Request) => {
    const { query: { limit = 10, offset = 0 } } = req
    return {
        skip: parseInt(offset.toString()),
        take: parseInt(limit.toString())
    }
}

export default getPagination;