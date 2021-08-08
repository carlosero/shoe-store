import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Collapse, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandMore, ExpandLess }  from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const storeCardStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  expander: {
    cursor: 'pointer'
  }
}));

export function StoreCard(props) {
  const classes = storeCardStyles();
  const [expanded, setExpanded] = useState(false);
  const [totalStock, setTotalStock] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  useEffect(() => {
    const newStock = Object.entries(props.shoe_models).map(([id, shoe_model]) => shoe_model.stock).reduce((sum, val) => sum + val)
    setTotalStock(newStock);
  })

  return (
    <Grid item key={props.name}>
      <Card>
        <CardHeader title={props.name} className={classes.cardHeader}/>
        <CardContent>
          <Typography variant="h6" color="inherit" noWrap>
            Available stock: {totalStock}
            { (props.isSearching ? true : expanded) ? <ExpandLess className={classes.expander} onClick={handleExpandClick} /> : <ExpandMore className={classes.expander} onClick={handleExpandClick} />}
          </Typography>
          <Collapse in={props.isSearching ? true : expanded} timeout="auto">
            <List>
              {Object.keys(props.shoe_models).map((modelId) => (
                <ListItem key={modelId}>
                  <ListItemText primary={<div>{props.shoe_models[modelId].name} <b>{props.shoe_models[modelId].stock}</b></div>} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </CardContent>
      </Card>
    </Grid>
  )
}
