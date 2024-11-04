1. 创建前端环境
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

2. 准备文件
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


3. 创建&激活后端虚拟环境：
python3 -m venv venv
source venv/bin/activate
CORS(app, resources={r"/chat": {"origins": "http://localhost:3000"}})



3. 后台挂起PORT=8087 npm start：
chmod +x start_npm.sh
nohup ./start_npm.sh &


Win配置

- 安装nodejs和VC
- 打开terminal：
配置npm变量：npm config set prefix "E:\node"
npm install lucide-react tailwindcss postcss autoprefixer
