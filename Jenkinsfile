pipeline {
    agent any

    environment {
        NODE_VERSION = '18'  // Set Node.js version
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Akash-Softw/BMI_APP.git'  // Replace with your GitHub repo URL
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    def nodeExists = sh(script: 'which node', returnStatus: true)
                    if (nodeExists != 0) {
                        sh 'curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -'
                        sh 'sudo apt-get install -y nodejs'
                    }
                }
                sh 'node -v'  // Verify Node.js version
                sh 'npm -v'   // Verify npm version
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'  // Ensure your package.json has a "build" script
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'  // Ensure your package.json has a "test" script
            }
        }
    }

    post {
        success {
            echo "Build and tests passed successfully! ✅"
        }
        failure {
            echo "Build or tests failed! ❌"
        }
    }
}
