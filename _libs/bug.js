const bug = console.log

// get runtime object values
bug.rt = (...args) => {
    // const newArray = args.map(item => JSON.parse(JSON.stringify(item)));
    console.log(...args.map(item => JSON.parse(JSON.stringify(item))));
};


//    =======   Profiling   =======    \\
// timer
bug.time = (desc = 'answer time') => {  // description
    console.time(desc);
    // bug['timeStart_' + desc] = new Date().getTime();
};
bug.timeEnd = (desc = 'answer time') => {  // description
    console.timeEnd(desc);
    // bug['timeStart_' + desc] = new Date().getTime();
};


export default bug;