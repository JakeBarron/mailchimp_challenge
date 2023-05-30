import React from 'react'
import {
    render,
    waitFor,
    screen,
    cleanup
} from '@testing-library/react'
import { POLLING_INTERVAL } from '../constants'
import { rest } from 'msw'
import { server } from '../mocks/server'
import CommentProvider from '../components/Comments'

afterEach(() => {
    cleanup()
})
describe('Testing fetches', () => {
    test('test initial fetch fails', async () => {
        // mock server failure
        server.use(
            rest.get(
                `${process.env.REACT_APP_API_URL}/getComments`,
                (req, res, ctx) => {
                    return res.once(
                        ctx.status(500),
                        ctx.json({ message: 'Internal Server Error' })
                    )
                }
            )
        )
        render(<CommentProvider />)
        await waitFor(() => {
            expect(
                screen.getByTestId('comment-list-error-message')
            ).toBeInTheDocument()
            expect(
                screen.getByTestId('comment-list-error-message')
            ).toHaveTextContent('Something went wrong . . .')
        })
    })
    test('test initial fetch success', async () => {
        render(<CommentProvider />)
        //wait for mock api to return test data
        await waitFor(() =>
            expect(screen.getByTestId('comment-1')).toBeInTheDocument()
        )
        expect(screen.getByText('test message 1')).toBeInTheDocument()
        expect(screen.getByText('test message 2')).toBeInTheDocument()
    })
})

describe('Test polling', () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setInterval')
    let commentIncrement = 0

    test('test some function is called after POLLING_INTERVAL', async () => {
        render(<CommentProvider />)
        expect(setInterval).toHaveBeenCalledTimes(1)
        expect(setInterval).toHaveBeenLastCalledWith(
            expect.any(Function),
            POLLING_INTERVAL
        )
    })

    test('test new comments are displayed after polling', async () => {
        //mock server consecutive calls
        server.use(
            rest.get(
                `${process.env.REACT_APP_API_URL}/getComments`,
                (req, res, ctx) => {
                    return res.once(
                        ctx.status(200),
                        ctx.json([
                            {
                                id: 1,
                                name: 'remove me',
                                message: 'goodbye cruel world!',
                                created: '2023-01-29 20:00:00',
                            },
                        ])
                    )
                }
            )
        )
         render(<CommentProvider />)
        await waitFor(() =>{
            // we expect that comment-1 should be in the document
            expect(screen.getByTestId('comment-1')).toBeInTheDocument()
            //TODO: fix this test. Should pass in current build
            //expect(screen.queryByText('goodbye cruel world!')).not.toBeInTheDocument()
        })
    })
})
