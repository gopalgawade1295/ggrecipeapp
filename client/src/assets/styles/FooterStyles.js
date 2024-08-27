import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const FooterBox = styled(Box)({
    padding: '16px',
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center'
})

export const FlexBetween = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap'
})

export const FlexEnd = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
})
