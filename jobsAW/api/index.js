import { Promise } from 'core-js';
import cities from '../_data/cities';
import companies from '../_data/companies';
import jobs from '../_data/jobs';
import locCommon from '../_loc/common';


const delay = (ms) => new Promise (resolve => setTimeout (resolve, ms));

const delayValue = 500;

export const fetchCities = (fetched) => 
    delay (delayValue).then (() => {
        return cities;
    });

export const fetchCompanies = () => (
    delay (delayValue).then (() => {
        return companies;
    })
)
    
export const fetchLocCommon = () => (
    delay (delayValue).then (() => {
        return locCommon;
    })
)
    
export const fetchJobs = () => (
    delay (delayValue).then (() => {
        return jobs;
    })
)
    