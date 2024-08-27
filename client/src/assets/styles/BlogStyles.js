import styled from "@emotion/styled";
import {
    Box,
    Grid,
    Typography
} from "@mui/material";

export const BlogImgBox = styled(Box)({
    width: '100%',
    height: '250px',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

export const BlogGrid = styled(Grid)({
    cursor: 'pointer',
    marginBottom: '48px'
})

export const BlogHeading = styled(Typography)({
    marginBottom: '16px',
    marginTop: '8px',
    fontWeight: 600
})

export const BlogImgBoxFull = styled(Box)({
    width: '100%',
    height: '100%',
    padding: '4px',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})
