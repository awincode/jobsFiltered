module.exports = {
    setupFiles: ['./jest.setup.js'],
    
    // moduleNameMapper: {
    //     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/reactTests/__mocks__/fileMock.js',
    //     '\\.(css|less)$': '<rootDir>/client/src/stylesheets/'
    // },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ],   

    snapshotSerializers: ['enzyme-to-json/serializer'],

    setupTestFrameworkScriptFile: './setupTest.js',
};