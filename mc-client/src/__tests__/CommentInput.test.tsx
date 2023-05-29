import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CommentInput from '../components/Comments/CommentInput'
import { Comment } from '../types'
import { act } from 'react-dom/test-utils'

afterEach(cleanup)

describe('Test CommentInput', () => {
    test('Input should handle change for typing into name field', () => {
        render(<CommentInput submitComment={ () => {}} />)
        const nameText = 'test'
        const nameInput = screen.getByLabelText('Name')
        act(() => {
            userEvent.type(nameInput, nameText)
        })
        expect(nameInput).toHaveValue(nameText)
    })
    test('Input should handle change for typing into comment field', () => {
        render(<CommentInput submitComment={ () => {}} />)
        const commentText = 'test'
        const commentInput = screen.getByLabelText('Comment')
        act(() => {
            userEvent.type(commentInput, commentText)
        })
        expect(commentInput).toHaveValue(commentText)
    })
    test('Input should call submitComment handler on submit button press', () => {
        const submitCommentFunc = jest.fn()
        render(<CommentInput submitComment={submitCommentFunc} />)
        const submitButton = screen.getByTestId('submit-button')
        act(() => {
            userEvent.click(submitButton)
        })
        expect(submitCommentFunc).toHaveBeenCalled()
    })
})
