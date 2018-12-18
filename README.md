# Ankr-UI

<a href="https://travis-ci.org/cloudfoundry-incubator/stratos/branches"><img src="https://travis-ci.org/cloudfoundry-incubator/stratos.svg?branch=v2-master"></a>&nbsp;<a style="padding-left: 4px" href="https://codeclimate.com/github/cloudfoundry-incubator/stratos/maintainability"><img src="https://api.codeclimate.com/v1/badges/61af8b605f385e894632/maintainability" /></a>
<a href="https://goreportcard.com/github.com/cloudfoundry-incubator/stratos"><img src="https://goreportcard.com/badge/github.com/cloudfoundry-incubator/stratos"/></a>
<a href="https://codecov.io/gh/cloudfoundry-incubator/stratos/branch/v2-master"><img src="https://codecov.io/gh/cloudfoundry-incubator/stratos/branch/v2-master/graph/badge.svg"/></a>
<a href="https://app.zenhub.com/workspace/o/cloudfoundry-incubator/stratos/boards"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"/></a>
[![GitHub release](https://img.shields.io/github/release/cloudfoundry-incubator/stratos.svg)](https://github.com/cloudfoundry-incubator/stratos/releases/latest)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/cloudfoundry-incubator/stratos/blob/master/LICENSE)
[![slack.cloudfoundry.org](https://slack.cloudfoundry.org/badge.svg)](https://cloudfoundry.slack.com/messages/C80EP4Y57/)


![Stratos Application view](docs/images/screenshots/app-summary.png)

## Quick Start

To build and start Ankr-UI on your local machine, follow these steps from the root directory:

1. `docker build -f deploy/Dockerfile.all-in-one . -t stratos`

2. `cd deploy/uaa`

`./prepare.sh`

`sudo docker build -f Dockerfile.dev -t uaa .`

3. `docker network create --driver=bridge dev-bridge`

`docker run -p 4443:443 --net=dev-bridge stratos`

`docker run --net=dev-bridge --name=uaa uaa`

4. Access the Console at http://localhost:4443/ and provide the following information: UAA Endpoint API URL: `http://uaa:8080` Client ID: `console` Client Secret: Leave this blank Admin Account: `admin` Password: `hscadmin`

5. Click `enter` and select the following from the list: `stratos.admin`

The Console is now ready to be used.


## Deploying Stratos

Stratos can be deployed in the following environments:

1. Cloud Foundry, as an application. See [guide](deploy/cloud-foundry)
2. Kubernetes, using a Helm chart. See [guide](deploy/kubernetes)
3. Docker, using docker compose. See [guide](deploy/docker-compose)
4. Docker, single container deploying all components. See [guide](deploy/all-in-one)

## Troubleshooting
Please see our [Troubleshooting](docs/troubleshooting) page.

## Project Planning
We use [ZenHub](https://zenhub.com) for project planning. Feel free to head over to the [Boards](https://github.com/SUSE/stratos#boards)
tab and have a look through our pipelines and milestones. Please note in order to view the Github ZenHub Boards tab you will need the [ZenHub
browser extension](https://www.zenhub.com/extension). Alternatively, to view the planning board without the extension visit our [ZenHub Project Page](https://app.zenhub.com/workspace/o/cloudfoundry-incubator/stratos/boards)

## Further Reading
 
Take a look at the [Feature Set](docs/features.md) for details on the feature set that Stratos provides.
 
Get an [Overview](docs/overview.md) of Stratos, its components and the different ways in which it can be deployed.

Take a look at the [Development Roadmap](docs/roadmap.md) to see where we are heading. We update our status page each week to summarize what we are working on - see the [Status Page](docs/status_updates.md).

Browse through features and issues in the project's [issues](https://github.com/cloudfoundry-incubator/stratos/issues) page or [Zenhub Board](https://github.com/cloudfoundry-incubator/stratos#boards).

What kind of code is in Stratos? We've integrated [Code Climate](https://codeclimate.com) for some code quality and maintainability metrics. Take a stroll around the [project page](https://codeclimate.com/github/SUSE/stratos)

## Contributing

We very much welcome developers who would like to get involved and contribute to the development of the Stratos project. Please refer to the [Contributing guide](CONTRIBUTING.md) for more information.

For information to help getting started with development, please read the [Developer's Guide](docs/developers-guide.md).

## Support and feedback

We have a channel (#stratos) on the Cloud Foundy Slack where you can ask questions, get support or give us feedback. We'd love to hear from you if you are using Stratos.

You can join the Cloud Foundry Slack here - https://slack.cloudfoundry.org/  - and then join the #stratos channel.

## Acknowledgements

Tested with Browserstack

<a href="https://www.browserstack.com"><img width="240px" src="docs/images/Browserstack-logo.svg" alt="Browserstack"></a>

## License

The work done has been licensed under Apache License 2.0. The license file can be found [here](LICENSE).
