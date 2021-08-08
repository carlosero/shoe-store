import React, { Component, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, AppBar, Card, CardContent, CardHeader, Container, Grid, Link, Toolbar, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ExpandMore, ExpandLess }  from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  // '@global': {
  //   ul: {
  //     margin: 0,
  //     padding: 0,
  //     listStyle: 'none',
  //   },
  // },
  // appBar: {
  //   borderBottom: `1px solid ${theme.palette.divider}`,
  // },
  // toolbar: {
  //   flexWrap: 'wrap',
  // },
  // toolbarTitle: {
  //   flexGrow: 1,
  // },
  // link: {
  //   margin: theme.spacing(1, 1.5),
  // },
  // heroContent: {
  //   padding: theme.spacing(8, 0, 6),
  // },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  // cardPricing: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'baseline',
  //   marginBottom: theme.spacing(2),
  // },
  // footer: {
  //   borderTop: `1px solid ${theme.palette.divider}`,
  //   marginTop: theme.spacing(8),
  //   paddingTop: theme.spacing(3),
  //   paddingBottom: theme.spacing(3),
  //   [theme.breakpoints.up('sm')]: {
  //     paddingTop: theme.spacing(6),
  //     paddingBottom: theme.spacing(6),
  //   },
  // },
}));

const storesData = [
  {
    name: 'ALDO Centre Eaton',
    models: [{name: 'MIRIRA', stock: 0}, {name: 'BUTAUD', stock: 1}],
    lastUpdatedAt: new Date(),
    totalStock: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: 'ALDO Destiny USA Mall',
    models: [{name: 'SCHOOLER', stock: 0}, {name: 'CADAUDIA', stock: 1}],
    lastUpdatedAt: new Date(),
    totalStock: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: 'ALDO Centre Eaton',
    models: [{name: 'MIRIRA', stock: 0}, {name: 'BUTAUD', stock: 1}],
    lastUpdatedAt: new Date(),
    totalStock: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: 'ALDO Destiny USA Mall',
    models: [{name: 'SCHOOLER', stock: 0}, {name: 'CADAUDIA', stock: 1}],
    lastUpdatedAt: new Date(),
    totalStock: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: 'ALDO Centre Eaton',
    models: [{name: 'MIRIRA', stock: 0}, {name: 'BUTAUD', stock: 1}],
    lastUpdatedAt: new Date(),
    totalStock: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: 'ALDO Destiny USA Mall',
    models: [{name: 'SCHOOLER', stock: 0}, {name: 'CADAUDIA', stock: 1}],
    lastUpdatedAt: new Date(),
    totalStock: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: 'ALDO Centre Eaton',
    models: [{name: 'MIRIRA', stock: 0}, {name: 'BUTAUD', stock: 1}],
    lastUpdatedAt: new Date(),
    totalStock: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: 'ALDO Destiny USA Mall',
    models: [{name: 'SCHOOLER', stock: 0}, {name: 'CADAUDIA', stock: 1}],
    lastUpdatedAt: new Date(),
    totalStock: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: 'ALDO Centre Eaton',
    models: [{name: 'MIRIRA', stock: 0}, {name: 'BUTAUD', stock: 1}],
    lastUpdatedAt: new Date(),
    totalStock: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: 'ALDO Destiny USA Mall',
    models: [{name: 'SCHOOLER', stock: 0}, {name: 'CADAUDIA', stock: 1}],
    lastUpdatedAt: new Date(),
    totalStock: Math.floor(Math.random() * 100) + 1,
  },
]


const storeCardStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  expander: {
    cursor: 'pointer'
  }
}));

function StoreCard(props) {
  const classes = storeCardStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  return (
    <Grid item key={props.name}>
      <Card>
        <CardHeader title={props.name} className={classes.cardHeader}/>
        <CardContent>
          <Typography variant="h6" color="inherit" noWrap>
            Available stock: {props.totalStock}
            { expanded ? <ExpandLess className={classes.expander} onClick={handleExpandClick} /> : <ExpandMore className={classes.expander} onClick={handleExpandClick} />}
          </Typography>
          <Collapse in={expanded} timeout="auto">
            <List>
              {props.models.map((model) => (
                <ListItem>
                  <ListItemText primary={<div>{model.name} <b>{model.stock}</b></div>} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </CardContent>
      </Card>
    </Grid>
  )
}

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Shoe Store
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography component="h1" variant="h2" align="center">
          Stores Dashboard
        </Typography>
      </Container>
      <Container component="main">
        <Grid container spacing={4}>
          {storesData.map((storeData) => (
            <StoreCard name={storeData.name} models={storeData.models} lastUpdatedAt={storeData.lastUpdatedAt} totalStock={storeData.totalStock} />
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
