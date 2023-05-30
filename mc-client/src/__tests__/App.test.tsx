import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'

/* I added a few sample unit tests to simply display my ability to write them
this is not 100% coverage, but they do handle the basic user experience both happy and sad paths
fairly well
*/
describe('Test App', () => {
    test('App renders without crashing', async () => {
        const { unmount } = render(<App />)
        //this logic advances useInterval hook straight to tick
        expect(screen.getByTestId('app')).toBeDefined()
        await waitFor(() =>
            expect(screen.getByTestId('comment-1')).toBeInTheDocument()
        )
        unmount()
    })
})
