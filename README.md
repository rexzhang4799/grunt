
1. 装[node.js](http://nodejs.org)环境,下一步下一步搞定;
2. npm config set proxy http://proxy.tencent.com:8080;
3. npm config set https-proxy http://proxy.tencent.com:8080;
4. 公司外省略2，3步，安装后可以打开cmd命令行查看nodejs版本.命令：node-v;
5. cmd命令行下安装grunt命令行工具grunt-cli.命令：npm install -g grunt-cli;
6. 安装后，可以查看改工具的版本.命令：grunt -version;
7. 在项目中安装grunt;

>1. 新建项目my team；
2. 命令：npm install grunt --save-dev
3. 新建文件package.json
4. 新建文件Gruntfile.js
5. 命令行执行grunt任务