FROM jenkins/jenkins:lts
USER root
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs npm
USER jenkins
