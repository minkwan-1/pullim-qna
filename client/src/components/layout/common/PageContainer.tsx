import { ReactNode, useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Appbar from "../appbar/Appbar";

type LayoutProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setMobileSidebarVisible(true);
    } else {
      setMobileSidebarVisible(false);
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* AppBar */}
      <Appbar
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      />

      {/* Main Content Layout */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          mt: "80px", // Appbar의 높이 만큼의 여백을 설정
        }}
      >
        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            bgcolor: "background.default",
            p: 3,
            pt: isMobile && mobileSidebarVisible ? "120px" : "80px", // 모바일에서 사이드바를 고려한 패딩 조정
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default PageContainer;
