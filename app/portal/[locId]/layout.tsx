"use client";

import ChurchIcon from "@mui/icons-material/Church";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NextLink from "next/link";
import * as React from "react";
import MenuDrawer2 from "../MenuDrawer2";
import useSWR from "swr";
import { LocationDetail } from "./Location";

export default function LocLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locId: number }>;
}) {
  const children = props.children;
  const params = React.use(props.params);
  const { locId } = params;

  const { data: location } = useSWR<LocationDetail>(`organizations/${locId}`);

  return (
    <MenuDrawer2
      location={location}
      locId={locId}
      listDrawer={
        <List
          sx={{
            "& .MuiListItemIcon-root": {
              minWidth: "40px"
            }
          }}
        >
          <Link
            component={NextLink}
            href={`/portal/${locId}/`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: "#2D3748" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            component={NextLink}
            href={`/portal/${locId}/person`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon sx={{ color: "#1976D2" }} />
                </ListItemIcon>
                <ListItemText primary="Personas" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            component={NextLink}
            href={`/portal/${locId}/event`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <EventIcon sx={{ color: "#2D6A4F" }} />
                </ListItemIcon>
                <ListItemText primary="Eventos y cursos" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            component={NextLink}
            href={`/portal/${locId}/location`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ChurchIcon sx={{ color: "#C05621" }} />
                </ListItemIcon>
                <ListItemText primary="Sede" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      }
    >
      {children}
    </MenuDrawer2>
  );
}
