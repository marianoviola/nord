FROM node:12-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# R

RUN apk add build-base R R-dev R-doc

RUN Rscript -e 'install.packages("remotes", repos = c(CRAN = "https://cloud.r-project.org"))'
RUN Rscript -e 'remotes::install_github("rstudio/renv")'

COPY ./scripts/renv.lock renv.lock

RUN Rscript -e 'renv::restore()'

# Node

COPY ./package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "index.js" ]
