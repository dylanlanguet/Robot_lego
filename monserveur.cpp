// Librairies nécessaires
#include <iostream>
#include <sstream>
#include <unistd.h>
#include <cerrno>
#include <sys/un.h>
#include <arpa/inet.h>
#include <chrono>
#include <thread>
#include "ev3dev.h"

// Espace de nom utilisé
using namespace std;
using namespace ev3dev;

// Point d'entrée du programme
int main()
{
  large_motor moteur_gauche("outA");
	large_motor moteur_droite("outC");
  ultrasonic_sensor capteur_distance("in2");
  color_sensor capteur_couleur("in3");

  // Test de présence des moteurs
	if (moteur_gauche.connected() == false)
	{
		cout << "Le moteur gauche ne semble pas présent" << endl;
		return -1;
	}
	if (moteur_droite.connected() == false)
	{
		cout << "Le moteur droit ne semble pas présent" << endl;
		return -1;
	}

  // Test de présence du capteur
	if (capteur_couleur.connected() == false)
	{
		cout << "Le capteur couleur ne semble pas présent" << endl;
		return -1;
	}
	else
	{
		cout << "Le capteur couleur est fonctionnel" << endl;
	}

  // Création de la socket serveur
  int sd_serveur =socket(AF_INET, SOCK_STREAM,0);

  // Configuration de la socket, notamment le port d'écoute
  struct sockaddr_in cfg_serveur;
  cfg_serveur.sin_family = AF_INET;
  cfg_serveur.sin_addr.s_addr =htonl(INADDR_ANY);
  cfg_serveur.sin_port =htons(1667);

  // Attachement de la socket au port défini
  int e = bind(sd_serveur,(struct sockaddr*)&cfg_serveur,sizeof(cfg_serveur));

  if (e < 0)
  {
    cout << "erreur connect" << endl;
    return -1;
  }
  else
  {
    cout << "marche" << endl;
  }

  // Test de présence du capteur
  if (capteur_distance.connected() == false)
  {
    cout << "Le capteur de distance ne semble pas présent" << endl;
    return -1;
  }
  else
  {
    cout << "Le capteur de distance est fonctionnel" << endl;
  }

  listen(sd_serveur,5);
  // Création une file d'attente de connexionlisten(sd_serveur,5);



  while(1)
  {
    // Dès qu’un nouveau client se connecte à notre serveur,
    // une nouvelle socket est créée pour gérer le client
    int sd_client = accept(sd_serveur,NULL,NULL);
    cout << "connecté" << endl;
    // Réception de la requête du client
    char buffer[1024];
    memset(buffer,0x00,1024);
    int nbOctets =recv(sd_client, buffer,sizeof(buffer),0);
    string reponse(buffer);

    // Initialisation des moteurs
  	moteur_gauche.reset();
  	moteur_droite.reset();

    // Initialisation des moteurs
    moteur_gauche.reset();
    moteur_droite.reset();

    if (reponse[20] == 'A')
    {
      cout << "Avance" << endl;

      // Configuration des moteurs Avance (on peut le faire avant ou pendant l'activation des moteurs)
      moteur_gauche.set_duty_cycle_sp(100);	// puissance=
      moteur_droite.set_duty_cycle_sp(100);	// puissance=

      // Lancement des moteurs
      moteur_gauche.run_direct();
      moteur_droite.run_direct();
    }

    if (reponse[20] == 'R')
    {
      cout << "Recule" << endl;

      // Configuration des moteurs Recule (on peut le faire avant ou pendant l'activation des moteurs)
      moteur_gauche.set_duty_cycle_sp(-100);	// puissance=
      moteur_droite.set_duty_cycle_sp(-100);	// puissance=

      // Lancement des moteurs
      moteur_gauche.run_direct();
      moteur_droite.run_direct();
    }

    if (reponse[20] == 'G')
    {
      cout << "Gauche" << endl;

      // Configuration des moteurs Gauche (on peut le faire avant ou pendant l'activation des moteurs)
      moteur_gauche.set_duty_cycle_sp(-50);	// puissance=
      moteur_droite.set_duty_cycle_sp(50);	// puissance=

      // Lancement des moteurs
      moteur_gauche.run_direct();
      moteur_droite.run_direct();
    }

    if (reponse[20] == 'D')
    {
      cout << "Droite" << endl;

      // Configuration des moteurs Droite (on peut le faire avant ou pendant l'activation des moteurs)
      moteur_gauche.set_duty_cycle_sp(50);	// puissance=
      moteur_droite.set_duty_cycle_sp(-50);	// puissance=

      // Lancement des moteurs
      moteur_gauche.run_direct();
      moteur_droite.run_direct();
    }

    if (reponse[20] == 'd')
    {
      cout << "Avance droite" << endl;

      // Configuration des moteurs Recule (on peut le faire avant ou pendant l'activation des moteurs)
      moteur_gauche.set_duty_cycle_sp(100);	// puissance=
      moteur_droite.set_duty_cycle_sp(67);	// puissance=

      // Lancement des moteurs
      moteur_gauche.run_direct();
      moteur_droite.run_direct();
    }

    if (reponse[20] == 'g')
    {
      cout << "Avance gauche" << endl;

      // Configuration des moteurs Recule (on peut le faire avant ou pendant l'activation des moteurs)
      moteur_gauche.set_duty_cycle_sp(67);	// puissance=
      moteur_droite.set_duty_cycle_sp(100);	// puissance=

      // Lancement des moteurs
      moteur_gauche.run_direct();
      moteur_droite.run_direct();
    }

    //stop
    if (reponse[20] == 'S')
    {
      cout << "Arret" << endl;

      // Arret des moteurs
      moteur_gauche.stop();
      moteur_droite.stop();
    }

    //Distance (Longueur)
    if (reponse[20] == 'L')
    {
      cout << "Distance => " << capteur_distance.distance_centimeters() << " cm" << endl;
    }


    //Snirium (Couleur)
    if (reponse[20] == 'C')
    {
      cout << "Intensité lumineuse réfléchie => " << capteur_couleur.reflected_light_intensity() << endl;
    }
    // Envoi de la réponse au client
    ostringstream preparation;
    ostringstream prepa_length;

    preparation << "{\"snirium\":" << capteur_couleur.reflected_light_intensity() << ", \"distance\":" << capteur_distance.distance_centimeters() << "}";
    prepa_length << preparation.str().length();

    string chaine = "HTTP/1.1 200 OK\r\n";
    chaine += "Date : Mercredi 1 Octobre 2020 11:30:00 UTC+2\r\n";
    chaine += "Serveur : MyHttpServer/0.1 (ev3dev)\r\n";
    chaine += "Access-Control-Allow-Origin: *\r\n";
    chaine += "Content-Length: " + prepa_length.str() + "\r\n";
    chaine += "Content-Type: application/json; charset=UTF-8\r\n\r\n";
    chaine += preparation.str();

    cout << chaine << endl;

    string requete = chaine;
    send(sd_client, requete.c_str(), requete.size(),0);

    // Fermeture de la socket client
    close(sd_client);
  }
  // Fermeture de la socket serveur
  close(sd_serveur);
  // Fin du programmereturn0;
}
