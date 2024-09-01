# SRB2-WASM
## How To Build 
This project uses the emscripten toolchain and cmake, you can install cmake from [here](https://cmake.org/download/) or from your package manager. 
To install emscripten, you will need to use the [emsdk](https://github.com/emscripten-core/emsdk). First clone the emsdk repo
```
git clone https://github.com/emscripten-core/emsdk 
```
Then go into the emsdk directory 
```
cd emsdk
```
Install emscripten, make sure to install 3.1.52 as newer versions are incompatible currently.
```
./emsdk install 3.1.52 
./emsdk activate 3.1.52
``` 
Finally, set environment variables.
```
source emsdk_env.sh  
``` 
Clone this repository recursively to update submodules
```  
git clone https://github.com/chromaticpipe/SRB2-WASM.git --recursive

cd SRB2-WASM

```
```
emcmake cmake -B build 
``` 
Build files will be generated in build/.

```
cd build
make -j[desired amount of cores] 
``` 
Output files will end up in bin/ and you can run the game locally using emrun.
```
cd bin 
emrun index.html
```
# Sonic Robo Blast 2
[![latest release](https://badgen.net/github/release/STJr/SRB2/stable)](https://github.com/STJr/SRB2/releases/latest)

[![Build status](https://ci.appveyor.com/api/projects/status/399d4hcw9yy7hg2y?svg=true)](https://ci.appveyor.com/project/STJr/srb2)
[![Build status](https://travis-ci.org/STJr/SRB2.svg?branch=master)](https://travis-ci.org/STJr/SRB2)
[![CircleCI](https://circleci.com/gh/STJr/SRB2/tree/master.svg?style=svg)](https://circleci.com/gh/STJr/SRB2/tree/master)

[Sonic Robo Blast 2](https://srb2.org/) is a 3D Sonic the Hedgehog fangame based on a modified version of [Doom Legacy](http://doomlegacy.sourceforge.net/).

## Dependencies
- SDL2 (Linux/OS X only)
- SDL2-Mixer (Linux/OS X only)
- libupnp (Linux/OS X only)
- libgme (Linux/OS X only)
- libopenmpt (Linux/OS X only)

## Compiling

See [SRB2 Wiki/Source code compiling](http://wiki.srb2.org/wiki/Source_code_compiling)

## Disclaimer
Sonic Team Junior is in no way affiliated with SEGA or Sonic Team. We do not claim ownership of any of SEGA's intellectual property used in SRB2.
