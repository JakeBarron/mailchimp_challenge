import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { POLLING_INTERVAL } from '../constants';
import CommentProvider from "../components/Comments";

describe('Testing Comment Provider', () => {
    test('test initial fetch', async () => {
        const {container, unmount} = render(<CommentProvider />)
        await waitFor(() => expect(screen.getByTestId('comment-1')).toBeInTheDocument())
        expect(screen.getByText('test message 1')).toBeInTheDocument()
        expect(screen.getByText('test message 2')).toBeInTheDocument()
        Promise.resolve()
    })
})
