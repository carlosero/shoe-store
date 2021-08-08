import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Container, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { StoreCardContainer } from './StoreCardContainer';
import { ActionCableContext } from '.';

function App() {
  const [channel, setChannel] = useState(null)
  const [storesData, setStoresData] = useState({});
  let initialized = false;

  const handleReceived = (storesData) => {
    // const newData = {...storesData, [storeData.id]: storeData}
    setStoresData(storesData);
  }

  const cable = useContext(ActionCableContext);
  useEffect(() => {
    // connect channel
    const channel = cable.subscriptions.create(
      { channel: 'InventoryChannel' },
      { received: handleReceived }
    )

    setChannel(channel)

    // fetch current db state from backend
    axios.get('http://localhost:5000/api/v1/inventory').then((response) => {
      setStoresData(response.data);
    });

    initialized = true;

    return () => {
      channel.unsubscribe()
    }
  }, [initialized])

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
      <StoreCardContainer storesData={storesData} />
    </React.Fragment>
  );
}

export default App;
