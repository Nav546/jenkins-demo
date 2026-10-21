**Jenkins Jenkins CI/CD Demo**

A small Node.js app used to practice building a CI/CD pipeline with Jenkins, running locally in Docker.

**What this project demonstrates**

A Jenkins pipeline defined as code in a Jenkinsfile, stored in this repo rather than typed into the Jenkins UI.
Jenkins automatically pulling this repo from GitHub and checking out the latest commit on every build.
A pipeline with multiple stages: checking out code, verifying available tools, and running the app’s tests.
Running Jenkins itself inside Docker Desktop on Windows, with a persistent volume so jobs and configuration survive container restarts.

**App**

A minimal Express.js app with a health check endpoint, used purely to give the pipeline something real to build and test.

app.js: the Express server
test.js: a basic test that hits the health check endpoint and checks the response
package.json: dependencies and scripts
Jenkinsfile: the pipeline definition Jenkins runs

**Status**

Work in progress. Currently builds and checks out successfully. Next steps: running the build and tests inside a Node Docker container, then building and pushing a Docker image as part of the pipeline.
