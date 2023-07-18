# Build node image from Node Docker Hub
FROM node:16

# Set node environment as docker-build
ENV NODE_ENV="docker-build"

# Make app directory in container
RUN mkdir /app

# Identify working directory
WORKDIR /app

# Copy over app to app folder
COPY . /app

# Install rpm packages from package.json
RUN sudo npm cache clean --force && sudo npm install --force

# Build the react app
RUN npm run build

# Reset node environment variable
ENV NODE_ENV=""

# Run the app as a non-privileged user
RUN chown -R 1001:0 . && chmod -R gu+s+rw .
USER 1001

# Expose server at port ( accessible outside of container)
EXPOSE 8080 

# Start app. Need to run setup first to prepare the app for production
CMD node backend/server.js


# To build, use the following command:
# docker build .

# To build for Open Shift (from Apple Pro M1), use the following command:
# docker build --platform=linux/amd64 .

# To run, use the following command:
# docker run -it -d -P --name workbench --env WORKBENCH_OIDC_CLIENT_SECRET=$OIDC_CLIENT_SECRET <IMAGE ID>

# To push to EBRAINS Docker registry
# docker login docker-registry.ebrains.eu

# docker image tag <image id> docker-registry.ebrains.eu/<project_name>/<repository_name>:<tag>
# docker push docker-registry.ebrains.eu/<project_name>/<repository_name>:<tag>

# Example:
# docker image tag 5636942fc2ed docker-registry.ebrains.eu/ebrains_wizard_test/labbok-web-app:0.1.25
# docker push docker-registry.ebrains.eu/ebrains_wizard_test/labbok-web-app:0.1.4


#and then you get a sha id which can be pasted into the openshift config