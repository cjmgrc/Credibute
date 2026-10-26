/**
 * The only module that will talk to the backend. Today every call resolves from mocks
 * after a short delay so loading states are real. Swap the internals for fetch() later;
 * no component should change.
 */
export const delay = (ms = 280) => new Promise((r) => setTimeout(r, ms));
