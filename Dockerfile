FROM ubuntu:latest

# setup dependencies
RUN apt update
RUN apt install git wget python3 meson -y
RUN apt install libmicrohttpd-dev libjansson-dev libssl-dev libsofia-sip-ua-dev libglib2.0-dev libopus-dev libogg-dev libcurl4-openssl-dev liblua5.3-dev libconfig-dev pkg-config libtool automake -y
RUN git clone https://gitlab.freedesktop.org/libnice/libnice
RUN cd libnice && meson --prefix=/usr build && ninja -C build && ninja -C build install
RUN wget https://github.com/cisco/libsrtp/archive/v2.2.0.tar.gz
RUN tar xfv v2.2.0.tar.gz
RUN cd libsrtp-2.2.0 && ./configure --prefix=/usr --enable-openssl && make shared_library && make install

# websocket
RUN git clone https://libwebsockets.org/repo/libwebsockets
RUN apt install cmake -y
RUN cd libwebsockets && mkdir build && cd build && cmake -DLWS_MAX_SMP=1 -DLWS_WITHOUT_EXTENSIONS=0 -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_C_FLAGS="-fpic" .. && make && make install

# install janus
RUN git clone https://github.com/meetecho/janus-gateway.git
RUN cd janus-gateway && sh autogen.sh && ./configure --prefix=/opt/janus && make && make install && make configs && ./configure --disable-websockets --disable-data-channels --disable-rabbitmq --disable-mqtt

ENV PATH=$PATH:/opt/janus/bin/

EXPOSE 8088

ENTRYPOINT [ "janus" ]