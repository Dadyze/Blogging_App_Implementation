pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "adinjahic/mastercicd"
        SERVER_IP = "141.147.54.205"
        SERVER_USER = "ubuntu"
        DOCKERHUB_USERNAME = "${DOCKERHUB_USERNAME}" // Fetch from global properties
        DOCKERHUB_PASSWORD = "${DOCKERHUB_PASSWORD}" // Fetch from global properties
        SSH_PRIVATE_KEY = "${SSH_PRIVATE_KEY}" // Fetch from global properties
    }

    stages {
        stage('Build') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'github-access-token', variable: 'GITHUB_TOKEN')]) {
                        // Remove existing directory if it exists
                        sh 'rm -rf BlogApp-in-NodeJS'
                        // Clone the repository using the GitHub token
                        sh 'git clone https://github.com/Dadyze/BlogApp-in-NodeJS.git'
                        dir('BlogApp-in-NodeJS') {
                            // Install dependencies and run tests to ensure the project is ready for deployment
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Backup') {
            steps {
                script {
                    dir('BlogApp-in-NodeJS') {
                        // Get the shortened commit hash
                        COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                        // Build the Docker image with the tag of the shortened commit hash
                        sh "docker build -t ${DOCKER_IMAGE}:${COMMIT_HASH} ."

                        // Login to Docker Hub
                        sh "echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin"

                        // Push the Docker image to Docker Hub
                        sh "docker push ${DOCKER_IMAGE}:${COMMIT_HASH}"

                        // Optionally tag and push 'latest'
                        sh "docker tag ${DOCKER_IMAGE}:${COMMIT_HASH} ${DOCKER_IMAGE}:latest"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Use the SSH private key securely
                    withCredentials([sshUserPrivateKey(credentialsId: 'server-ssh-key', keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                        sh """
                        ssh -i "${SSH_PRIVATE_KEY}" -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} << 'EOF'
                        sudo docker pull ${DOCKER_IMAGE}:${COMMIT_HASH}
                        sudo docker stop blogapp || true
                        sudo docker rm blogapp || true
                        sudo docker run -d -p 3000:3000 --name blogapp ${DOCKER_IMAGE}:${COMMIT_HASH}
                        """
                    }
                }
            }
        }
    }
}
