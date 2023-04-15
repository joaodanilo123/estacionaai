export interface ErrorMessage {
    error: string
}

export function errorMessage(message: string): ErrorMessage{
    return {
        error: message
    }
}
