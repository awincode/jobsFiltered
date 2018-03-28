import bug from '../../_libs/bug';

// --> id would be for a single job details (to implement)
export default (language, data, id) => {

    const jobDetails = data.jobs.get ('details');
    const jobsLoc = data.jobs.getIn (['loc', language]);

    const cities = data.cities;
    const companies = data.companies;
    const langCommon = data.locCommon.get (language);
    const cityName = langCommon.getIn (['city', 'name']);
    const countryName = langCommon.getIn (['country', 'name']);
    const jobType = langCommon.getIn (['job', 'type']);
    const compIndy = langCommon.getIn (['company', 'indy']);

    const getJobData = (job) => {
        const jobLoc = jobsLoc.get (job.id + '');
        const jobCity = cities.get (job.city);
        const jobCompany = companies.get (job.company);

        job.text = {
            city: cityName.get (job.city),
            country: countryName.get (job.country),
            company: jobCompany.get ('name'),
            indy: compIndy.get (jobCompany.get ('indy') + ''),
            type: jobType.get (job.type + ''),
            title: jobLoc.get('title'),
            intro: jobLoc.get ('intro'),
        };

        job.param = {
            indy: jobCompany.indy,
            emply: jobCompany.emply,
            pop: jobCity.pop
        };

        return job;
    };


    return id ?
        [getJobData (jobDetails[id + ''])] :
        jobDetails.map (getJobData).toArray ();
};