import bug from '../../_libs/bug';


export default (language, data) => {
    const loc = data.locCommon.get(language);

    return {
        filter: loc.get('filter'),
        city: loc.get('city'),
        comp: loc.get('company'),
        job: loc.get('job'),
    };
};