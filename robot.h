/**
 * @file robot.h
 * @brief Définition de la classe Robot
 * @author David SALLE
 * @date 14/03/2018
 * @version 0.1
 *
 * Cette classe Robot formera une sur-couche à l'ensemble des classes ev3dev
 * et facilitera ainsi le développement des programmes pour  les "challenges"
 */
#ifndef ROBOT_H
#define ROBOT_H

// Librairies utilisées
#include <iostream>
#include <chrono>
#include <thread>
#include "ev3dev.h"

// Espaces de noms utilisés
using namespace std;
using namespace ev3dev;


// Définition de la classe
class Robot
{
public:
	void neRienFaire();

private:
	string nom;
};


#endif
