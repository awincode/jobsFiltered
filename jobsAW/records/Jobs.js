import { Record } from 'immutable';

const JobsRecord = Record({
    id: 0,
    company: '',
    country: '',
    city: '',
    smin: 0,
    smax: 0,
    url: '',
    pubDate: undefined,
    startDate: undefined,
    type: 0,
    duration: undefined
})

const Jobs = JobsRecord;

export default Jobs;
