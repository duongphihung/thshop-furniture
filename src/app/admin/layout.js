import FullLayout from "../components/admin/FullLayout/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from '@/app/assets/global/Theme-variable';

export default async function RootLayout({ children }) {
    const theme = baseTheme;
    return (
        <ThemeProvider theme={theme}>
            <FullLayout>
                {children}
            </FullLayout>
        </ThemeProvider>
    )
}
