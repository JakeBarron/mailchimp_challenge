// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
    // Handles a POST /createComment request
    rest.post(`${process.env.REACT_APP_API_URL}/createComment`, (req, resp, ctx) => {
        return resp(
            ctx.status(200),
            ctx.json({
                id: 1,
            })
        )
    }),

    // Handles a GET /getComments request
    rest.get(`${process.env.REACT_APP_API_URL}/getComments`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: 1,
                    name: 'test name 1',
                    message: 'test message 1',
                    created: '2023-01-29 20:00:00',
                },
                {
                    id: 2,
                    name: 'test name 2',
                    message: 'test message 2',
                    created: '2023-01-28 19:00:00',
                },
            ])
        )
    }),
]
