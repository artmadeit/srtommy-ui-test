"use client";

// import { useAuth0 } from "@auth0/auth0-react";
import { AccountCircle } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import NextLink from "next/link";
import { redirect, useRouter } from "next/navigation";
import * as React from "react";
import useSWR from "swr";
import Loading from "../(components)/Loading";
import { withOutSorting } from "../(components)/helpers/withOutSorting";
import { useAuth0 } from "@auth0/auth0-react";

const drawerWidth = 240;

export default function MenuDrawer2({
  children,
  listDrawer,
  location,
}: React.PropsWithChildren<{
  listDrawer?: React.ReactNode;
  location?: { name: string };
}>) {
  const router = useRouter();

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

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

  // const handleProfile = () => {
  //   router.push("/profile");
  //   setAnchorEl(null);
  // };

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
  if (!isAuthenticated) return loginWithRedirect();

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
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography>Sr. Tommy</Typography>
              <Button
                variant="outlined"
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={() => setOpenDialog(true)}
              >
                {location?.name || "Seleccione sede"}
              </Button>
            </Stack>
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
            <DialogAccounts open={openDialog} onClose={onClose} />
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
          {listDrawer}
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
          {listDrawer}
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

type LocationListItem = {
  id: number;
  name: string;
};

type DialogLocationProps = {
  open: boolean;
  onClose: () => void;
};

const DialogAccounts = ({ open, onClose }: DialogLocationProps) => {
  const { data: accounts, isLoading } =
    useSWR<LocationListItem[]>("organizations");

  const columns = React.useMemo(
    () =>
      (
        [
          {
            field: "name",
            headerName: "Nombre",
            renderCell: ({ row }) => (
              <Link component={NextLink} href={`/portal/${row.id}`}>
                {row.name}
              </Link>
            ),
            flex: 1,
          },
        ] as GridColDef<LocationListItem>[]
      ).map(withOutSorting),
    []
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle display="flex" justifyContent="space-between">
        Selecciona otra sede
        <Link component={NextLink} href="/portal/location/create">
          <Button onClick={onClose}>Nueva Sede</Button>
        </Link>
      </DialogTitle>
      <DialogContent>
        <div style={{ width: "100%", height: "70vh" }}>
          <DataGrid
            loading={isLoading}
            columns={columns}
            rowCount={accounts?.length}
            hideFooter={true}
            rows={accounts || []}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
