FROM ubuntu:20.04

RUN useradd -ms /bin/bash sandbox

#Setup working directory
WORKDIR /home/sandbox

#update the ubuntu machine
RUN apt update && apt upgrade -y

#install nano and curl
RUN apt install nano curl -y

#install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt install nodejs -y

#configuring terminal to display current working directory
RUN echo "PS1='\w '" >> /home/sandbox/.bashrc

#Setup final working directory
WORKDIR /home/sandbox/app



