import React from 'react';
import { RecipeTileBox } from '../assets/styles/Styles';
import { Box, Skeleton, Typography } from '@mui/material';

const SkeletonCard = () => {
    return (
        <RecipeTileBox>
            <Box textAlign={'center'}>
                <Typography
                    component="div"
                    variant='h5'
                    sx={{ p: 1, width: '150px', ml: 'auto', mr: 'auto' }}
                >
                    <Skeleton animation="wave" />
                </Typography>
            </Box>

            <Skeleton
                sx={{ height: 250 }}
                animation="wave"
                variant="rectangular"
            />

            <Typography
                component="div"
                variant='h6'
                sx={{ p: 1, pb: 0, width: '150px', ml: 2 }}
            >
                <Skeleton animation="wave" />
            </Typography>

            <Box sx={{ m: 1.75, minHeight: '110px', }}>
                {Array.from(Array(3).keys().map((v, i) => {
                    return (
                        <Skeleton
                            key={i}
                            variant="rounded"
                            animation="wave"
                            width={i === 0 ? 210 : i === 1 ? 250 : 110} height={30} sx={{ borderRadius: "20px", m: 0.75 }}
                        />
                    )
                }))}
            </Box>

            <Typography
                component="div"
                variant='h6'
                sx={{ p: 1, pb: 0, width: '150px', ml: 2 }}
            >
                <Skeleton animation="wave" />
            </Typography>

            <Box sx={{ height: '180px', m: 1, p: 1, pt: 0 }}>
                <Typography
                    component="div"
                    variant='body2'
                    sx={{ p: 1 }}
                >
                    {Array.from(Array(5).keys().map((v, i) => {
                        return (
                            <Skeleton animation="wave" key={i} />
                        )
                    }))}
                    <Skeleton animation="wave" width={120} />
                </Typography>
            </Box>
        </RecipeTileBox>
    )
}

export default SkeletonCard
