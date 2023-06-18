import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const drawerWidth = 240;

const sidebarMenus = [
  { title: "Dashboard", icon: "", target: "/" },
  { title: "Candidates", icon: "", target: "/candidate" },
  { title: "My Profile", icon: "", target: "/profile" },
  { title: "Change Password", icon: "", target: "/change-password" },
  { title: "Logout", icon: "", target: "/logout" },
];

const SidebarComponent = () => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    return <Navigate to="/login" replace />;
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {sidebarMenus.map((sidebarMenu, index) => (
          <ListItem
            key={index}
            disablePadding
            component={Link}
            to={sidebarMenu.target}
          >
            <ListItemButton
              onClick={
                sidebarMenu.title === "Logout" ? handleLogout : undefined
              }
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                className="text-black"
                primary={sidebarMenu.title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarComponent;
