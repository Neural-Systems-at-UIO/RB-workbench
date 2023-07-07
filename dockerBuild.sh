
echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin docker-registry.ebrains.eu
sudo docker build -t docker-registry.ebrains.eu/ebrains_wizard_test/labbok-web-app:latest  .
sudo docker push docker-registry.ebrains.eu/ebrains_wizard_test/labbok-web-app:latest