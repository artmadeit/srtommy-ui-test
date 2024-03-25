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
import GroupsIcon from "@mui/icons-material/Groups";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export default function LocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locId: number };
}) {
  const { locId } = params;

  const { data: location } = useSWR<LocationDetail>(`organizations/${locId}`);

  return (
    <MenuDrawer2
      location={location}
      listDrawer={
        <List>
          <Link
            component={NextLink}
            href={`/portal/${locId}/`}
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
            href={`/portal/${locId}/person`}
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
            href={`/portal/${locId}/person`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Grupos" />
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
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Eventos" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            component={NextLink}
            href={`/portal/${locId}/courses`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Cursos" />
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
                  <ChurchIcon />
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
