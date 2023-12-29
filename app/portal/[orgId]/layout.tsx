import ChurchIcon from "@mui/icons-material/Church";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Link } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NextLink from "next/link";
import * as React from "react";
import MenuDrawer2 from "../MenuDrawer2";

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  return (
    <MenuDrawer2
      listDrawer={
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
            href="person"
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
      }
    >
      <Box px={2}>{children}</Box>
    </MenuDrawer2>
  );
}
