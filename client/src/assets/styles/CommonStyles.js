import styled from "@emotion/styled";
import {
    Box,
    Button,
    IconButton,
    Typography
} from "@mui/material";

export const Title = styled(Typography)({
    fontWeight: 500,
    marginBottom: '24px'
})

export const SubTitle = styled(Typography)({
    fontWeight: 600,
    marginBottom: '12px'
})

export const Heading = styled(Typography)({
    fontWeight: 600,
    marginBottom: '12px'
})

export const Button1 = styled(Button)({
    background: '#FE794C',
    color: '#FFFFFF',
    textTransform: 'none',
    transition: '200ms all',
    marginTop: '8px',
    marginBottom: '8px',
    minWidth: '120px',
    padding: '8px',
    '&:hover': {
        background: '#FE794C',
        color: '#FFFFFF',
        transform: 'scale(1.05)'
    }
})

export const Button2 = styled(Button)({
    background: '#FFFFFF',
    color: '#FE794C',
    textTransform: 'none',
    transition: '200ms all',
    margin: '8px',
    padding: '8px',
    '&:hover': {
        background: '#FFFFFF',
        color: '#FE794C',
        transform: 'scale(1.05)'
    }
})

export const Button3 = styled(Button)({
    background: '#FFFFFF',
    color: '#FE794C',
    textTransform: 'none',
    transition: '200ms all',
    margin: '8px',
    padding: '8px',
    minWidth: '120px',
    border: '1px solid #FE794C',
    '&:hover': {
        background: '#FFFFFF',
        color: '#FE794C',
        transform: 'scale(1.05)'
    }
})

export const Button4 = styled(IconButton)({
    background: '#FFFFFF',
    color: '#FE794C',
    textTransform: 'none',
    transition: '200ms all',
    margin: '8px',
    padding: '8px',
    border: '1px solid #FE794C',
    '&:hover': {
        background: '#FFFFFF',
        color: '#FE794C',
        transform: 'scale(1.05)'
    }
})

export const FlexCenter = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
})

export const FlexStart = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
})

export const FlexCenterMin = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
})
