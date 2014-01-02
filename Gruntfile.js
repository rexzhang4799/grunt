module.exports = function(grunt) {
    // ����
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
    // ����concat��uglify������ֱ���ںϲ���ѹ��
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	// ����cssmin�����cssѹ��
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
    // ע������
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
}; 