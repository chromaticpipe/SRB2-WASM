add_custom_command(OUTPUT dist DEPENDS SRB2SDL2)

file(COPY package.json DESTINATION .)
file(COPY index.html DESTINATION .)
file(COPY style.css DESTINATION .)
file(COPY js DESTINATION .)
file(COPY elm DESTINATION .)
file(COPY elm.json DESTINATION .)
file(COPY webpack.config.js DESTINATION .)
file(COPY postcss.config.js DESTINATION .)
file(COPY tailwind.config.js DESTINATION .)  
file(COPY ${CMAKE_SOURCE_DIR}/src/sdl/Srb2SDL.ico
     DESTINATION ${CMAKE_BINARY_DIR}/bin)
set(NODE_ENV "$<$<STREQUAL:${CMAKE_BUILD_TYPE},Release>:production>")

add_custom_target(
  WEB ALL
  COMMAND npm install && OUTPUT_PATH="${CMAKE_BINARY_DIR}/bin"
          NODE_ENV="${NODE_ENV}" npx webpack
  DEPENDS webpack.config.js package.json elm.json
  BYPRODUCTS dist/*)
 