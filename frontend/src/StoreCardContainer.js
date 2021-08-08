import { Container, Grid } from '@material-ui/core';
import { StoreCard } from './StoreCard';

export function StoreCardContainer(props) {

  return (
    <Container component="main" >
      <Grid container spacing={4}>
        {Object.keys(props.storesData).map((storeId) => (
          <StoreCard key={storeId} name={props.storesData[storeId].name} shoe_models={props.storesData[storeId].shoe_models} lastUpdatedAt={props.storesData[storeId].updated_at} totalStock={props.storesData[storeId].total_stock} />
        ))}
      </Grid>
    </Container>
  )
}
