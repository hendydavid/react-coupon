import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { iconsList } from "../Utils/Icon";
import "../css-files/App.css";
import { PagesLinks } from "../Models/models";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type Prop = {
  pages: PagesLinks[];
  settings?: [];
  userInfo: {
    firstName: string;
    lastName?: string;
    type: string;
  };
};
let counter = 0;
const settings = ["Logout"];

function Header(prop: Prop) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const midView = () => {
    return { xs: "flex", md: "flex", color: "#fff" };
  };

  return (
    <AppBar position="static" sx={{ background: "#fff45", mb: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="tool-bar">
          {prop.userInfo?.type === "customer"
            ? iconsList.customer(midView)
            : prop.userInfo?.type === "company"
            ? iconsList.company(midView)
            : iconsList.admin(midView)}

          <Box
            sx={{ maxWidth: "inherit", display: { xs: "flex", md: "flex" } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "block" },
              }}
            >
              {prop.pages.map((page) => (
                <MenuItem
                  key={counter++}
                  onClick={handleCloseNavMenu}
                  sx={{ background: "#def2ff" }}
                >
                  <Typography textAlign="center">
                    <Link className="links" to={page.value}>
                      {page.key}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            width={"inherit"}
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              ml: "auto",
              display: { xs: "flex", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <div className="text">
              Welcome
              {" " + prop.userInfo.firstName + "  "}
              {prop.userInfo.lastName && prop.userInfo.lastName}
            </div>
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="your settings" arrow>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon
                  sx={{ color: "#fff", fontSize: 40 }}
                ></AccountCircleIcon>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  if (window.confirm("are you sure you want to logout")) {
                    window.localStorage.removeItem("token");
                    navigate("/");
                  }
                }}
              >
                <Typography textAlign="center">{settings[0]}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
