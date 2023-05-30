import '@testing-library/jest-dom'
import { server } from './mocks/server'
beforeAll(() => server.listen())
// this is necessary to avoid waiting for timers to finish
beforeEach(() => jest.useFakeTimers())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
// jest dom does not support scroll so we have to add a mock function
window.HTMLElement.prototype.scroll = jest.fn()
