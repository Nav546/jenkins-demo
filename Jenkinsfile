pipeline {
    agent none

    stages {
        stage('Install and Test') {
            agent {
                docker { image 'node:20-alpine' }
            }
            steps {
                sh 'node --version'
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build image') {
            agent any
            steps {
                sh 'docker build -t jenkins-demo:${BUILD_NUMBER} .'
            }
        }
        stage('Deploy locally') {
            agent any
            steps {
                sh 'docker rm -f jenkins-demo || true'
                sh 'docker run -d --name jenkins-demo -p 3000:3000 jenkins-demo:${BUILD_NUMBER}'
            }
        }
    }
}
