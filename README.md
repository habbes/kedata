# kedata

A tool to help visualize statistical data of Kenya's 47 counties.

[https://kedata.herokuapp.com](https://kedata.herokuapp.com)

## Installation
- Make sure you have installed [Node JS]()
- Clone the repository `$ git clone https://github.com/habbes/kedata`
- Install depedencies: `$ npm install`
-- Make sure dev-dependencies are installed
- Run the server `$ node .`

## New Datasets
To add a new dataset:
- Copy the dataset's csv file to `resources/dataset`
- Run `$ npm run data`, this will regenerate JSON database with the dataset included in `public/data/data.json`
- **Note:** The application currently only supports datasets with 2 columns, one for the county names and the other for numeric values
- **Note:** This command will log warnings when it finds a county name it cannot match. Correct that row with correct county name
- Counties in the csv should have the same name as in the `resouces/counties-ids.json` file


