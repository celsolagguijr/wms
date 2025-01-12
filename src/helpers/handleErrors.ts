import InvalidPageException from "../exceptions/InvalidPageException"
import InvalidLimitException from "../exceptions/InvalidLimitException"
import InvalidPickingSlipStatus from "../exceptions/InvalidPickingSlipStatus"
import HttpStatus from "../shared/HttpStatus"

export interface ErrorResponse {
    message: string,
    success: boolean,
    status: number
}

function handleErrors(ErrorIntance: any): ErrorResponse {

    if (ErrorIntance instanceof InvalidPageException) return {
        message: ErrorIntance.message,
        success: false,
        status: HttpStatus.BAD_REQUEST
    }

    if (ErrorIntance instanceof InvalidLimitException) return {
        message: ErrorIntance.message,
        success: false,
        status: HttpStatus.BAD_REQUEST
    }

    if (ErrorIntance instanceof InvalidPickingSlipStatus) return {
        message: ErrorIntance.message,
        success: false,
        status: HttpStatus.BAD_REQUEST
    }

    return {
        message: ErrorIntance.message,
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR
    }




}

export default handleErrors;