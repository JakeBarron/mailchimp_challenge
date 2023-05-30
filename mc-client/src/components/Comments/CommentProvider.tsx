import React, { JSX, useEffect, useState, useCallback } from 'react'
import { Comment } from '../../types'
import { createComment, getComments } from '../../api'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import { useInterval } from '../../util/hooks'
import { POLLING_INTERVAL } from '../../constants'

class ValidationError extends Error {
    constructor(message: string) {
        super(message) // (1)
        this.name = 'ValidationError' // (2)
    }
}

export default function CommentProvider(): JSX.Element {
    const [comments, setComments] = useState<Comment[] | undefined>(undefined)
    const [error, setError] = useState<Error | undefined>(undefined)

    const fetchComments = useCallback(async () => {
        try {
            const response = await getComments()
            if (response?.length !== comments?.length) {
                setComments(response)
            }
        } catch (err) {
            setError(new Error('Something went wrong . . .'))
        }
    }, [comments])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    useInterval(fetchComments, POLLING_INTERVAL)

    const submitComment = async (
        name: string,
        message: string
    ): Promise<any> => {
        try {
            validateName(name)
            validateMessage(message)
            setError(undefined)
            const response = await createComment(name, message)
            if (response) {
                fetchComments()
            }
        } catch (err) {
            if (err instanceof ValidationError) {
                window.alert(err.message)
            } else if (err instanceof Error) {
                setError(err)
            }
        }
    }

    const validateName = (name: string) => {
        if (name.length === 0) {
            throw new ValidationError('Name cannot be blank')
        }
    }

    const validateMessage = (message: string) => {
        if (message.length === 0) {
            throw new ValidationError('Message cannot be blank')
        }
    }

    return (
        <>
            <CommentInput submitComment={submitComment} />
            <CommentList comments={comments} error={error} />
        </>
    )
}
