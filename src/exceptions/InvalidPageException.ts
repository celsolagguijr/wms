class InvalidPageException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default InvalidPageException;