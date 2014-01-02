module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
		options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
        concat : {
            dojs : {
                src: ['src/js/ScrollBar.js', 'src/js/UserData.js'],
                dest: 'dest/js/dojs.js'
            },
			docss : {
                src: ['src/css/css1.css', 'src/css/css2.css'],
                dest: 'dest/css/docss.css'
            }
        },
        uglify : {
            jsmin : {
                src : 'dest/js/dojs.js',
                dest : 'dest/js/dojs.min.js'
            }
        },
		cssmin : {
           cssmin : {
                src : 'dest/css/docss.css',
                dest : 'dest/css/docss.min.css'
            }
        }
    });
    // 载入concat和uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	// 载入cssmin插件，css压缩
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
    // 注册任务
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
}; 