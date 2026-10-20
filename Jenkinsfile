pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Code pulled from Git by Jenkins'
                sh 'ls -la'
            }
        }
        stage('Check tools') {
            steps {
                sh 'node --version || echo "Node is NOT installed"'
            }
        }
    }
}
