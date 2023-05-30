import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import CommentsList from '../components/Comments/CommentList'
import { Comment } from '../types'

const happyPath: Comment[] = [
    {
        id: 1,
        name: 'foo',
        message: 'bar',
        created: '2023-05-29T00:12:00.000Z',
    },
    {
        id: 2,
        name: 'test',
        message: 'test message',
        created: '2023-05-29T00:12:00.000Z',
    },
]

afterEach(cleanup)

describe('Test CommentList', () => {
    test('List should render happyPath messages', () => {
        render(<CommentsList comments={happyPath} error={undefined} />)
        expect(screen.getByTestId('comment-1')).toBeInTheDocument()
        expect(screen.getByTestId('comment-2')).toBeInTheDocument()
        expect(screen.queryAllByTestId(/comment-/)).toHaveLength(2)
    })
    test('List should render no comments', () => {
        render(<CommentsList comments={[]} error={undefined} />)
        expect(screen.queryAllByTestId(/comment-/)).toEqual([])
    })
    test('List should display loader if comments are undefined', () => {
        render(<CommentsList comments={undefined} error={undefined} />)
        expect(screen.getByTestId('comments-loader')).toBeInTheDocument()
    })
    test('List should render error message if there is an error', () => {
        const errorMessage = 'test error message 12345'
        render(
            <CommentsList
                comments={undefined}
                error={new Error(errorMessage)}
            />
        )
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
})
