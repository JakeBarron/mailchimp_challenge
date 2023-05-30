import React, { JSX, useEffect, useState, useCallback } from 'react'
import { Comment } from '../../types'
import { createComment, getComments } from '../../api'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import { useInterval } from '../../util/hooks'
import { POLLING_INTERVAL } from '../../constants'

// error class specifically for validation issues on form submit
class ValidationError extends Error {
    constructor(message: string) {
        super(message) // (1)
        this.name = 'ValidationError' // (2)
    }
}

/* 
for such a simple application I opted to go for the provider pattern rather than pull in a state
management library like redux. If this app grew large enough to encompass multiple routes with connected logic
I would probably opt to go with Redux, but until then, between component composition and context it's not necessary
*/
export default function CommentProvider(): JSX.Element {
    const [comments, setComments] = useState<Comment[] | undefined>(undefined)
    const [error, setError] = useState<Error | undefined>(undefined)

    const fetchComments = useCallback(async () => {
        try {
            const response = await getComments()
            /*
            this simple check is how I determine if a state update is necessary this is a very
            bespoke solution because I know that the backend only ever returns more comments since there is no
            user way to remove comments.  If that were to be added as a future feature, this logic would need to 
            check not only length of comment response, but also if all the entries were the same, so that removed comments
            would also be removed from the dom.
            */
            /*
            this logic could also be replaced with useMemo entirely, which would be another performance optimization
            it would do all the same things as this logic, but with a React in-house solution
           */
            if (response?.length !== comments?.length) {
                setComments(response)
            }
        } catch (err) {
            // again this is where I would put more error handling if needed
            setError(new Error('Something went wrong . . .'))
        }
    }, [comments])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    /* this is a recommended polling solution created by one of the engineers at Facebook
    In future state I believe a new endpoint on the server that allowed the client to query by
    date would allow the polling mechanism to only pull new data which would drastically reduce the size
    of responses that would be a huge factor as more and more messages are added to the DB.
    For this small demo app, this solution is good enough, if not scalable.
    */
    useInterval(fetchComments, POLLING_INTERVAL)

    const submitComment = async (
        name: string,
        message: string
    ): Promise<any> => {
        try {
            /* future state might involve pulling validation out into it's own module with much
            more robust checks, but since no requirements were set for validations I went with the simplest
            and easiest solution that is still very maintainable
            */
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

    // these functions could easily be extended to make more checks with more robust validation messaging
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
    /* 
    for now input errors are simply notified to the user via alert messages this is for 
    demo purposes I would want to consult the customer on how they would want to handle errors
    I suspect simple messages and a disabled submit button or something similar
    */
    return (
        <>
            <CommentInput submitComment={submitComment} />
            <CommentList comments={comments} error={error} />
        </>
    )
}
