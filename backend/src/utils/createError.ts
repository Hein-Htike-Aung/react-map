interface ErrorResponse extends Error {
    status: number;
}

export const createError = (status: number, message: string) => {
    const error = new Error() as ErrorResponse;
    error.status = status;
    error.message = message;
    return error;
}