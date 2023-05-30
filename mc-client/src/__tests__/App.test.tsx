import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'

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
