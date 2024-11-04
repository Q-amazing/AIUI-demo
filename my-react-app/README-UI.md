# 1. 创建前端环境


sudo yum install -y nodejs npm
node -v
npm -v

npm init -y
npm cache clean --force
npm install react react-dom lucide-react@0.38.0
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install cors
npm install react-scripts@latest





# 2. 准备文件


my-react-app/
├── frontend/
│ ├── public/
│ │ ├── index.html
│ ├── src/
│ │ ├── App.js
│ │ ├── App.css
│ │ ├── index.js
│ │ ├── index.css
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── ...
└── package.json





# 3. 后端接口准备

创建&激活后端虚拟环境：&#x20;

python3 -m venv venv&#x20;

source venv/bin/activate&#x20;

代码里添加：CORS(app, resources={r"/chat": {"origins": "http://localhost:3000" } } )





# 4. 运行

后台挂起：

PORT=8087 npm start

chmod +x start_npm.sh&#x20;

nohup ./start_npm.sh &



Win配置

* 安装nodejs和VC

* 打开terminal：npm start

* 其他：

  &#x20;配置npm变量：npm config set prefix "E:\node"&#x20;

* 安装组件：npm install lucide-react tailwindcss postcss autoprefixer



# 5. 效果图

![](README-UI_md_files/59cf8b80-9a80-11ef-a6dc-eb3472214bef.jpeg?v=1&type=image)

