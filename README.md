# Admix Inventory App


# How to run project

- Run npm install (it will install all the related packages which are required to run the project)
- Run npm start (it will start webpack server at http://localhost:3000/)

# Implementation Details

- Create my own boilerplate to setup React with Webpack server and didn't use CRA(create-react-app).
- Used React Router V6 for application routing.
- Saas has been setup from Webpack.
- Ant Design is used as a UI Framework.
- **axios** is used for API Integration.
- Search is implemented with **Autocomplete** together with **debounce** concept.
- Redux is used to manage state throughout the application.
- Utils are created to handle some logic such useSort, useFilters, convertDate, convertAvails.
- Interfaces are created to handle type checking.
- For the filters such as Avails, UpdatedAt I am fetching all values from the service, filter unique values and added greater than and less than so that we can apply filters accordingly.
- Similarly, for the Age (contentRating) filter, I am getting the data from service and filter unique values and populate it.
- For Categories filter, we have constant values with type googlePlayStoreInfo or appStoreInfo to differentiate.
