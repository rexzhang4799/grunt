module.exports = function(grunt) {
    // ����
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
            /* ѹ��ͼƬ��С */
            dist: {
                options: {
                    optimizationLevel: 3 //���� PNG ͼƬ�Ż�ˮƽ
                },
                files: [
                       {
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,gif,jpg,JPG}'], // �Ż� img Ŀ¼������ png/jpg/jpeg ͼƬ
                    dest: 'dest/img/' // �Ż����ͼƬ����λ�ã����Ǿ�ͼƬ�����Ҳ�����ʾ
                    }
                    ]
                }
            }
    });
    // ����concat��uglify������ֱ���ںϲ���ѹ��
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	// ����cssmin�����cssѹ��
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// ����imagemin�����imageѹ��
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	
    // ע������
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin','imagemin']);
}; 