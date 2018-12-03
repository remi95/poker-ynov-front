/**
 * Create an object with type and message.
 *
 * @param type
 *   Type of the alert: success, error, info, warning...
 * @param message
 *   Message to display in the alert.
 *
 * @returns Object
 */
export const alert = (type, message) => {
    return { type, message }
};