# Still under development!
# Only for testing purpose!


## Tools:

- Install Node.js (https://nodejs.org/en/download/). Keep setup configuration as default,  except check on box "Automatically install the nececsary tools..." when asked.
- Install GCC compiler. Version 8 or higher. https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads.
  Change default location to "C:\GCC" when asked. Some scripts are not happy with space in path. Make sure add "C:\gcc\bin" to PATH.
- Download ninja tool. Execute binary file (window version) can be downloaded from: https://github.com/ninja-build/ninja/releases. 
  Create a folder called ninja from. Let say C:\ninja.
  Put ninja.exe to C:\ninja. We will have "C:\ninja\ninja.exe".
  Add "C:\ninja" to PATH in setting enveronment.
  
## Clone Github:

- Create a folder called "MakeCode". Assume this folder is on root C:\
- clone https://github.com/microsoft/pxt.git
- clone https://github.com/microsoft/pxt-common-packages.git
- clone https://github.com/brainpad-board/brainpad-pulse.git
        
Put all of them inside MakeCode folder.

## Build:

These instructions assume Window 10 - 64bit

- Open Command Prompt.

### Build pxt
- run "cd C:\MakeCode\pxt". 
- run "npm install"
- run "npm install -g jake"
- run "jake"

### Build common package
- run "cd C:\MakeCode\pxt-common-packages"
- run "npm install"

### Build Brainpad pulse
- run "cd C:\MakeCode\brainpad-pulse"
- run "npm install"
- run "npm install -g pxt"
- run "pxt link ../pxt"
- run "pxt link ../pxt-common-packages"

### Run local
- run "doRun". For the first run or after clean build, building process might take long time when clone and install "codal-mbedos" steps.

### Clean:
- Run "doClean"
- Once the build is clean, need to back to step "Build Brainpad pulse" above before run "doRun" again.

## License
MIT

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
