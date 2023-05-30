import React, {
    forwardRef,
    ForwardedRef,
    PropsWithChildren,
    useEffect,
    useRef,
} from 'react'
import { formatDate } from '../../util/transforms'
import { Comment } from '../../types'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

interface CommentsProps {
    comments: Comment[] | undefined
    error: Error | undefined
}

// a scrollable component to wrap around the comments list to allow for scroll on new message feature
const BoxWrapper = forwardRef(
    ({ children }: PropsWithChildren, ref: ForwardedRef<unknown>) => {
        return (
            <Box
                ref={ref}
                data-testid={'comments-box'}
                sx={{
                    width: '100%',
                    height: '60vh',
                    overflowY: 'scroll',
                    borderRadius: '1rem',
                    background: 'lightBlue',
                    padding: '1rem',
                }}
            >
                {children}
            </Box>
        )
    }
)

/* 
a tiny optimization for this component would to be to make it pure.  It meets all the qualifications I just didn't have the time for that type of gold plating.  the optimization gains from this change would 
be unnoticeable at this scale
*/
export default function Comments({ comments, error }: CommentsProps) {
    const scrollableRef = useRef<HTMLDivElement>(null)
    /** when comments are updated, scroll to bottom of scroll box to show new comment
    In future iterations for a better ux I would show a notification or banner that let the user
    choose to scroll down rather than being forced
    */
    useEffect(() => {
        if (scrollableRef.current) {
            scrollableRef.current.scroll({
                top: scrollableRef.current.scrollHeight,
                behavior: 'smooth',
            })
        }
    }, [comments])
    if (error) {
        return (
            <BoxWrapper>
                <Typography
                    data-testid={'comment-list-error-message'}
                    id={'comment-list-error-message'}
                    sx={{ color: 'red' }}
                    variant="h5"
                >
                    {error.message}
                </Typography>
            </BoxWrapper>
        )
    }

    if (!comments) {
        return (
            <BoxWrapper>
                <CircularProgress data-testid="comments-loader" />
            </BoxWrapper>
        )
    }

    return (
        <BoxWrapper ref={scrollableRef}>
            <Grid
                container
                spacing={4}
                direction="row"
                justifyContent="center"
                alignContent="flex-start"
            >
                {comments?.map((c: Comment) => {
                    return (
                        <Grid
                            item
                            data-testid={`comment-${c.id}`}
                            xs={8}
                            key={`comment-${c.id}`}
                        >
                            <Card>
                                <CardContent>
                                    <Typography
                                        variant="body1"
                                        sx={{ paddingBottom: '1rem' }}
                                    >
                                        {c.message}
                                    </Typography>
                                    <Typography variant="h6">{`${
                                        c.name
                                    } on ${formatDate(c.created)}`}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </BoxWrapper>
    )
}
