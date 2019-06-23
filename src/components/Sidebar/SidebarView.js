import React from 'react';
import {
  Drawer,
  IconButton,
  List,
  withStyles } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from 'classnames';

import SidebarLink from './components/SidebarLink/SidebarLinkContainer';
import Dot from './components/Dot';

const structure = (client) => [
  { id: 0, label: 'Dashboard', link: `/clients/dashboard/${client}`, icon: <HomeIcon /> },
  { id: 1, label: 'Typography', link: `/clients/typography/${client}`, icon: <TypographyIcon /> },
  { id: 2, label: 'Tables', link: `/clients/tables/${client}`, icon: <TableIcon /> },
  { id: 3, label: 'Notifications', link: `/clients/notifications/${client}`, icon: <NotificationsIcon />},
  {
    id: 4,
    label: 'UI Elements',
    link: `/clients/ui/${client}`,
    icon: <UIElementsIcon />,
    children: [
      { label: 'Icons', link: `/clients/ui/icons/${client}` },
      { label: 'Charts', link: `/clients/ui/charts/${client}` },
      { label: 'Maps', link: `/clients/ui/maps/${client}` },
    ],
  },
  // { id: 5, type: 'divider' },
  // { id: 6, type: 'title', label: 'HELP' },
  // { id: 7, label: 'Library', link: '', icon: <LibraryIcon /> },
  // { id: 8, label: 'Support', link: '', icon: <SuppojfjfjfjfjrtIcon /> },
  // { id: 9, label: 'FAQ', link: '', icon: <FAQIcon />},
  // { id: 10, type: 'divider' },
  // { id: 11, type: 'title', label: 'PROJECTS' },
  // { id: 12, label: 'My recent', link: '', icon: <Dot size="large" color="warning" /> },
  // { id: 13, label: 'Starred', link: '', icon: <Dot size="large" color="primary" /> },
  // { id: 14, label: 'Background', link: '', icon: <Dot size="large" color="secondary" /> },
];

const SidebarView = ({ classes, theme, toggleSidebar, isSidebarOpened, client, isPermanent, location }) => {
  console.log(location)
  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton
          onClick={toggleSidebar}
        >
          <ArrowBackIcon classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure(client).map(link => <SidebarLink key={link.id} location={location} isSidebarOpened={isSidebarOpened} {...link} />)}
      </List>
    </Drawer>
  );
}

const drawerWidth = 240;

const styles = theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 40,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  sidebarList: {
    marginTop: theme.spacing.unit * 6,
  },
  mobileBackButton: {
    marginTop: theme.spacing.unit * .5,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing.unit * .625,
    },
    [theme.breakpoints.up("md")]: {
      display: 'none',
    }
  }
});

export default withStyles(styles, { withTheme: true })(SidebarView);
