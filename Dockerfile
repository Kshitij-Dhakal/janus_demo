FROM ubuntu:latest

# setup dependencies
RUN apt update
RUN apt install git python3 meson wget
RUN apt install libmicrohttpd-dev libjansson-dev \
	libssl-dev libsrtp-dev libsofia-sip-ua-dev libglib2.0-dev \
	libopus-dev libogg-dev libcurl4-openssl-dev liblua5.3-dev \
	libconfig-dev pkg-config libtool automake
RUN git clone https://gitlab.freedesktop.org/libnice/libnice
RUN cd libnice
RUN meson --prefix=/usr build && ninja -C build && ninja -C build install
RUN cd ..
RUN wget https://github.com/cisco/libsrtp/archive/v2.2.0.tar.gz
RUN tar xfv v2.2.0.tar.gz
RUN cd libsrtp-2.2.0
RUN ./configure --prefix=/usr --enable-openssl
RUN make shared_library && sudo make install
RUN cd ..

# websocket
RUN git clone https://libwebsockets.org/repo/libwebsockets
RUN cd libwebsockets
RUN mkdir build
RUN cd build
RUN cmake -DLWS_MAX_SMP=1 -DLWS_WITHOUT_EXTENSIONS=0 -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_C_FLAGS="-fpic" ..
RUN make && sudo make install

# install janus
RUN git clone https://github.com/meetecho/janus-gateway.git
RUN cd janus-gateway
RUN sh autogen.sh
RUN ./configure --prefix=/opt/janus
RUN make
RUN make install
RUN make configs
RUN ./configure --disable-websockets --disable-data-channels --disable-rabbitmq --disable-mqtt
RUN ./configure --enable-docs

EXPOSE 8088

ENTRYPOINT [ "/bin/janus" ]