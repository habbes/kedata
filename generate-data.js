'use strict';

/**
 * This script converts datasets data from csv files in
 * the resources/datasets folder to a json db compatible
 * with the svg map data and easier to access by the app
 * 
 * The json db will have the following structure
 * 
 * {
 *   counties: {
 *      county1id: {
 *          id: 'county1id',
 *          name: 'county1name'
 *      },
 *      ...
 *   },
 *   datasets: [
 *      'dataset1',
 *      ...
 *   ],
 *   data: {
 *      dataset1: {
 *          county1id: value,
 *          ...
 *      },
 *      ...
 *   }
 * }
 */

const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const async = require('async');
const s = require('underscore.string');
const countiesIds = require('./resources/counties-ids.json');

const DATASET_DIR = 'resources/datasets';
// destination of the json db
const DB_DIR = 'public/data';
const DB_FILENAME = 'data.json';

/*
 * run script if started directly
 */
if(require.main === module){
    console.log('-- Genrating JSON data');
    generateDb()
    .then(() => console.log(`${DB_DIR}/${DB_FILENAME} generated successfully`))
    .catch(console.err);
}

/**
 * generates a json db of county data from the csv datasets
 */
function generateDb(){
    return new Promise((resolve, reject) => {
        let db = initDb(countiesIds);
        getDatasets(DATASET_DIR).then((datasets) => {
            async.each(
                datasets,
                (dataset, itCb) => {
                    readDataset(dataset, db, countiesIds)
                    .then((db) => {
                        itCb();
                    }).catch(itCb);
                },
                (err) => {
                    if(err) return reject(err);
                    fs.mkdir(DB_DIR, (err) => {
                        // ignore 'directory exists' error
                        if(err && err.code !== 'EEXIST') return reject(err);
                        fs.writeFile(path.join(DB_DIR, DB_FILENAME), JSON.stringify(db), (err) => {
                            if(err)return reject(err);
                            resolve(db);
                        });                        
                    });                    
                }
            );
        });
    });
}

/**
 * Initialize json db with county names and ids
 * @param {object} namesIdMap map of county names to ids
 */
function initDb(namesIdMap){
    let db = {};
    db.counties = {};
    db.data = {};
    db.datasets = [];
    
    for(let name in namesIdMap){
        let id = namesIdMap[name];
        db.counties[id] = {
            id: id,
            name: name
        };
    }
    return db;
}

/**
 * get all datasets files in the datasets directory
 * @param {string} dir datasets directory
 */
function getDatasets(dir){
    return new Promise((resolve, reject) => {
       fs.readdir(dir, (err, files) => {
           if(err) return reject(err);
           return resolve(files.map((file) => path.join(dir, file)));
       });
    });
}

/**
 * read a dataset and insert its data in the json db
 * @param {string} dataset dataset file
 * @param {object} db the json db
 * @param {object} namesIdMap map of country names to ids
 */
function readDataset(dataset, db, namesIdMap){
    return new Promise((resolve, reject) => {
        console.log(`-Dataset: ${dataset}`);
        let datasetName = path.basename(dataset, '.csv');
        db.datasets.push(datasetName);
        // object to store dataset values for each county
        db.data[datasetName] = {};
        fs.createReadStream(dataset)
        // the csv files have 3 columns
        .pipe(csv(['Country','County', datasetName]))
        .on('data', (row) => {
            let key = 'Counties' in row? 'Counties': 'County';
            let county = row[key];
            if(!(county in namesIdMap)){
                return console.warn(`--WARN: Unknown County: ${county} in ${dataset}`);
            }
            
            
            let id = namesIdMap[county];
            // convert value to number
            let value = s(row[datasetName]).clean().replaceAll(',','').toNumber(3);
            // if not number revert to original
            if(value === NaN) value = row[datasetName];
            // store county's value for this dataset
            db.data[datasetName][id] = value;            
        })
        .on('end', () => {
            resolve(db);
        });
    });
}
