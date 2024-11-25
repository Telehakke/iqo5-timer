import styled from "@emotion/styled";
import {
    CircularProgress,
    circularProgressClasses,
    LinearProgress,
    linearProgressClasses,
} from "@mui/material";

/**
 * 親要素のテキストカラーで色の変更が可能
 */
export const CustomCircularProgress = styled(CircularProgress)(() => ({
    [`&.${circularProgressClasses.root}`]: {
        color: "inherit",
    },
    [`& .${circularProgressClasses.circle}`]: {
        transitionDuration: "100ms",
        transitionTimingFunction: "linear",
    },
}));

/**
 * 親要素の背景色とテキストカラーで色の変更が可能
 */
export const CustomLinearProgress = styled(LinearProgress)(() => ({
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "inherit",
    },
    [`& .${linearProgressClasses.bar}`]: {
        backgroundColor: "currentColor",
        transitionDuration: "100ms",
    },
}));
