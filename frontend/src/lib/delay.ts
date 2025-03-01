/**
 * Adds a delay (used for animations).
 *
 * @param ms delay in milliseconds
 *
 * @returns Promise<void>
 */
export const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};