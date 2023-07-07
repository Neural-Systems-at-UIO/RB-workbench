# Create a docker image github openshift pipeline

## Image Stream
On openshift create a new image stream based on an existing docker image from harbor. it doesnt really matter which image you choose as its not the one that will be tracked. When you create the image you will then be told that OKD is monitoring a particular image stream url (it will match the name of your project and the name you gave your image stream). This is the url you will use in your github action to push your docker image to.
In the image stream configuration yaml you will need to update the importPolicy tag to "scheduled:true", this part of my yaml looks like this:
```yaml
  tags:
    - annotations:
        openshift.io/generated-by: OpenShiftWebConsole
        openshift.io/imported-from: docker-registry.ebrains.eu/ebrains_wizard_test/labbok-web-app
      from:
        kind: DockerImage
        name: docker-registry.ebrains.eu/ebrains_wizard_test/labbok-web-app
      generation: 4
      importPolicy:
        scheduled: true
```
## Github Action
create the following workflow file in your github repo under `.github/workflows/docker-image.yml`
(NOTE:you must update the docker image name and the docker registry url to match your project)

```yaml
name: Build and Push Docker Image

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Build and push Docker image
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin docker-registry.ebrains.eu
          docker build -t docker-registry.ebrains.eu/ebrains_wizard_test/labbok-web-app:latest .
          docker push docker-registry.ebrains.eu/ebrains_wizard_test/labbok-web-app:latest
```

on github go into settings -> Secrets and variables (under Security submenu) -> Actions -> New repository secret and set the following variables:<br>
DOCKER_USERNAME: your docker username <br>
DOCKER_PASSWORD: your docker token you get from harbour (click your username on the top right corner and then click on "User profile")


## Final

This should now work for you, if it doesnt and I have forgotten something please let me know and I will update this guide.