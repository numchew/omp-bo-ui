import { primary } from "../../Styles/Theme";
import { Box, Toolbar, Typography } from "@mui/material";

interface IProps {
  label: string;
};

export const HInfo = (props: IProps) => {
  return (
    <div id="header-bar">
      <Toolbar variant="dense" />
      <Box sx={{ backgroundColor: primary, display: "flex", alignItems: "center", p: 2 }}>
        <div style={{ paddingTop: 2, paddingBottom: 2 }}>
          <Typography variant="h5" color={'#fff'}>
            {props.label}
          </Typography>
        </div>
      </Box>
    </div >
  );
}
