# GHI Electronics Brain Pad target for PXT

## Build and hosted editor
Hosted website: https://5ecba313-4436-4d40-809e-0a7e8abc99de.pxt.io

Jenkins build: https://ci2.dot.net/job/Private/job/pxt_project_blue/job/master/

## Local Dev setup

These instructions assume familiarity with dev tools and languages.

* install Node.js 6+
* (optional) install [Visual Studio Code](https://code.visualstudio.com/)

In a common folder,

* clone https://github.com/Microsoft/pxt to ``pxt`` folder
* clone https://github.com/Microsoft/pxt-common-packages to ``pxt-common-packages`` folder
* clone https://github.com/Microsoft/pxt-brainpad to ``pxt-brainpad`` folder
* go to ``pxt`` and run

```
npm install
jake
```

* go to ``pxt-common-packages`` and run

```
npm install
npm link ../pxt
```

* go to ``pxt-brainpad`` and run

```
npm install
npm link ../pxt
npm link ../pxt-common-packages
```

## to run the local server

From root github folder,

```
cd pxt-brainpad
pxt serve --cloud
```

If you are editing C++, we strongly recommend to [setup your machine for building CODAL](https://github.com/lancaster-university/codal)
and use the following command line

```
pxt serve
``` 

## to build and deploy a single package via command line

```
cd libs/core
pxt deploy
```

## License
MIT

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
