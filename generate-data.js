'use strict';

/**
 * This script converts datasets data from csv files in
 * the resources/datasets folder to a json db compatible
 * with the svg map data and easier to access by the app
 */

const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const async = require('async');
const countiesIds = require('./resources/counties-ids.json');

const DATASET_DIR = 'resources/datasets';
// destination of the json db
const DB_DIR = 'public/data';
const DB_FILENAME = 'data.json';

/*
 * run script if started directly
 */
if(require.main === module){
    generateDb()
    .then(() => console.log('db.json generated successfully'))
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
                        if(err.code !== 'EEXIST') return reject(err);
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
 */
function initDb(counties){
    let db = {};
    db.data = {};
    db.datasets = [];
    
    for(let county in counties){
        let id = counties[county];
        db.data[id] = {
            id: id,
            name: county
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
            db.data[id][datasetName] = row[datasetName];            
        })
        .on('end', () => {
            resolve(db);
        });
    });
}



