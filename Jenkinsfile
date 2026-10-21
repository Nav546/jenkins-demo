pipeline {
    agent any

    environment {
        IMAGE     = 'jenkins-demo'
        CONTAINER = 'jenkins-demo-app'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build image') {
            steps {
                sh '''
                    docker build -t ${IMAGE}:${BUILD_NUMBER} -t ${IMAGE}:latest .
                '''
            }
        }

        stage('Run container') {
            steps {
                sh '''
                    docker rm -f ${CONTAINER} || true
                    docker run -d --name ${CONTAINER} -p 5000:5000 ${IMAGE}:latest
                    sleep 3
                '''
            }
        }

        stage('Smoke test') {
            steps {
                // Runs inside the app container, because published ports land on
                // the Docker Desktop host, not inside the Jenkins container.
                sh '''
                    docker exec ${CONTAINER} python -c "import urllib.request, sys; r = urllib.request.urlopen('http://localhost:5000/health'); print(r.read().decode()); sys.exit(0 if r.status == 200 else 1)"
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logs ${CONTAINER} || true'
        }
        success {
            echo 'Build passed. App is running at http://localhost:5000'
        }
        failure {
            sh 'docker rm -f ${CONTAINER} || true'
        }
    }
}
