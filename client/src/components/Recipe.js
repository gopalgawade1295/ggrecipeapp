import React from 'react';
import { FlexBetween, RecipeHeading, RecipeSaveButton, RecipeTileBox } from '../assets/styles/Styles';
import { Box, Chip, Typography } from '@mui/material';

const Recipe = ({ v, ids, userInfo, saveRecipe }) => {
    return (
        <RecipeTileBox>
            <FlexBetween>
                <Typography variant='h5' sx={{ p: 1 }}>
                    {v.name}
                </Typography>

                {userInfo === null || userInfo?.userID === v.userOwner ?
                    null :
                    <RecipeSaveButton onClick={() => ids?.includes(v._id) ? console.log("") : saveRecipe(v._id)}>
                        <Typography variant='body2' sx={{ color: 'text.primary' }}>
                            {ids.includes(v._id) ? "Saved" : "Save"}
                        </Typography>
                    </RecipeSaveButton>
                }
            </FlexBetween>

            <img
                src={v.imageUrl}
                style={{ height: '250px', width: '100%' }}
                alt={v.name}
            />

            <RecipeHeading variant='h6'>
                Ingredients
            </RecipeHeading>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    m: 1.5,
                    height: '110px',
                    overflow: 'auto'
                }}
            >
                {v.ingredients?.map((v, i) => {
                    return (
                        <Chip label={v} variant="outlined" key={i} sx={{ m: 0.25 }} />
                    )
                })}
            </Box>

            <RecipeHeading variant='h6'>
                Instructions
            </RecipeHeading>

            <Box
                sx={{
                    height: '180px',
                    overflow: 'auto',
                    m: 1,
                    p: 1,
                    pt: 0
                }}
            >
                <Typography variant='body2' sx={{ p: 1, color: 'text.secondary' }}>
                    {v.instructions}
                </Typography>
            </Box>
        </RecipeTileBox>
    )
}

export default Recipe
