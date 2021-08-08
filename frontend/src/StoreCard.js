import React, { useState } from 'react';
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
