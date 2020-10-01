# @Makefile
# @brief Compilation croisée pour robot LEGO Mindstorm EV3
# @author David SALLE
# @date 24/03/2017
# @version 0.3
# @licence GPL3


# Variables de compilation et déploiement
IP_ROBOT=192.168.1.156
CC=arm-linux-gnueabi-g++-5
CFLAGS=-O2 -march=armv5
CCFLAGS=-std=c++11 -D_GLIBCXX_USE_NANOSLEEP -static
DEPS=ev3dev.h
OBJ=ev3dev.o
#DEPS=ev3dev.h robot.h #pour version POO
#OBJ=ev3dev.o robot.o  #pour version POO
LIBS=-lstdc++ -lpthread
EXEC=monserveur


# Règles de construction
%.o: %.cpp $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS) $(CCFLAGS)

$(EXEC): $(OBJ) $(EXEC).o
	$(CC) -o $@ $^ $(CFLAGS) $(CCFLAGS) $(LIBS)


# Règles de nettoyage
clean:
	rm -f *.o

mrproper:	clean
	rm -f $(EXEC)


# Règle pour le téléversement du fichier sur le robot
upload:
	sshpass -p 'maker' scp $(EXEC) robot@$(IP_ROBOT):/home/robot/snir2/


# Règle globale
all:	$(EXEC) upload
