pipeline {
    agent none

    environment {
        IMAGE = 'naveen546/jenkins-demo'
    }

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
                sh 'docker build -t ${IMAGE}:${BUILD_NUMBER} -t ${IMAGE}:latest .'
            }
        }
        stage('Push to Docker Hub') {
            agent any
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DH_USER', passwordVariable: 'DH_TOKEN')]) {
                    sh 'echo "$DH_TOKEN" | docker login -u "$DH_USER" --password-stdin'
                    sh 'docker push ${IMAGE}:${BUILD_NUMBER}'
                    sh 'docker push ${IMAGE}:latest'
                }
            }
        }
        stage('Deploy locally') {
            agent any
            steps {
                sh 'docker rm -f jenkins-demo || true'
                sh 'docker run -d --name jenkins-demo -p 3000:3000 ${IMAGE}:${BUILD_NUMBER}'
            }
        }
    }
}
