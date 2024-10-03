import { Box, Breakpoint, Container } from "@mui/material";

interface Props {
  children: JSX.Element | JSX.Element[];
  maxWidth?: Breakpoint | false;
}

export const FormBoxContainer = ({ children, maxWidth }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "grey.100",
        minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
        pt: { xs: "64px", md: "72px", lg: "84px" },
        px: { xs: 1, md: 2 },
      }}
    >
      <Container maxWidth={maxWidth || "xl"} sx={{ p: 0 }}>
        {children}
      </Container>
    </Box>
  );
};
