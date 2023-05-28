import { Comment } from '../types'

export async function getComments(): Promise<Comment[]> {
    const url = `${process.env.REACT_APP_API_URL}/getComments`
    const response = await fetch(url, {
        method: 'GET',
    })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        return Promise.reject(new Error('Something went wrong . . .'))
    }
}
interface PostCommentResp {
    id: string
}
export async function createComment(
    name: string,
    message: string
): Promise<PostCommentResp> {
    const url = `${process.env.REACT_APP_API_URL}/createComment`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            message,
        }),
    })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        return Promise.reject(new Error('Something went wrong . . .'))
    }
}
