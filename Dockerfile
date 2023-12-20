FROM jenkins/jenkins
USER root
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
USER jenkins