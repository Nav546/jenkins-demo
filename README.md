# Jenkins CI/CD Demo

A small Node.js app with a complete Jenkins CI/CD pipeline: every push to this repo is automatically tested, built into a Docker image, pushed to Docker Hub, and deployed as a running container.

## Pipeline stages

1. **Install and Test**: runs inside a temporary `node:20-alpine` Docker container, installs dependencies, and runs the test suite against the app's health check endpoint.
2. **Build image**: builds a Docker image from the app, tagged with both the Jenkins build number and `latest`.
3. **Push to Docker Hub**: pushes both tags to a Docker Hub repository, authenticating with a token stored in Jenkins credentials, never in the code.
4. **Deploy locally**: stops any previous container and runs the newly built image, making the app live on port 3000.

Builds trigger automatically on every Git push, via Jenkins Poll SCM.

## App

A minimal Express.js app with a health check endpoint, used to give the pipeline something real to build and test.

- `app.js`: the Express server
- `test.js`: a basic test that hits the health check endpoint and checks the response
- `package.json`: dependencies and scripts
- `Dockerfile`: builds the app into a container image
- `Jenkinsfile`: the full pipeline definition

## Infrastructure

Jenkins runs locally in Docker Desktop on Windows, built from a custom image with the Docker CLI installed, so it can build and run containers on the host's Docker engine. Jenkins data (jobs, credentials, plugins) persists in a named Docker volume across container restarts.

## What this demonstrates

Pipeline as code, containerised builds, dependency and test automation, secure credential handling, and Docker image publishing, triggered automatically from version control.

## Status

Working end to end, from commit to a deployed container. Next: redeploying the same pipeline on an Azure VM as a cloud portfolio piece.
