pipeline {
    agent any

    environment {
        GIT_URL = "https://github.com/dpcomm/cba_app_management.git"
    }
    tools {
        nodejs 'nodejs-18.16.0'
    }
    stages {
        stage('Pull') {
            steps {
                echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
                git url: "${GIT_URL}", branch: "master", poll: true, changelog: true
                sh "sudo cp /home/joey/cba/ws_data/.env /var/lib/jenkins/workspace/cba_connect_management/"
            }
        }
        stage('Build') {
            steps {
                sh "npm ci"
                sh "npm run build"
            }
        }
        stage('Wipe') {
            steps {
                sh "sudo docker exec cba_ws rm -rf /usr/share/nginx/html/management"
            }
        }
        stage('Copy') {
            steps {
                sh "sudo docker exec cba_ws mkdir -p /usr/share/nginx/management"
                sh "sudo docker cp /var/lib/jenkins/workspace/cba_connect_management/dist/. cba_ws:/usr/share/nginx/html/management"
            }
        }
        stage('Reload') {
            steps {
                sh "sudo docker exec cba_ws nginx -s reload"
            }
        }
    }
}
