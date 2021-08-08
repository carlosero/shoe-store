## Backend
Backend is based off rails so we need to so some configurations before starting the server:
- Install gems with: `bundle install`
- Initialize/start a postgresql DB or container. No special PG version/extension required, just have it open on 5432 for user 'postgres'
```
docker run -d --name shoe-store-db -e POSTGRES_HOST_AUTH_METHOD=trust -p 5432:5432 postgres
```
- Go into backend (`cd backend`) and run `rails db:schema:load` for initializing.
- Start server with `rails s -b 0.0.0.0 -p 5000`

### Test that your installation works
- Initialize test DB `RAILS_ENV=test rails db:schema:load`
- Run `RAILS_ENV=test rspec`

### Inventory Analysis tool
- If the inventory is going crazy and you don't know what to do, simply use this tool and do what it says, it will get better:
- Run `rake inventory_analysis`
