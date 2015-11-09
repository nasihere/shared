module.exports = {
    
    angular: {
        files: [
            {expand: true, src: '**', cwd: 'Qry',     dest: 'dist/Qry'},
            {expand: true, src: '**', cwd: 'Shared',    dest: 'dist/Shared'},
            {expand: true, src: '**', cwd: 'Assets/fonts',    dest: 'dist/fonts'},
            {expand: true, src: '**', cwd: 'Assets/img',    dest: 'dist/img'},
            {expand: true, src: '**', cwd: 'components',    dest: 'dist/components'},
            {src: 'index.html', dest: 'dist/index.html'}
        ]
    }
};
