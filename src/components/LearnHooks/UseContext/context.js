import React from "react";

export const theme = {
    light: {
        background: "red",
        color: 'skyblue'
    },
    dark: {
        background: "orange",
        color: 'green'
    }
}

export const themeContext = React.createContext(theme)