module.exports = {
	less: {
        files: [
            {'app/app/styles/app.css': ['app/app/less/app.less']},
            {'app/app/styles/material-design-icons.css': ['app/app/less/md.icon.less']}
        ],
        options: {
          compile: true
        }
    },
    angular: {
        files: {
            'app/angular/styles/app.min.css': [
                'app/libs/jquery/bootstrap/dist/css/bootstrap.css',
                'app/app/styles/font.css',
                'app/app/styles/app.css'
            ]
        },
        options: {
            compress: true
        }
    },
    html: {
        files: {
            'app/html/styles/app.min.css': [
                'app/libs/jquery/bootstrap/dist/css/bootstrap.css',
                'app/app/styles/font.css',
                'app/app/styles/app.css'
            ]
        },
        options: {
            compress: true
        }
    }
}
