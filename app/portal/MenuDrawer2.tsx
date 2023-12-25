"use client";

// import { useAuth0 } from "@auth0/auth0-react";
import { AccountCircle } from "@mui/icons-material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import { redirect, useRouter } from "next/navigation";
import * as React from "react";
import Loading from "../(components)/Loading";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChurchIcon from "@mui/icons-material/Church";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const appName = "Sr. Tommy - {TODO: mi iglesia}";

const drawerWidth = 240;

export default function MenuDrawer2({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  // const { user, isAuthenticated, isLoading } = useAuth0();
  // const { logout } = useAuth0();

  const isLoading = false;
  const isAuthenticated = true;
  const user = {
    nickname: "Arthur",
  };
  const logout = (anything: any) => {
    // TODO:
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfile = () => {
    router.push("/profile");
    setAnchorEl(null);
  };

  const onClose = () => {
    setOpenDialog(false);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  if (isLoading) return <Loading />;
  if (!isAuthenticated) return redirect("/");

  const drawer = (
    <List>
      <Link
        component={NextLink}
        href="/portal"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link
        component={NextLink}
        href="/portal/person"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Personas" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link
        component={NextLink}
        href="/portal/event"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Eventos" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link
        component={NextLink}
        href="/portal/organization"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ChurchIcon />
            </ListItemIcon>
            <ListItemText primary="Organización" />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={() => setOpenDialog(true)}
            >
              {appName}
            </Button>
            <Button
              variant="text"
              color="inherit"
              startIcon={<AccountCircle />}
              onClick={handleClick}
            >
              {user?.nickname}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {/* <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                Perfil
              </MenuItem> */}
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                Cerrar sesión
              </MenuItem>
            </Menu>
            <DialogA open={openDialog} onClose={onClose} />
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerHeader />
          <Divider />
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

type DialogAProps = {
  open: any;
  onClose: () => void;
};

const DialogA = ({ open, onClose }: DialogAProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Dialog</DialogTitle>
      <DialogContent>TO DO</DialogContent>
    </Dialog>
  );
};
