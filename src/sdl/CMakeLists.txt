# Declare SDL2 interface sources
if("${CMAKE_BUILD_TYPE}" EQUAL "Release")
  add_compile_options("SHELL: -O3")
endif() 

set_target_properties(SRB2SDL2 PROPERTIES OUTPUT_NAME "SRB2SDL2" SUFFIX ".js")



target_sources(SRB2SDL2 PRIVATE
	mixer_sound.c
	ogl_sdl.c
	i_threads.c
	i_net.c
	i_system.c
	i_main.c
	i_video.c
	dosstr.c
	endtxt.c
	hwsym_sdl.c
)

if("${CMAKE_SYSTEM_NAME}" MATCHES Windows)
	target_sources(SRB2SDL2 PRIVATE
		../win32/win_dbg.c
		../win32/Srb2win.rc)
endif()

if("${CMAKE_SYSTEM_NAME}" MATCHES Darwin)
	set(MACOSX_BUNDLE_ICON_FILE Srb2mac.icns)
	set_source_files_properties(macosx/Srb2mac.icns PROPERTIES MACOSX_PACKAGE_LOCATION "Resources")
	target_sources(SRB2SDL2 PRIVATE
		macosx/mac_alert.c
		macosx/mac_alert.h
		macosx/mac_resources.c
		macosx/mac_resources.h
		macosx/Srb2mac.icns
	)
endif()



if("${CMAKE_SYSTEM_NAME}" MATCHES Darwin)
	find_library(CORE_FOUNDATION_LIBRARY "CoreFoundation")
	target_link_libraries(SRB2SDL2 PRIVATE
		${CORE_FOUNDATION_LIBRARY}
	)

	set_target_properties(SRB2SDL2 PROPERTIES OUTPUT_NAME "${CPACK_PACKAGE_DESCRIPTION_SUMMARY}")

	# Configure the app bundle icon and plist properties
	target_sources(SRB2SDL2 PRIVATE "${CMAKE_CURRENT_SOURCE_DIR}/macosx/Srb2mac.icns")
	set_target_properties(SRB2SDL2 PROPERTIES
		MACOSX_BUNDLE_ICON_FILE "Srb2mac"
		MACOSX_BUNDLE_BUNDLE_NAME "Sonic Robo Blast 2"
		MACOSX_BUNDLE_BUNDLE_VERSION ${SRB2_VERSION}

		RESOURCE "${CMAKE_CURRENT_SOURCE_DIR}/macosx/Srb2mac.icns"
	)
endif()

if("${CMAKE_SYSTEM_NAME}" MATCHES Windows)
	target_link_libraries(SRB2SDL2 PRIVATE SDL2::SDL2main)
endif()


if("${CMAKE_SYSTEM_NAME}" MATCHES Linux)
target_link_libraries(SRB2SDL2 PRIVATE m rt)
endif() 

add_link_options("SHELL: -lidbfs.js")
add_link_options("SHELL: -s EXPORTED_RUNTIME_METHODS=ccall,cwrap")
add_link_options(
  "SHELL: -s EXPORTED_FUNCTIONS=_main,_Command_ListWADS_f,_COM_ExecuteString,_P_AddWadFile"
)
add_link_options("SHELL: -s ASYNCIFY")
add_link_options("SHELL: -sUSE_SDL=2")
add_link_options("SHELL: -sUSE_ZLIB=1")
add_link_options("SHELL: -sUSE_SDL_MIXER=2")
add_link_options("SHELL: -s ALLOW_MEMORY_GROWTH=1")
add_link_options("SHELL: -s INITIAL_MEMORY=655360000")
add_link_options("SHELL: -s STACK_SIZE=65536000")
add_link_options("--preload-file=${PROJECT_SOURCE_DIR}/assets/out@/")
add_link_options("SHELL: --use-preload-plugins")

target_compile_definitions(SRB2SDL2 PRIVATE -DHAVE_MIXER -DSOUND=SOUND_MIXER)
target_compile_definitions(
  SRB2SDL2 PRIVATE -DDIRECTFULLSCREEN -DHAVE_SDL -DNEWSIGNALHANDLER=0
                   -DUNIXBACKTRACE=0 -DHAVE_PNG)
target_link_options(
  SRB2SDL2
  PRIVATE
  -sUSE_SDL=2
  -sUSE_SDL_MIXER=2
  -sUSE_ZLIB
  -sUSE_LIBPNG
  -lidbfs.js
  -sEXPORTED_RUNTIME_METHODS=ccall,cwrap
  -sEXPORTED_FUNCTIONS=_main,_P_AddWadFile,_Command_ListWADS_f
  -sASYNCIFY 
  --pre-js ${PROJECT_SOURCE_DIR}/src/web/js/module.js/
  -sALLOW_MEMORY_GROWTH=1
  -sINITIAL_MEMORY=983040000
  -sSTACK_SIZE=655360000
  --preload-file=${PROJECT_SOURCE_DIR}/assets/out@/
  --use-preload-plugins)
target_compile_options(SRB2SDL2 PRIVATE -sUSE_SDL=2 -sUSE_SDL_MIXER=2
                                        -sUSE_ZLIB -sUSE_LIBPNG)

# Installation ####
install(TARGETS SRB2SDL2 SRB2SDL2 RUNTIME DESTINATION .)

set(SRB2_SDL2_AVAILABLE
    YES
    PARENT_SCOPE)
