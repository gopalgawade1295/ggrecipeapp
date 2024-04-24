import styled from "@emotion/styled";
import { Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export const RecipeTileBox = styled(Box)({
    height: '100%',
    maxWidth: '380px',
    minWidth: '100px',
    borderRadius: '12px',
    border: '1px solid #DCDCDC',
    marginLeft: 'auto',
    marginRight: 'auto',
    '&:hover': {
        border: '1px solid #7F38EC',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px'
    }
})

export const TileBox = styled(Box)({
    height: '100%',
    width: '95%',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #DCDCDC',
    marginLeft: 'auto',
    marginRight: 'auto',
    '&:hover': {
        border: '1px solid #7F38EC',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px'
    }
})

export const CartBox = styled(Box)({
    minHeight: '120px',
    width: '95%',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #DCDCDC',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '12px',
    '&:hover': {
        border: '1px solid #7F38EC',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px'
    }
})

export const RecipeSaveButton = styled(Box)({
    height: '20px',
    width: '40px',
    padding: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderBottomLeftRadius: '12px',
    borderTopRightRadius: '12px',
    border: '1px solid #DCDCDC',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    marginBottom: "5px"
})

export const SLink = styled(Link)({
    textDecoration: 'none'
})

export const ProductImgContainer = styled(Box)({
    height: "300px",
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "8px"
})

export const IconButtonProduct = styled(IconButton)({
    background: '#7F38EC',
    color: '#FFFFFF',
    marginLeft: '8px',
    '&:hover': {
        background: '#611ACE',
        color: '#FFFFFF'
    }
})

export const ButtonProduct = styled(Button)({
    background: '#7F38EC',
    color: '#FFFFFF',
    marginLeft: '8px',
    textTransform: 'none',
    '&:hover': {
        background: '#611ACE',
        color: '#FFFFFF'
    }
})

export const ButtonBack = styled(Button)({
    background: '#DCDCDC',
    color: '#7F38EC',
    marginLeft: '8px',
    textTransform: 'none',
    '&:hover': {
        background: '#CFCFCF',
        color: '#611ACE'
    }
})
