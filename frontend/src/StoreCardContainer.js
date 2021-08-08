import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField } from '@material-ui/core';
import { StoreCard } from './StoreCard';

export function StoreCardContainer(props) {
  const [filteredStoresData, setFilteredStoresData] = useState(props.storesData);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isSearching)
      setFilteredStoresData(props.storesData);
  })

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();

    // if nothing to search, exit
    if (value == null || value == undefined || value === '') {
      setFilteredStoresData(props.storesData);
      setIsSearching(false);
      return;
    }

    // if isSearching then we expand cards automatically and don't use the data from cable
    setIsSearching(true);

    // search!
    const storesDataArray = Object.entries(props.storesData).map(([id, store]) => {
      const shoeModels = Object.entries(store.shoe_models)
      return [id, {...store, shoe_models: shoeModels}]
    })
    const matchesArray = storesDataArray.map(([id, store]) => {
      const shoeModelMatches = store.shoe_models.filter(([shoe_model_id, shoe_model]) => {
        return shoe_model.name.toLowerCase().indexOf(value) != -1 && shoe_model.stock > 0
      })
      return [id, {...store, shoe_models: shoeModelMatches}]
    });
    const matches = matchesArray.filter(([id, store]) => store.shoe_models.length > 0)

    const result = Object.fromEntries(matches.map(([id, store]) => {
      return [id, {...store, shoe_models: Object.fromEntries(store.shoe_models)}]
    }))
    setFilteredStoresData(result);
  }

  return (
    <React.Fragment>
      <Container>
        <TextField placeholder="Search for any model..." onChange={handleSearch} />
      </Container>
      <Container component="main" >
        <Grid container spacing={4}>
          {Object.keys(filteredStoresData).map((storeId) => (
            <StoreCard key={storeId} name={filteredStoresData[storeId].name} shoe_models={filteredStoresData[storeId].shoe_models} lastUpdatedAt={filteredStoresData[storeId].updated_at} isSearching={isSearching} />
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
