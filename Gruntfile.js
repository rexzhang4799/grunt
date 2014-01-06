module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
		
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
			options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            jsmin : {
				//src : 'dest/js/dojs.js',
                src : '<%= concat.dojs.dest %>',
				//dest : 'dest/js/dojs.min.js',
				dest : 'dest/js/dojs<%= grunt.template.today("yymmddHHMMss")%>.min.js'
            }
        },
		cssmin : {
           cssmin : {
                //src : 'dest/css/docss.css',
				src : '<%= concat.docss.dest %>',
                //dest : 'dest/css/docss.min.css',
				dest : 'dest/css/docss<%= grunt.template.today("yymmddHHMMss")%>.min.css'
            }
        },
		imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [
                       {
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,gif,jpg,JPG}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: 'dest/img/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                    }
                    ]
                }
            }
    });
    // 载入concat和uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	// 载入cssmin插件，css压缩
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// 载入imagemin插件，image压缩
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	
    // 注册任务
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin','imagemin']);
}; 