module.exports = {
    plugins: [
        require('postcss-import')({
            path: [
                'src/common/styles'
            ]
        }),
        require('postcss-for'),
        require('postcss-nested'),
        require('postcss-cssnext')({ browsers: ['last 2 versions', 'Firefox >= 47', 'Chrome >= 49', 'Safari >= 9'] })
    ]
};
