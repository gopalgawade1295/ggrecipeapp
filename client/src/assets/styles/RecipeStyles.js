import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const RecipeCard = styled(Box)({
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    borderRadius: '20px',
    transition: 'all 200ms',
    '&:hover': {
        transform: 'translateY(-2px)'
    }
})

export const RecipeCardContent = styled(Box)({
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    height: '250px'
})

export const RecipeCardEmpty = styled(Box)({
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    height: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
})

export const RecipeSaveButton = styled(Box)({
    position: 'absolute',
    top: '8px',
    right: '8px',
    borderRadius: '8px',
    background: '#FFFFFF',
    padding: '8px'
})

export const RecipeTime = styled(Box)({
    textAlign: 'left',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
})
