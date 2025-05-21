pipeline {
    agent any

    environment {
        VERSION = "${BUILD_NUMBER}"
        FRONTEND_IMAGE = "sumithaapvr/book-app"
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "📥 Cloning repository..."
                git branch: 'main', url: 'https://github.com/sumithaapvr/BookStore.git'
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    echo "🔨 Building frontend image: ${FRONTEND_IMAGE}:${VERSION}"
                    docker.build("${FRONTEND_IMAGE}:${VERSION}", './demo')
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    echo "📦 Pushing images to Docker Hub..."
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        docker.image("${FRONTEND_IMAGE}:${VERSION}").push()
                        docker.image("${FRONTEND_IMAGE}:${VERSION}").tag('latest')
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }

                stage('Deploy') {
            steps {
                script {
                    echo "🚀 Deploying frontend container..."

                    sh '''
                    echo "🔍 Checking for existing container on port 3002..."
                    CONTAINER_ID=$(docker ps -q --filter "publish=3002")
                    if [ ! -z "$CONTAINER_ID" ]; then
                        echo "🛑 Stopping container using port 3002..."
                        docker stop $CONTAINER_ID
                        docker rm $CONTAINER_ID
                    fi

                    echo "🧽 Removing old container named 'my-book-app' if it exists..."
                    docker rm -f my-book-app || true

                    echo "🚀 Running new container..."
                    docker run -d --name my-book-app -p 3002:80 ${FRONTEND_IMAGE}:${VERSION}
                    '''
                }
            }
        }


        stage('Cleanup') {
            steps {
                echo "🧹 Cleaning up unused Docker images..."
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo "✅ Build, push, and deployment successful! Images tagged with version: ${VERSION}"
        }
        failure {
            echo "❌ Something went wrong. Check the logs above for errors."
        }
    }
}
